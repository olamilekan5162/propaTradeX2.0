import { usePropertyhook } from "../hooks/usePropertyHook";

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
    console.log("processing");

    await buyerOrRenterConfirm(escrow);
    console.log("done");
  };

  const handleSellerConfirm = async (escrow) => {
    console.log("processing");
    sellerOrLandlordConfirm(escrow);
    console.log("done");
  };

  const transactionType = listing_type === 1 ? "Sale" : "Rent";
  const formattedAmount = (Number(amount) / 1_000_000_000).toLocaleString();

  return (
    <div className="w-full h-[180px] flex justify-between items-center border border-border-color bg-secondary-bg rounded-xl px-6 py-4 hover:border-primary-color/80 transition-all duration-300">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h3 className="text-lg font-bold text-primary-text">
            {property_type}
          </h3>
          <p className="text-secondary-text text-sm">{property_address}</p>
          <p className="text-xs text-secondary-text mt-1">
            Transaction Type:{" "}
            <span className="text-primary-color font-medium">
              {transactionType}
            </span>
          </p>
        </div>
        <div className="mt-2 text-sm">
          <p>
            <span className="text-secondary-text">Buyer/Renter:</span>{" "}
            <span className="text-primary-text">
              {buyer_renter.slice(0, 10)}...
            </span>
          </p>
          <p>
            <span className="text-secondary-text">Seller/Landlord:</span>{" "}
            <span className="text-primary-text">
              {seller_landlord.slice(0, 10)}...
            </span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <p className="text-primary-text text-xl font-bold">
          {formattedAmount} IOTA
        </p>
        {isBuyer && (
          <button
            onClick={() => handleBuyerConfirm(escrow)}
            className="mt-auto bg-primary-color text-primary-bg font-semibold text-sm rounded-lg px-5 py-2 hover:opacity-90"
          >
            Confirm as Buyer
          </button>
        )}
        {isSeller && (
          <button
            onClick={() => handleSellerConfirm(escrow)}
            className="mt-auto bg-secondary-color text-primary-bg font-semibold text-sm rounded-lg px-5 py-2 hover:opacity-90"
          >
            Confirm as Seller
          </button>
        )}
      </div>
    </div>
  );
};

export default EscrowCard;
