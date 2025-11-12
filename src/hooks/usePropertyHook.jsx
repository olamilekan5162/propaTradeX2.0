import toast from "react-hot-toast";
import { useNetworkVariables } from "../config/networkConfig";
import { Transaction } from "@iota/iota-sdk/transactions";
import {
  useCurrentAccount,
  useIotaClient,
  useSignAndExecuteTransaction,
} from "@iota/dapp-kit";

export const usePropertyhook = () => {
  const {
    propatradexPackageId,
    propatradexAdminCap,
    propatradexUpgradeCap,
    propatradexProfileRegistry,
  } = useNetworkVariables(
    "propatradexPackageId",
    "propatradexAdminCap",
    "propatradexUpgradeCap",
    "propatradexProfileRegistry"
  );

  const iotaClient = useIotaClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const currentAccount = useCurrentAccount();

  const registerUser = async (userData) => {
    try {
      const tx = new Transaction();
      tx.moveCall({
        arguments: [
          tx.object(propatradexProfileRegistry),
          tx.pure.string(userData.fullName),
          tx.pure.string(userData.idType),
          tx.pure.string(userData.idNumber),
          tx.pure.string(userData.phoneNumber),
          tx.pure.string(userData.email),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::register_user`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("Registration successfully", { id: toastId });
              console.log("successfull")
            } else {
              toast.error("Registration failed, try again", {
                id: toastId,
              });
              console.log("successfull")
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`Registration failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const buyOrRentProperty = async (property) => {
    try {
      const amountMist = BigInt(
        Math.floor(Number(property.price) * 1_000_000_000)
      );
      const tx = new Transaction();
      const [coin] = tx.splitCoins(tx.gas, [tx.pure("u64", amountMist)]);
      tx.moveCall({
        arguments: [
          tx.object(property.id.id),
          coin,
          tx.pure.string(property.document_cid ? property.document_cid : ""),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::deposit_to_escrow`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success(" successfully", { id: toastId });
            } else {
              toast.error(" failed, try again", {
                id: toastId,
              });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const buyerOrRenterConfirm = async (escrow) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.object(escrow.escrow_id),
          tx.object(escrow.property_id),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::buyer_renter_confirms`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success(" successfully", { id: toastId });
            } else {
              toast.error(" failed, try again", {
                id: toastId,
              });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const sellerOrLandlordConfirm = async (escrow) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.object(escrow.escrow_id),
          tx.object(escrow.property_id),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::seller_landlord_confirms`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success(" successfully", { id: toastId });
            } else {
              toast.error(" failed, try again", {
                id: toastId,
              });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const raiseDispute = async (id, reason) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.object(id),
          tx.pure.string(reason),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::raise_dispute`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("dispute submitted successfully!, Expect a feedback soon", { id: toastId });
            } else {
              toast.error(" failed, try again", {
                id: toastId,
              });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const adminReleaseFund = async (escrow) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.object(propatradexAdminCap),
          tx.object(escrow.escrow_id),
          tx.object(escrow.property_id),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::admin_resolve_dispute_release`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("dispute submitted successfully!, Expect a feedback soon", { id: toastId });
            } else {
              toast.error(" failed, try again", {
                id: toastId,
              });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  const adminRefundFund = async (escrow) => {
    try {
      const tx = new Transaction();

      tx.moveCall({
        arguments: [
          tx.object(propatradexAdminCap),
          tx.object(escrow.escrow_id),
          tx.object(escrow.property_id),
          tx.object("0x6"),
        ],
        target: `${propatradexPackageId}::propatradex::admin_resolve_dispute_refund`,
      });

      const toastId = toast.loading("Processing...");

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            const { effects } = await iotaClient.waitForTransaction({
              digest,
              options: { showEffects: true },
            });
            if (effects?.status?.status === "success") {
              toast.success("dispute submitted successfully!, Expect a feedback soon", { id: toastId });
            } else {
              toast.error(" failed, try again", {
                id: toastId,
              });
            }
            window.location.reload();
          },
          onError: (error) => {
            toast.error(`failed, try again.`, {
              id: toastId,
            });
            console.error(error.message);
          },
        }
      );
    } catch (error) {
      toast.error("An unexpected error occurred", error.message);
    }
  };

  return {
    registerUser,
    buyOrRentProperty,
    buyerOrRenterConfirm,
    sellerOrLandlordConfirm,
    raiseDispute,
    adminRefundFund,
    adminReleaseFund
  };
};
