import { useCurrentAccount } from "@iota/dapp-kit";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import KycModal from "../components/KycModal";
import PropertyCard from "../components/PropertyCard";
import Hero from "../components/Hero";
import { useFetchProperty } from "../hooks/useFetchProperty";

const Home = () => {
  const { registeredUserData } = useOutletContext();
  const { propertyDetails, isPending } = useFetchProperty();
  const [isKycModalOpen, setIsKycModalOpen] = useState(true);
  const currentAccount = useCurrentAccount();
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    if (currentAccount && registeredUserData && registeredUserData.length === 0) {
      setIsKycModalOpen(true);
    }
  }, [currentAccount, registeredUserData]);

  const closeModal = () => {
    setIsKycModalOpen(false);
  };


  return (
    <div className="bg-background font-display text-foreground">
      {isKycModalOpen && <KycModal closeModal={closeModal} />}
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <main className="flex-1">
                <Hero />
                <div className="w-[50%]bg-background px-4 sm:px-6 lg:px-10 py-5">
                  <div className="flex flex-wrap sm:flex-nowrap gap-3 p-3 rounded-lg bg-card border border-border shadow-lg">
                    {/* Location */}
                    
                    {/* Property Type */}
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Property Type</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="villa">Villa</option>
                    </select>

                    {/* Price Range */}
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Price Range</option>
                      <option value="0-100000">0 - 100,000 IOTA</option>
                      <option value="100000-200000">
                        100,000 - 200,000 IOTA
                      </option>
                      <option value="200000-500000">
                        200,000 - 500,000 IOTA
                      </option>
                    </select>
                   
                  </div>
                </div>
                <h2 className="text-muted-foreground text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                    {" "}
                    Featured Properties{" "}
                  </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
                {isPending && propertyDetails.length === 0
                      ? "loading..."
                      : propertyDetails.map((property) => (
                          <PropertyCard
                            key={property?.id?.id}
                            property={property}
                          />
                        ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
