import { useNavigate } from "react-router-dom";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-3 pb-3 rounded-lg bg-secondary-bg overflow-hidden group">
      <div
        className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-300 group-hover:scale-105"
        data-alt="A modern villa with a swimming pool"
        style={{
          backgroundImage: `url("${property?.images_cids[0]}")`,
        }}
      ></div>
      <div className="px-4">
        <p className="text-primary-text text-base font-medium leading-normal">
          {property?.property_type}
        </p>
        <p className="text-secondary-text text-sm font-normal leading-normal">
          {property?.property_address}
        </p>
        <p className="text-secondary-color text-sm font-bold leading-normal">
          {property?.price} IOTA
        </p>
      </div>
      <div className="flex gap-2 px-4 pb-2 mt-2">
        <div
          className={`flex-1 text-center py-2 rounded-md ${
            property?.status === 1 ? "bg-primary-color" : "bg-secondary-color"
          } text-white text-sm font-bold hover:bg-opacity-80`}
        >
          {property?.status === 1 ? "Available" : "Unavailable"}
        </div>
        <button
          onClick={() => navigate(`/listing/${property?.id.id}`)}
          className="flex-1 text-center py-2 rounded-md bg-gray-300 text-primary-text text-sm font-bold hover:bg-gray-400"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
