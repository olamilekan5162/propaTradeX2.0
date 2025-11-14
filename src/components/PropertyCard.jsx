import { useNavigate } from "react-router-dom";
import { MapPin, Tag } from "lucide-react";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_0_15px_var(--color-primary)]">
      {/* Image */}
      <div className="relative overflow-hidden aspect-video">
        <div
          className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url("${property?.images_cids[0]}")`,
          }}
        ></div>
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
              property?.status === 1
                ? "bg-green-500/90 text-white backdrop-blur"
                : "bg-red-500/90 text-white backdrop-blur"
            }`}
          >
            {property?.status === 1 ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Property Info */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-1">
              {property?.property_type}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                property?.listing_type === 1
                  ? "bg-blue-500/20 text-blue-500"
                  : "bg-purple-500/20 text-purple-500"
              }`}
            >
              {property?.listing_type === 1 ? "For Sale" : "For Rent"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mt-1">
            <MapPin size={14} />
            <p className="line-clamp-1">{property?.property_address}</p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-auto">
          <Tag size={16} className="text-primary" />
          <p className="text-2xl font-bold text-primary">
            {property?.price} <span className="text-base">IOTA</span>
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate(`/listing/${property?.id.id}`)}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_var(--color-primary)]"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
