import React from "react";

const mockDisputes = [
  {
    id: "dispute123",
    type: "Property Purchase",
    property: "123 Main St",
    buyer: "John Doe (iota1...3c4d)",
    seller: "Jane Smith (iota1...g8h9)",
    amount: 50000,
    raisedBy: "Buyer",
    reason:
      "Property not as described, significant undisclosed water damage found during final walkthrough.",
  },
];

export default function DisputeList() {
  return (
    <div className="space-y-6">
      {mockDisputes.map((dispute) => (
        <div
          key={dispute.id}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-[var(--color-foreground)] shadow-lg hover:border-[var(--color-primary)] transition-all duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
            <h2 className="text-xl font-semibold tracking-tight">
              Dispute #{dispute.id}
            </h2>
            <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
              {dispute.type}
            </span>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div>
              <p className="font-semibold">{dispute.property}</p>
              <p className="text-sm text-[var(--color-primary)] font-bold">
                {dispute.amount.toLocaleString()} IOTA
              </p>
            </div>

            <div className="border-t border-[var(--color-border)] my-2"></div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-[var(--color-muted-foreground)]">Buyer</p>
                <p className="font-mono">{dispute.buyer}</p>
              </div>
              <div>
                <p className="text-[var(--color-muted-foreground)]">Seller</p>
                <p className="font-mono">{dispute.seller}</p>
              </div>
            </div>

            <div className="mt-2">
              <p className="text-[var(--color-muted-foreground)]">
                Dispute Raised By:{" "}
                <span className="font-semibold text-[var(--color-foreground)]">
                  {dispute.raisedBy}
                </span>
              </p>
              <p className="text-[var(--color-muted-foreground)] mt-2">
                Reason:
              </p>
              <blockquote className="border-l-2 pl-4 italic text-[var(--color-foreground)] border-[var(--color-primary)]">
                {dispute.reason}
              </blockquote>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[var(--color-card)] border-t border-[var(--color-border)] p-4 flex justify-end gap-4">
            <button className="px-4 py-2 rounded-md bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] font-medium hover:opacity-90 transition-all">
              Refund Payer (Buyer)
            </button>
            <button className="px-4 py-2 rounded-md bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium hover:opacity-90 transition-all">
              Release to Receiver (Seller)
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
