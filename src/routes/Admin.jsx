import React, { useState } from "react";
import DisputeList from "../components/DisputeList";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("disputes");

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
                <DisputeList />
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
