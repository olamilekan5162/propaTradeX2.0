import { useCurrentAccount, useDisconnectWallet } from "@iota/dapp-kit";
import { Copy, ArrowRight, LogOut, Package } from "lucide-react";
import { trimAddress } from "../utils/helper";
import toast from "react-hot-toast";
import Jazzicon from "react-jazzicon";
import { Link, useOutletContext } from "react-router-dom";
import UnconnectedState from "../components/States/UnconnectedState";
import NotRegisteredState from "../components/States/NotRegisteredState";
import { useTransactionHistory } from "../hooks/useTransactionHistory";

const Profile = () => {
  const currentAccount = useCurrentAccount();
  const registeredUserData = useOutletContext();
  const {
    transactions,
    isPending: isLoadingTransactions,
    hasTransactions,
  } = useTransactionHistory();

  const { mutateAsync: disconnectWallet } = useDisconnectWallet();

  const handleCopy = () => {
    if (currentAccount?.address) {
      navigator.clipboard.writeText(currentAccount.address);
      toast.success("Copied to clipboard!");
    }
  };

  if (!currentAccount) {
    return <UnconnectedState />;
  }

  if (!registeredUserData || registeredUserData.length === 0) {
    return <NotRegisteredState />;
  }

  const user = registeredUserData[0];

  return (
    <div className="bg-background font-sans text-foreground">
      <div className="container mx-auto max-w-5xl py-12 px-4">
        {/* Profile Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <Jazzicon diameter={120} seed={currentAccount?.address} />
            <div
              className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-background"
              title="Verified"
            ></div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-foreground to-muted-foreground text-transparent bg-clip-text">
            {user.full_name}
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">{user.email}</p>
          <div className="inline-flex items-center gap-2 mt-3 font-mono text-sm bg-card border border-border px-3 py-1.5 rounded-full">
            <span>{trimAddress(currentAccount?.address)}</span>
            <button
              onClick={handleCopy}
              className="p-1 rounded-full hover:bg-background transition-colors"
              aria-label="Copy address"
            >
              <Copy size={14} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Wallet Details Card */}
        <div className="bg-card border border-border rounded-xl p-6 md:p-8 transition-all duration-300 shadow-lg hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_0_15px_var(--color-primary)] mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <span className="font-bold text-2xl">I</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-left">IOTA Wallet</h3>
              <p className="text-muted-foreground text-sm text-left">
                Connected and verified.
              </p>
            </div>
          </div>
          <button
            onClick={disconnectWallet}
            className="flex items-center gap-2 bg-accent text-accent-foreground font-bold py-2.5 px-6 rounded-lg hover:bg-accent/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_var(--color-accent)]"
          >
            <LogOut size={18} />
            Disconnect
          </button>
        </div>

        {/* Transaction History Card */}
        <div className="bg-card border border-border rounded-xl shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_0_15px_var(--color-primary)]">
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold">Transaction History</h3>
            <p className="text-muted-foreground mt-1">
              A record of your activity on the platform.
            </p>
          </div>
          <div className="overflow-x-auto">
            {isLoadingTransactions ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : !hasTransactions ? (
              <div className="flex flex-col items-center justify-center py-12 px-6">
                <Package className="text-muted-foreground mb-3" size={48} />
                <h4 className="text-lg font-semibold mb-1">
                  No Transactions Yet
                </h4>
                <p className="text-muted-foreground text-sm text-center">
                  Your transaction history will appear here once you start
                  buying or selling properties.
                </p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-background/50">
                  <tr className="border-b border-border">
                    <th className="px-6 py-3 font-semibold">Date</th>
                    <th className="px-6 py-3 font-semibold">Type</th>
                    <th className="px-6 py-3 font-semibold">Property</th>
                    <th className="px-6 py-3 font-semibold text-right">
                      Amount (IOTA)
                    </th>
                    <th className="px-6 py-3 font-semibold text-center">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 5).map((transaction, index) => (
                    <tr
                      key={transaction.id || index}
                      className="border-b border-border hover:bg-background/50"
                    >
                      <td className="px-6 py-4 text-muted-foreground">
                        {transaction.date.toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">{transaction.type}</td>
                      <td className="px-6 py-4 font-medium text-foreground">
                        {transaction.property}
                        {transaction.propertyAddress && (
                          <span className="block text-xs text-muted-foreground truncate max-w-xs">
                            {transaction.propertyAddress}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-right">
                        {transaction.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            transaction.status === "completed"
                              ? "bg-green-500/10 text-green-500"
                              : transaction.status === "disputed"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-yellow-500/10 text-yellow-500"
                          }`}
                        >
                          {transaction.statusLabel}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {hasTransactions && transactions.length > 5 && (
            <div className="p-4 text-center border-t border-border">
              <Link
                to="/dashboard"
                className="text-primary font-semibold hover:underline flex items-center justify-center gap-1"
              >
                View All Transactions <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
