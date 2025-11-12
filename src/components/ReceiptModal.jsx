import {
  X,
  Download,
  Share2,
  CheckCircle,
  Calendar,
  MapPin,
  Home,
  User,
  DollarSign,
  FileText,
} from "lucide-react";

const ReceiptModal = ({ receipt, onClose }) => {
  console.log(receipt);

  if (!receipt) return null;

  // Random background images for receipt (you can replace with your own)
  const backgroundImages = [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600",
  ];

  const randomBg =
    backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  const isRental = receipt.listing_type === 2;
  const formattedAmount = (
    Number(receipt.amount_paid || receipt.amount) / 1_000_000_000
  ).toLocaleString();
  const formattedDate = new Date(Number(receipt.timestamp)).toLocaleString();

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative scrollbar-hide">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 backdrop-blur rounded-lg hover:bg-background transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header with Background Image */}
        <div
          className="relative h-48 rounded-t-xl overflow-hidden"
          style={{
            backgroundImage: `url("${randomBg}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/70 to-black/90"></div>
          <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-3 border-2 border-white/30">
              <FileText size={32} />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Property Receipt NFT
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Blockchain-Verified Transaction
            </p>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-8 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-full border border-green-500/20">
              <CheckCircle size={18} />
              <span className="font-semibold">Transaction Complete</span>
            </div>
          </div>

          {/* Receipt Number & Date */}
          <div className="border-t border-b border-border py-4 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Receipt ID</span>
              <span className="font-mono font-medium">
                {receipt.id?.id ? `${receipt.id.id.slice(0, 12)}...` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Transaction Date</span>
              <span className="font-medium">{formattedDate}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Transaction Type</span>
              <span
                className={`font-semibold ${
                  isRental ? "text-accent" : "text-primary"
                }`}
              >
                {isRental ? "Rental Agreement" : "Property Sale"}
              </span>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-secondary/30 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary mb-2">
              <Home size={20} />
              <h3 className="font-bold text-lg">Property Details</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Property Type
                </span>
                <span className="font-semibold">{receipt.property_type}</span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-muted-foreground text-sm flex items-center gap-1">
                  <MapPin size={14} />
                  Location
                </span>
                <span className="font-medium text-right text-sm">
                  {receipt.property_address}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">
                  Property ID
                </span>
                <span className="font-mono text-xs">
                  {receipt.property_id?.slice(0, 16)}...
                </span>
              </div>
            </div>
          </div>

          {/* Parties Involved */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-primary mb-2">
                <User size={16} />
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  {isRental ? "Renter" : "Buyer"}
                </p>
              </div>
              <p className="font-mono text-xs break-all">
                {receipt.buyer_renter_address || receipt.buyer_renter}
              </p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 text-accent mb-2">
                <User size={16} />
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  {isRental ? "Landlord" : "Seller"}
                </p>
              </div>
              <p className="font-mono text-xs break-all">
                {receipt.seller_landlord_address || receipt.seller_landlord}
              </p>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-5">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign size={20} className="text-primary" />
              <h3 className="font-bold text-lg">Payment Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="text-2xl font-bold text-primary">
                  {formattedAmount} <span className="text-base">IOTA</span>
                </span>
              </div>

              {isRental && receipt.monthly_rent && (
                <>
                  <div className="border-t border-border pt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Monthly Rent
                      </span>
                      <span className="font-semibold">
                        {(
                          Number(receipt.monthly_rent) / 1_000_000_000
                        ).toLocaleString()}{" "}
                        IOTA
                      </span>
                    </div>
                    {receipt.rental_period_months && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          Rental Period
                        </span>
                        <span className="font-semibold">
                          {receipt.rental_period_months} months
                        </span>
                      </div>
                    )}
                    {receipt.rental_start_date && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar size={14} />
                          Start Date
                        </span>
                        <span className="font-semibold">
                          {new Date(
                            Number(receipt.rental_start_date)
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {receipt.rental_end_date && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Calendar size={14} />
                          End Date
                        </span>
                        <span className="font-semibold">
                          {new Date(
                            Number(receipt.rental_end_date)
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Metadata */}
          {/* {receipt.metadata_uri && (
            <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border">
              <p>Metadata URI: {receipt.metadata_uri}</p>
            </div>
          )} */}

          {/* Footer */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              This receipt is stored as an NFT on the IOTA blockchain and serves
              as proof of your transaction.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Powered by{" "}
              <span className="font-semibold text-primary">PropaTradeX</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
