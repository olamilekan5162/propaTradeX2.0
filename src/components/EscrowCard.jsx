import { usePropertyhook } from "../hooks/usePropertyHook";
import { ShieldCheck, User, Home, DollarSign, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";

const EscrowCard = ({ escrow }) => {
  const { buyerOrRenterConfirm, sellerOrLandlordConfirm } = usePropertyhook();
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

  const handleRaiseDispute = () => {
    // Add your dispute logic here
    toast.error("Dispute feature coming soon!");
  };

  const transactionType = listing_type === 1 ? "Sale" : "Rent";
  const formattedAmount = (Number(amount) / 1_000_000_000).toLocaleString();

  return (
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
                  onClick={handleRaiseDispute}
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
                  onClick={handleRaiseDispute}
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
  );
};

export default EscrowCard;