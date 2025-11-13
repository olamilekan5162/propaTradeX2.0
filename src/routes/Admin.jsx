import { useState, useEffect } from "react";
import DisputeList from "../components/DisputeList";
import { useIotaClientQuery, useIotaClient } from "@iota/dapp-kit";
import { useNetworkVariables } from "../config/networkConfig";
import { useQuery } from "@tanstack/react-query";
import { AlertOctagon, Briefcase } from "lucide-react";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("disputes");
  const { propatradexPackageId } = useNetworkVariables("propatradexPackageId");
  const iotaClient = useIotaClient();

  const { data: disputeData, isPending: isDisputePending } = useIotaClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${propatradexPackageId}::propatradex::DisputeRaised`,
      },
    },
    {
      select: (data) => data.data.flatMap((x) => x.parsedJson),
    }
  );

  const { data: enrichedDisputes, isPending: isEnrichingPending } = useQuery({
    queryKey: ["enrichedDisputes", disputeData],
    queryFn: async () => {
      if (!disputeData || disputeData.length === 0) return [];

      const enrichedData = await Promise.all(
        disputeData.map(async (dispute) => {
          try {
            // Fetch the escrow object
            const escrowObj = await iotaClient.getObject({
              id: dispute.escrow_id,
              options: { showContent: true },
            });

            const escrowFields = escrowObj.data?.content?.fields;

            // Fetch the property object
            const propertyObj = await iotaClient.getObject({
              id: escrowFields.property_id,
              options: { showContent: true },
            });

            const propertyFields = propertyObj.data?.content?.fields;

            return {
              ...dispute,
              escrow_id: dispute.escrow_id,
              property_id: escrowFields.property_id,
              buyer_renter: escrowFields.buyer_renter,
              seller_landlord: escrowFields.seller_landlord,
              amount: escrowFields.amount,
              listing_type: escrowFields.listing_type,
              buyer_receipt_id: escrowFields.buyer_renter_receipt_id,
              seller_receipt_id: escrowFields.seller_landlord_receipt_id,
              property_address: propertyFields.property_address,
              resolved: escrowFields.resolved,
            };
          } catch (error) {
            console.error("Error enriching dispute:", error);
            return null;
          }
        })
      );

      return enrichedData.filter((d) => d !== null && !d.resolved);
    },
    enabled: !!disputeData && disputeData.length > 0,
  });

  const isPending = isDisputePending || isEnrichingPending;

  useEffect(() => {
    if (!isPending) {
      console.log("enrichedDisputes", enrichedDisputes);
    }
  }, [isPending, enrichedDisputes]);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] px-6 py-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">
          Admin Dashboard
        </h1>

        {/* Tabs */}
        <div className="w-full">
          <div className="grid w-full grid-cols-2 bg-[var(--color-card)] rounded-md p-1 text-[var(--color-muted-foreground)] border border-[var(--color-border)]">
            <button
              onClick={() => setActiveTab("disputes")}
              className={`inline-flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                activeTab === "disputes"
                  ? "bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm border border-[var(--color-primary)]"
                  : "hover:text-[var(--color-foreground)] hover:bg-[var(--color-card)]"
              }`}
            >
              Active Disputes
            </button>

            <button
              onClick={() => setActiveTab("kyc")}
              className={`inline-flex items-center justify-center px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                activeTab === "kyc"
                  ? "bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm border border-[var(--color-primary)]"
                  : "hover:text-[var(--color-foreground)] hover:bg-[var(--color-card)]"
              }`}
            >
              Pending Verifications
            </button>
          </div>
          {/* Tabs Content */}
          <div className="mt-6">
            {activeTab === "disputes" && (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-[var(--color-foreground)]">
                  Active Disputes
                </h2>
                {enrichedDisputes.lenght > 0 ? (
                  <DisputeList disputes={enrichedDisputes} />
                ) :(
                  <div className="text-center py-2">
                    <div className="bg-card border border-border rounded-xl p-12">
                      <AlertOctagon
                        className="mx-auto mb-4 text-muted-foreground"
                        size={48}
                      />
                      <h3 className="text-xl font-bold mb-2">
                          No Dispute Found
                      </h3>
                      <p className="text-muted-foreground mb-6">
                          Dispute details will appear here
                      </p>
                     
                    </div>
                  </div>
                )
                }
              </div>
            )}
            {activeTab === "kyc" && (
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-lg">
                <div className="p-6 border-b border-[var(--color-border)]">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Pending User Verifications
                  </h2>
                </div>
                <div className="p-6 pt-0">
                  <p className="text-[var(--color-muted-foreground)]">
                    User verification management will be displayed here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
