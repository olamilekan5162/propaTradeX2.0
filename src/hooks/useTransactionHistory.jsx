import { useCurrentAccount, useIotaClientQuery } from "@iota/dapp-kit";
import { useNetworkVariables } from "../config/networkConfig";
import { useMemo } from "react";

export const useTransactionHistory = () => {
  const currentAccount = useCurrentAccount();
  const { propatradexPackageId } = useNetworkVariables("propatradexPackageId");

  // Fetch completed transactions (receipts)
  const { data: receipts, isPending: isReceiptsPending } = useIotaClientQuery(
    "getOwnedObjects",
    {
      owner: currentAccount?.address || "",
      filter: {
        StructType: `${propatradexPackageId}::propatradex::PropertyReceipt`,
      },
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!currentAccount?.address,
      select: (data) => data?.data?.map((x) => x?.data?.content?.fields) ?? [],
    }
  );

  // Fetch all escrow events (pending and completed)
  const { data: escrowEvents, isPending: isEscrowPending } = useIotaClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${propatradexPackageId}::propatradex::EscrowCreated`,
      },
    },
    {
      enabled: !!currentAccount?.address,
      select: (data) =>
        data.data
          .flatMap((x) => x.parsedJson)
          .filter(
            (y) =>
              y.seller_landlord === currentAccount.address ||
              y.buyer_renter === currentAccount.address
          ),
    }
  );

  // Fetch dispute events
  const { data: disputeEvents, isPending: isDisputesPending } =
    useIotaClientQuery(
      "queryEvents",
      {
        query: {
          MoveEventType: `${propatradexPackageId}::propatradex::DisputeRaised`,
        },
      },
      {
        enabled: !!currentAccount?.address,
        select: (data) =>
          data.data
            .flatMap((x) => x.parsedJson)
            .filter((y) => y.raised_by === currentAccount.address),
      }
    );

  // Fetch funds released events (completed transactions)
  const { data: fundsReleasedEvents, isPending: isFundsReleasedPending } =
    useIotaClientQuery(
      "queryEvents",
      {
        query: {
          MoveEventType: `${propatradexPackageId}::propatradex::FundsReleased`,
        },
      },
      {
        enabled: !!currentAccount?.address,
        select: (data) =>
          data.data
            .flatMap((x) => x.parsedJson)
            .filter((y) => y.receiver === currentAccount.address),
      }
    );

  // Combine and process all transactions
  const transactions = useMemo(() => {
    if (!currentAccount?.address) return [];

    console.log("Transaction History Debug:");
    console.log("Receipts:", receipts?.length || 0);
    console.log("Escrow Events:", escrowEvents?.length || 0);
    console.log("Dispute Events:", disputeEvents?.length || 0);
    console.log("Funds Released:", fundsReleasedEvents?.length || 0);

    const allTransactions = [];

    // Get completed escrow IDs from funds released
    const completedEscrowIds = new Set(
      fundsReleasedEvents?.map((e) => e.escrow_id) || []
    );

    // Get disputed escrow IDs
    const disputedEscrowIds = new Set(
      disputeEvents?.map((e) => e.escrow_id) || []
    );

    // Process receipts (completed transactions)
    if (receipts) {
      receipts.forEach((receipt) => {
        allTransactions.push({
          id: receipt.id?.id || receipt.property_id,
          date: new Date(Number(receipt.timestamp)),
          timestamp: Number(receipt.timestamp),
          type:
            receipt.buyer_renter_address === currentAccount.address ||
            receipt.buyer_renter === currentAccount.address
              ? receipt.listing_type === 1
                ? "Purchase"
                : "Rental"
              : receipt.listing_type === 1
              ? "Sale"
              : "Lease Out",
          property: receipt.property_type,
          propertyAddress: receipt.property_address,
          amount: Number(receipt.amount_paid) / 1_000_000_000,
          status: "completed",
          statusLabel: "Completed",
          isBuyer:
            receipt.buyer_renter_address === currentAccount.address ||
            receipt.buyer_renter === currentAccount.address,
          receiptData: receipt,
        });
      });
    }

    // Process escrow events (pending transactions)
    if (escrowEvents) {
      escrowEvents.forEach((escrow) => {
        // Check if this escrow already has a receipt (to avoid duplicates)
        const hasReceipt = receipts?.some(
          (r) =>
            r.property_id === escrow.property_id &&
            Math.abs(Number(r.timestamp) - Number(escrow.timestamp)) < 10000
        );

        const isCompleted = completedEscrowIds.has(escrow.escrow_id);
        const isDisputed = disputedEscrowIds.has(escrow.escrow_id);

        // Skip ONLY if it has a receipt AND is completed (no dispute)
        // This ensures we show disputed and pending transactions
        if (hasReceipt && isCompleted && !isDisputed) return;

        // Determine status
        let status = "pending";
        let statusLabel = "Pending";

        if (isDisputed) {
          status = "disputed";
          statusLabel = "Disputed";
        } else if (isCompleted || hasReceipt) {
          status = "completed";
          statusLabel = "Completed";
        }

        allTransactions.push({
          id: escrow.escrow_id,
          date: new Date(Number(escrow.timestamp)),
          timestamp: Number(escrow.timestamp),
          type:
            escrow.buyer_renter === currentAccount.address
              ? escrow.listing_type === 1
                ? "Purchase"
                : "Rental"
              : escrow.listing_type === 1
              ? "Sale"
              : "Lease Out",
          property: "Property", // We don't have property type in escrow event
          propertyId: escrow.property_id,
          amount: Number(escrow.amount) / 1_000_000_000,
          status,
          statusLabel,
          isBuyer: escrow.buyer_renter === currentAccount.address,
          escrowData: escrow,
        });
      });
    }

    // Sort by date (newest first)
    return allTransactions.sort((a, b) => b.timestamp - a.timestamp);
  }, [
    receipts,
    escrowEvents,
    disputeEvents,
    fundsReleasedEvents,
    currentAccount?.address,
  ]);

  const isPending =
    isReceiptsPending ||
    isEscrowPending ||
    isDisputesPending ||
    isFundsReleasedPending;

  return {
    transactions,
    isPending,
    hasTransactions: transactions.length > 0,
  };
};
