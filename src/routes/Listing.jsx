import { useIotaClientQuery } from "@iota/dapp-kit";
import {
  Bath,
  BedDouble,
  CheckCircle,
  ExternalLink,
  Play,
  Ruler,
  TowerControl,
  CalendarDays,
} from "lucide-react";

import { useParams } from "react-router-dom";
import { usePropertyhook } from "../hooks/usePropertyHook";

const Listing = () => {
  const { id } = useParams();
  const { buyOrRentProperty } = usePropertyhook();

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
    console.log("buying or renting");

    await buyOrRentProperty(property);
    console.log("bought or rented");
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-screen text-primary-text">
        Loading property details...
      </div>
    );
  }

  const isForSale = property?.listing_type === 1;

  return (
    <div className="bg-primary-bg  text-primary-text ">
      <div className="relative flex h-full min-h-screen w-full flex-col  overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 bg-secondary-bg ">
            <div className="max-w-7xl mx-auto">
              <div
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] mb-8"
                style={{
                  backgroundImage: `url("${property?.images_cids[0]}")`,
                }}
              ></div>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <div className="mb-6">
                    <h1 className="text-primary-text text-4xl font-black leading-tight tracking-[-0.033em]">
                      {property?.property_type}
                    </h1>
                    <p className="text-secondary-text font-normal leading-normal mt-2">
                      {property?.property_address}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 border-y border-gray-200 py-6">
                    <div className="flex items-center gap-3">
                      <BedDouble className="text-primary-color text-3xl" />

                      <p className="text-primary-text text-base font-medium">
                        3 Bedrooms
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bath className="text-primary-color text-3xl" />

                      <p className="text-primary-text text-base font-medium">
                        2 Bathrooms
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Ruler className="text-primary-color text-3xl" />

                      <p className="text-primary-text text-base font-medium">
                        1,200 sqft
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <TowerControl className="text-primary-color text-3xl" />
                      <p className="text-primary-text text-base font-medium">
                        Skyline View
                      </p>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-primary-text mb-4">
                      Property Description
                    </h3>
                    <p className="text-secondary-textleading-relaxed">
                      {property?.description}
                    </p>
                  </div>
                  {/* Conditional Rent Info */}
                  {!isForSale && (
                    <div className="mb-8 space-y-3">
                      <h3 className="text-2xl font-bold mb-2">
                        Rental Information
                      </h3>
                      <p>
                        <strong>Monthly Rent:</strong>{" "}
                        {property?.monthly_rent || "N/A"} IOTA
                      </p>
                      <p>
                        <strong>Rental Period:</strong>{" "}
                        {property?.rental_period_months} months
                      </p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-2xl font-bold text-primary-text mb-4">
                      Inspection Video
                    </h3>
                    <div>
                      <video
                        controls
                        className="rounded-lg w-full h-[350px] object-cover shadow-md"
                      >
                        <source src={property?.video_cid} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="sticky top-8 bg-primary-bg p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-primary-text ">
                      Action
                    </h3>

                    <div className="space-y-4 mb-6 mt-2">
                      {isForSale ? (
                        <button
                          onClick={() => handleBuyorRent(property)}
                          className="w-full h-12 bg-primary-color text-white font-semibold rounded-lg hover:opacity-90 transition"
                        >
                          Buy Property
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBuyorRent(property)}
                          className="w-full h-12 bg-secondary-color text-white font-semibold rounded-lg hover:opacity-90 transition"
                        >
                          Rent Property
                        </button>
                      )}
                    </div>

                    {/* Web3 Info */}
                    <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-secondary-text">
                          Property ID:
                        </span>
                        <span className="truncate max-w-[160px] font-medium">
                          {property?.id?.id?.slice(0, 10)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-text">Owner:</span>
                        <span className="truncate max-w-[160px] font-medium">
                          {property?.owner?.slice(0, 10)}...
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-secondary-text">Price:</span>
                        <span className="font-medium">
                          {property.price} IOTA
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-secondary-text">Explorer:</span>
                        <a
                          href="#"
                          className="text-primary-color flex items-center gap-1 hover:underline"
                        >
                          View on Tangle <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>

                    {/* Created Date */}
                    <div className="border-t border-gray-200 pt-4 mt-4 text-sm flex items-center gap-2 text-secondary-text">
                      <CalendarDays size={15} />
                      Listed on:{" "}
                      {new Date(
                        Number(property?.created_at)
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Listing;

// import {
//   BedDouble,
//   Bath,
//   Ruler,
//   PlayCircle,
//   Wallet,
//   CheckCircle,
//   ExternalLink,
//   Home,
//   CalendarDays,
// } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const Listing = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);

//   // Simulated backend fetch
//   useEffect(() => {
//     const fetchedProperty = {
//       created_at: "1762636061255",
//       deposit_required: "0",
//       description: "A fully furnished duplex with modern amenities.",
//       documents_cid:
//         "https://black-far-coyote-812.mypinata.cloud/ipfs/bafkreihtayeplpfcltyaavzwaa4ob7depyrpgmrrlu7xuswgyaibsaiwpi",
//       id: {
//         id: "0x7ce71945552d5a6eeb5aea04428a73d9a6d5bb456e8e7f16352094a472ce4fc7",
//       },
//       images_cids: [
//         "https://black-far-coyote-812.mypinata.cloud/ipfs/bafybeiflsfqksh6mmzzhnjum6or5pxefmxabmqfrd7yqekzjqkckksmfju",
//       ],
//       listing_type: 1,
//       owner:
//         "0x9376d085279477aa00ff03ba7674f87329c58cf0efe698a4b0af11dee143b14f",
//       price: "10",
//       property_address: "123 Main Street",
//       property_type: "Duplex",
//       rental_end_date: null,
//       rental_period_months: "0",
//       rental_start_date: null,
//       status: 1,
//       video_cid:
//         "https://black-far-coyote-812.mypinata.cloud/ipfs/bafkreibw4abhxkbx4475fgzel3etgakmhzyylf47woe5ddbobpzl32vgmi",
//     };
//     setTimeout(() => setProperty(fetchedProperty), 500);
//   }, [id]);

//   if (!property) {
//     return (
//       <div className="flex items-center justify-center h-screen text-primary-text">
//         Loading property details...
//       </div>
//     );
//   }

//   const isForSale = property.listing_type === 1;

//   return (
//     <div className="bg-primary-bg text-primary-text min-h-screen">
//       <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 py-10">
//         {/* Gallery */}
//         <div className="flex flex-col lg:flex-row gap-10">
//           <div className="lg:w-2/3">
//             <div className="rounded-xl overflow-hidden shadow-md mb-6">
//               <img
//                 src={property.images_cids[0]}
//                 alt="Property"
//                 className="w-full object-cover h-[400px]"
//               />
//             </div>

//             {/* Title + Address */}
//             <div className="mb-6">
//               <h1 className="text-4xl font-bold leading-tight">
//                 {property.property_type}
//               </h1>
//               <p className="text-secondary-text mt-2">
//                 {property.property_address}
//               </p>
//             </div>

//             {/* Property Info */}
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 border-y border-gray-200 py-6">
//               <div className="flex items-center gap-2">
//                 <BedDouble className="text-primary-color" />
//                 <p>3 Bedrooms</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Bath className="text-primary-color" />
//                 <p>2 Bathrooms</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Ruler className="text-primary-color" />
//                 <p>1200 sqft</p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Home className="text-primary-color" />
//                 <p>{isForSale ? "For Sale" : "For Rent"}</p>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="mb-8">
//               <h3 className="text-2xl font-bold mb-4">Property Description</h3>
//               <p className="text-secondary-text leading-relaxed">
//                 {property.description}
//               </p>
//             </div>

//             {/* Conditional Rent Info */}
//             {!isForSale && (
//               <div className="mb-8 space-y-3">
//                 <h3 className="text-2xl font-bold mb-2">Rental Information</h3>
//                 <p>
//                   <strong>Monthly Rent:</strong>{" "}
//                   {property.monthly_rent || "N/A"} IOTA
//                 </p>
//                 <p>
//                   <strong>Rental Period:</strong>{" "}
//                   {property.rental_period_months} months
//                 </p>
//               </div>
//             )}

//             {/* Video */}
//             <div>
//               <h3 className="text-2xl font-bold mb-4">Inspection Video</h3>
//               <video
//                 controls
//                 className="rounded-lg w-full h-[350px] object-cover shadow-md"
//               >
//                 <source src={property.video_cid} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>

//           {/* Right side - Actions */}
//           <div className="lg:w-1/3">
//             <div className="sticky top-8 bg-secondary-bg p-6 rounded-xl shadow-md border border-gray-200">
//               <h3 className="text-xl font-bold mb-4">Actions</h3>

//               <div className="space-y-4 mb-6">
//                 {isForSale ? (
//                   <button className="w-full h-12 bg-primary-color text-white font-semibold rounded-lg hover:opacity-90 transition">
//                     Buy Property
//                   </button>
//                 ) : (
//                   <button className="w-full h-12 bg-secondary-color text-white font-semibold rounded-lg hover:opacity-90 transition">
//                     Rent Property
//                   </button>
//                 )}
//               </div>

//               {/* Status */}
//               <div className="mb-6">
//                 <p className="text-sm mb-2 font-medium">Transaction Status</p>
//                 <div className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-md">
//                   <CheckCircle size={16} />
//                   <span>Confirmed</span>
//                 </div>
//               </div>

//               {/* Web3 Info */}
//               <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-secondary-text">Property ID:</span>
//                   <span className="truncate max-w-[160px] font-medium">
//                     {property.id.id.slice(0, 10)}...
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-secondary-text">Owner:</span>
//                   <span className="truncate max-w-[160px] font-medium">
//                     {property.owner.slice(0, 10)}...
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-secondary-text">Price:</span>
//                   <span className="font-medium">{property.price} IOTA</span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span className="text-secondary-text">Explorer:</span>
//                   <a
//                     href="#"
//                     className="text-primary-color flex items-center gap-1 hover:underline"
//                   >
//                     View on Tangle <ExternalLink size={14} />
//                   </a>
//                 </div>
//               </div>

//               {/* Created Date */}
//               <div className="border-t border-gray-200 pt-4 mt-4 text-sm flex items-center gap-2 text-secondary-text">
//                 <CalendarDays size={15} />
//                 Listed on:{" "}
//                 {new Date(Number(property.created_at)).toLocaleDateString()}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Listing;
