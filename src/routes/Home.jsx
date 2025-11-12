import { useCurrentAccount } from "@iota/dapp-kit";
import React, { useEffect, useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import KycModal from "../components/KycModal";
import PropertyCard from "../components/PropertyCard";
import Hero from "../components/Hero";
import { useFetchProperty } from "../hooks/useFetchProperty";
import { Filter, X } from "lucide-react";

const Home = () => {
  const { registeredUserData } = useOutletContext();
  const { propertyDetails, isPending } = useFetchProperty();
  const [isKycModalOpen, setIsKycModalOpen] = useState(true);
  const currentAccount = useCurrentAccount();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  useEffect(() => {
    if (currentAccount && registeredUserData && registeredUserData.length === 0) {
      setIsKycModalOpen(false);
    }
  }, [currentAccount, registeredUserData]);

  const closeModal = () => {
    setIsKycModalOpen(false);
  };

  const handleSearch = () => {
    setActiveSearch(searchTerm);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setActiveSearch("");
    setPropertyType("");
    setPriceRange("");
  };

  // Filter logic
  const filteredProperties = useMemo(() => {
    if (!propertyDetails || propertyDetails.length === 0) return [];

    return propertyDetails.filter((property) => {
      // Search filter
      const matchesSearch = !activeSearch || 
        property?.property_type?.toLowerCase().includes(activeSearch.toLowerCase()) ||
        property?.property_address?.toLowerCase().includes(activeSearch.toLowerCase());

      // Property type filter
      const matchesType = !propertyType || 
        property?.property_type?.toLowerCase() === propertyType.toLowerCase();

      // Price range filter
      let matchesPrice = true;
      if (priceRange) {
        const price = Number(property?.price);
        const [min, max] = priceRange.split("-").map(Number);
        matchesPrice = price >= min && price <= max;
      }

      return matchesSearch && matchesType && matchesPrice;
    });
  }, [propertyDetails, activeSearch, propertyType, priceRange]);

  const hasActiveFilters = activeSearch || propertyType || priceRange;

  return (
    <div className="bg-background font-sans text-foreground min-h-screen">
      {isKycModalOpen && <KycModal closeModal={closeModal} />}
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center">
            <div className="layout-content-container flex flex-col w-full">
              <main className="flex-1">
                <Hero 
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  handleSearch={handleSearch}
                />
                
                {/* Filter Section */}
                <div className="container mx-auto px-4 py-8 max-w-7xl">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-lg mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Filter size={20} className="text-primary" />
                        <h3 className="text-lg font-bold">Filter Properties</h3>
                      </div>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X size={16} />
                          Clear Filters
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Property Type */}
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Property Type
                        </label>
                        <select
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">All Types</option>
                          <option value="house">House</option>
                          <option value="apartment">Apartment</option>
                          <option value="villa">Villa</option>
                          <option value="duplex">Duplex</option>
                          <option value="condo">Condo</option>
                          <option value="studio">Studio</option>
                        </select>
                      </div>

                      {/* Price Range */}
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          Price Range
                        </label>
                        <select
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                          className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        >
                          <option value="">All Prices</option>
                          <option value="0-100000">0 - 100,000 IOTA</option>
                          <option value="100000-500000">100,000 - 500,000 IOTA</option>
                          <option value="500000-1000000">500,000 - 1,000,000 IOTA</option>
                          <option value="1000000-5000000">1,000,000 - 5,000,000 IOTA</option>
                          <option value="5000000-999999999">5,000,000+ IOTA</option>
                        </select>
                      </div>
                    </div>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                        {activeSearch && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            Search: "{activeSearch}"
                            <button onClick={() => { setSearchTerm(""); setActiveSearch(""); }}>
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        {propertyType && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            Type: {propertyType}
                            <button onClick={() => setPropertyType("")}>
                              <X size={12} />
                            </button>
                          </span>
                        )}
                        {priceRange && (
                          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                            Price: {priceRange.replace("-", " - ")} IOTA
                            <button onClick={() => setPriceRange("")}>
                              <X size={12} />
                            </button>
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                      {hasActiveFilters ? "Search Results" : "Featured Properties"}
                    </h2>
                    <span className="text-muted-foreground text-sm">
                      {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"} found
                    </span>
                  </div>

                  {/* Property Grid */}
                  {isPending ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-card border border-border rounded-xl h-80 animate-pulse"></div>
                      ))}
                    </div>
                  ) : filteredProperties.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredProperties.map((property) => (
                        <PropertyCard
                          key={property?.id?.id}
                          property={property}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="bg-card border border-border rounded-xl p-12">
                        <Filter className="mx-auto mb-4 text-muted-foreground" size={48} />
                        <h3 className="text-xl font-bold mb-2">No Properties Found</h3>
                        <p className="text-muted-foreground mb-4">
                          Try adjusting your filters or search terms
                        </p>
                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/80 transition-all"
                          >
                            Clear All Filters
                          </button>
                        )}
                      </div>
                    </div>
                  )}
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