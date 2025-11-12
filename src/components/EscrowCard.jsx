import { usePropertyhook } from "../hooks/usePropertyHook";
import { ShieldCheck, User, Home, DollarSign, AlertTriangle, X, FileText, Send } from "lucide-react";
import { toast } from "react-hot-toast";
import { useState } from "react";

const EscrowCard = ({ escrow }) => {
  const { buyerOrRenterConfirm, sellerOrLandlordConfirm } = usePropertyhook();
  const [showDisputeModal, setShowDisputeModal] = useState(false);
  const [disputeReason, setDisputeReason] = useState("");
  const [disputeCategory, setDisputeCategory] = useState("");
  const [disputeDescription, setDisputeDescription] = useState("");
  
  const {
    property_type,
    property_address,
    listing_type,
    buyer_renter,
    seller_landlord,
    amount,
    isBuyer,
    isSeller,
  } = escrow;

  const handleBuyerConfirm = async (escrow) => {
    try {
      toast.loading("Processing confirmation...");
      await buyerOrRenterConfirm(escrow);
      toast.dismiss();
      toast.success("Confirmed successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Confirmation failed. Please try again.");
      console.error(error);
    }
  };

  const handleSellerConfirm = async (escrow) => {
    try {
      toast.loading("Processing confirmation...");
      await sellerOrLandlordConfirm(escrow);
      toast.dismiss();
      toast.success("Confirmed successfully!");
    } catch (error) {
      toast.dismiss();
      toast.error("Confirmation failed. Please try again.");
      console.error(error);
    }
  };

  const handleOpenDispute = () => {
    setShowDisputeModal(true);
  };

  const handleCloseDispute = () => {
    setShowDisputeModal(false);
    setDisputeReason("");
    setDisputeCategory("");
    setDisputeDescription("");
  };

  const handleSubmitDispute = async (e) => {
    e.preventDefault();
    
    if (!disputeCategory || !disputeReason || !disputeDescription) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      toast.loading("Submitting dispute...");
      
      // Add your dispute submission logic here
      // await submitDispute({ escrow, disputeCategory, disputeReason, disputeDescription });
      
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated delay
      
      toast.dismiss();
      toast.success("Dispute submitted successfully! Our team will review it shortly.");
      handleCloseDispute();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to submit dispute. Please try again.");
      console.error(error);
    }
  };

  const transactionType = listing_type === 1 ? "Sale" : "Rent";
  const formattedAmount = (Number(amount) / 1_000_000_000).toLocaleString();

  const disputeCategories = [
    "Property Condition Mismatch",
    "Payment Issues",
    "Documentation Problems",
    "Misrepresentation",
    "Contract Violation",
    "Other"
  ];

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_15px_var(--color-primary)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Section - Property Info */}
          <div className="flex-1 space-y-4">
            {/* Property Details */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Home size={20} className="text-primary" />
                <h3 className="text-xl font-bold text-foreground">
                  {property_type}
                </h3>
              </div>
              <p className="text-muted-foreground text-sm flex items-center gap-1.5">
                <span>{property_address}</span>
              </p>
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
                <ShieldCheck size={14} />
                {transactionType}
              </div>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-border">
              <div className="flex items-start gap-2">
                <User size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Buyer/Renter</p>
                  <p className="text-sm font-mono font-medium text-foreground">
                    {buyer_renter.slice(0, 10)}...
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <User size={16} className="text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Seller/Landlord</p>
                  <p className="text-sm font-mono font-medium text-foreground">
                    {seller_landlord.slice(0, 10)}...
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Amount & Actions */}
          <div className="flex flex-col items-end gap-4 lg:min-w-[240px]">
            {/* Amount */}
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                <DollarSign size={20} className="text-primary" />
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Escrow Amount</p>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {formattedAmount} <span className="text-base text-muted-foreground">IOTA</span>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full">
              {isBuyer && (
                <>
                  <button
                    onClick={() => handleBuyerConfirm(escrow)}
                    className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_var(--color-primary)]"
                  >
                    Confirm as Buyer
                  </button>
                  <button
                    onClick={handleOpenDispute}
                    className="w-full py-2 bg-destructive/10 text-destructive border border-destructive/30 font-semibold rounded-lg hover:bg-destructive/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <AlertTriangle size={16} />
                    Raise Dispute
                  </button>
                </>
              )}
              {isSeller && (
                <>
                  <button
                    onClick={() => handleSellerConfirm(escrow)}
                    className="w-full py-3 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_var(--color-accent)]"
                  >
                    Confirm as Seller
                  </button>
                  <button
                    onClick={handleOpenDispute}
                    className="w-full py-2 bg-destructive/10 text-destructive border border-destructive/30 font-semibold rounded-lg hover:bg-destructive/20 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <AlertTriangle size={16} />
                    Raise Dispute
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="text-destructive" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Raise a Dispute</h2>
                  <p className="text-sm text-muted-foreground">File a formal complaint about this transaction</p>
                </div>
              </div>
              <button
                onClick={handleCloseDispute}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Property Info Summary */}
            <div className="p-6 bg-secondary/30 border-b border-border">
              <div className="flex items-start gap-4">
                <Home className="text-primary mt-1" size={20} />
                <div>
                  <p className="font-semibold text-foreground">{property_type}</p>
                  <p className="text-sm text-muted-foreground">{property_address}</p>
                  <p className="text-sm text-primary font-bold mt-1">{formattedAmount} IOTA</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitDispute} className="p-6 space-y-6">
              {/* Dispute Category */}
              <div>
                <label className="block font-semibold mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-primary" />
                  Dispute Category *
                </label>
                <select
                  value={disputeCategory}
                  onChange={(e) => setDisputeCategory(e.target.value)}
                  required
                  className="w-full border border-border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select a category</option>
                  {disputeCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brief Reason */}
              <div>
                <label className="block font-semibold mb-2">
                  Brief Reason *
                </label>
                <input
                  type="text"
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  placeholder="e.g., Property does not match listing description"
                  required
                  maxLength={100}
                  className="w-full border border-border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">{disputeReason.length}/100 characters</p>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block font-semibold mb-2">
                  Detailed Description *
                </label>
                <textarea
                  value={disputeDescription}
                  onChange={(e) => setDisputeDescription(e.target.value)}
                  placeholder="Please provide a detailed explanation of the issue. Include any relevant dates, communications, or evidence that supports your dispute."
                  required
                  rows={6}
                  className="w-full border border-border rounded-lg p-3 bg-background focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">{disputeDescription.length} characters</p>
              </div>

              {/* Warning Notice */}
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="text-yellow-500 flex-shrink-0 mt-0.5" size={20} />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-500 mb-1">Important Notice</p>
                    <p className="text-muted-foreground">
                      Filing a false dispute may result in penalties. Please ensure all information provided is accurate and truthful. Our team will review your case within 48 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseDispute}
                  className="flex-1 py-3 border border-border rounded-lg font-semibold hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-destructive text-destructive-foreground rounded-lg font-bold hover:bg-destructive/80 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  <Send size={18} />
                  Submit Dispute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EscrowCard;