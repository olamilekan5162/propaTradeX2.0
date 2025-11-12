import React from "react";
import { trimAddress } from "../utils/helper";
import { usePropertyhook } from "../hooks/usePropertyHook";

export default function DisputeList({disputes}) {

  const { adminRefundFund, adminReleaseFund } = usePropertyhook()

  const handleRelease = async (escrowId, propertyId) => {
    await  adminReleaseFund({escrowId, propertyId})
  }
  const handleRefund = async (escrowId, propertyId) => {
    await  adminRefundFund({escrowId, propertyId})
  }

  return (
    <div className="space-y-6">
      {disputes && disputes.map((dispute) => (
        <div
          key={dispute?.escrow_id}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-lg hover:border-[var(--color-primary)] transition-all duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
            <h2 className="text-xl font-semibold tracking-tight">
              Dispute #{dispute?.escrow_id.slice(0,5)}
            </h2>
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              {dispute?.listing_type === 1 ? "Property Purchase" : "Property Rent"}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <p className="font-semibold">{dispute?.property_address}</p>
              <p className="text-sm text-[var(--color-primary)] font-bold">
                {Number(dispute?.price)} IOTA
              </p>
            </div>

            <div className="border-t border-[var(--color-border)] my-2"></div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[var(--color-muted-foreground)]">Buyer/Renter</p>
                <p className="font-mono">{trimAddress(dispute?.buyer_renter)}</p>
              </div>
              <div>
                <p className="text-[var(--color-muted-foreground)]">Seller</p>
                <p className="font-mono">{trimAddress(dispute?.seller_landlord)}</p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-[var(--color-muted-foreground)]">
                Dispute Raised By:{" "}
                <span className="font-semibold text-[var(--color-foreground)]">
                  {trimAddress(dispute?.raised_by)}
                </span>
              </p>
              <p className="text-[var(--color-muted-foreground)] mt-2">
                Reason:
              </p>
              <blockquote className="border-l-2 pl-4 italic text-[var(--color-foreground)] border-[var(--color-primary)]">
                {dispute?.reason}
              </blockquote>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[var(--color-card)] border-t border-[var(--color-border)] p-4 flex justify-end gap-4">
            {
              dispute.resolved ? (
                <p>#RESOLVED</p>
              ) : (
                <>
                <button disabled={dispute?.resolved} onClick={() => handleRefund(dispute?.escrow_id, dispute?.property_id)} className="px-4 py-2 rounded-md bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] font-medium hover:opacity-90 transition-all">
              Refund Payer (Buyer)
            </button>
            <button disabled={dispute?.resolved} onClick={() => handleRelease(dispute?.escrow_id, dispute?.property_id)} className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium hover:opacity-90 transition-all">
              Release to Receiver (Seller)
            </button>
                </>
            )}
            
            
          </div>
        </div>
      ))}
    </div>
  );
}
