import { useIotaClientQuery } from "@iota/dapp-kit";
import {
  Bath,
  BedDouble,
  CheckCircle,
  ExternalLink,
  Ruler,
  TowerControl,
  CalendarDays,
  MapPin,
  Home,
  ArrowLeft,
  Share2,
  Heart,
  AlertCircle,
  X,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { usePropertyhook } from "../hooks/usePropertyHook";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Listing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { buyOrRentProperty } = usePropertyhook();
  const [selectedImage, setSelectedImage] = useState(0);

  const {
    data: property,
    isPending,
    isError,
  } = useIotaClientQuery(
    "getObject",
    { id, options: { showContent: true, showOwner: true } },
    { select: (data) => data.data?.content?.fields }
  );

  const handleBuyorRent = async (property) => {
   
      await buyOrRentProperty(property);
  };

  const handleRaiseDispute = async (property) => {
   
    await buyOrRentProperty(property);
};

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-xl font-semibold mb-2">Property Not Found</p>
          <p className="text-muted-foreground mb-4">The property you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-all"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const isForSale = property?.listing_type === 1;

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Back Button & Actions Bar */}
      <div className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-lg border border-border hover:bg-secondary transition-all"
            >
              <Share2 size={20} />
            </button>
            <button className="p-2 rounded-lg border border-border hover:bg-secondary transition-all">
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div
              className="w-full bg-center bg-cover rounded-xl overflow-hidden h-[400px] lg:h-[500px] border border-border shadow-lg"
              style={{
                backgroundImage: `url("${property?.images_cids[selectedImage] || property?.images_cids[0]}")`,
              }}
            ></div>
          </div>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
            {property?.images_cids?.slice(0, 3).map((img, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`cursor-pointer rounded-lg overflow-hidden h-32 lg:h-40 border-2 transition-all ${
                  selectedImage === index
                    ? "border-primary shadow-[0_0_10px_var(--color-primary)]"
                    : "border-border hover:border-primary/50"
                }`}
                style={{
                  backgroundImage: `url("${img}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    {property?.property_type}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin size={18} />
                    <span>{property?.property_address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">
                    {property?.price} <span className="text-xl">IOTA</span>
                  </p>
                  {!isForSale && (
                    <p className="text-sm text-muted-foreground mt-1">
                      + {property?.monthly_rent} IOTA/month
                    </p>
                  )}
                </div>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BedDouble className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bedrooms</p>
                    <p className="font-semibold">3</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Bath className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Bathrooms</p>
                    <p className="font-semibold">2</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Ruler className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Area</p>
                    <p className="font-semibold">1,200 ft²</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TowerControl className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">View</p>
                    <p className="font-semibold">Skyline</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Property Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {property?.description}
              </p>
            </div>

            {/* Rental Information */}
            {!isForSale && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Rental Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Monthly Rent</p>
                    <p className="text-xl font-bold">{property?.monthly_rent || "N/A"} IOTA</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Rental Period</p>
                    <p className="text-xl font-bold">{property?.rental_period_months} months</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4 border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Deposit</p>
                    <p className="text-xl font-bold">{property?.deposit_required || "0"} IOTA</p>
                  </div>
                </div>
              </div>
            )}

            {/* Inspection Video */}
            {property?.video_cid && (
              <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Inspection Video</h3>
                <video
                  controls
                  className="rounded-lg w-full h-[350px] object-cover border border-border"
                >
                  <source src={property?.video_cid} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Right Column - Action Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-xl p-6 shadow-lg space-y-6">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-muted-foreground">Status</span>
                {
                  property?.status === 1 ? (
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                    <CheckCircle size={14} />
                    Available
                  </span>) 
                  :(
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-500/20">
                    <X size={14} />
                    Unavailabe
                  </span>) 
                  
                }
               
              </div>

              {/* Action Button */}
              <div>
                {isForSale ? (
                  <button
                    onClick={() => handleBuyorRent(property)}
                    disabled={property?.status !== 1}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_var(--color-primary)]"
                  >
                    Buy Property
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuyorRent(property)}
                    disabled={property?.status !== 1}
                    className="w-full py-4 bg-accent text-accent-foreground font-bold rounded-lg hover:bg-accent/80 transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_var(--color-accent)]"
                  >
                    Rent Property
                  </button>
                )}
              </div>

              {/* Blockchain Info */}
              <div className="border-t border-border pt-6 space-y-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                  Blockchain Details
                </h4>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Property ID</span>
                    <span className="font-mono text-xs bg-secondary px-2 py-1 rounded">
                      {property?.id?.id?.slice(0, 8)}...
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-mono text-xs bg-secondary px-2 py-1 rounded">
                      {property?.owner?.slice(0, 8)}...
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Network</span>
                    <span className="font-semibold text-primary">IOTA</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-muted-foreground">Explorer</span>
                    <a
                      href="#"
                      className="text-primary flex items-center gap-1 hover:underline font-medium"
                    >
                      View on Tangle <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Listed Date */}
              <div className="border-t border-border pt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarDays size={16} />
                  <span>Listed on</span>
                </div>
                <span className="font-medium">
                  {new Date(Number(property?.created_at)).toLocaleDateString()}
                </span>
              </div>

              {/* Documents (if sale) */}
              {isForSale && property?.documents_cid && (
                <div className="border-t border-border pt-4">
                  <a
                    href={property.documents_cid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 border border-border rounded-lg hover:bg-secondary transition-all text-sm font-medium"
                  >
                    View Documents <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;