import { Search, Building, KeyRound, Briefcase, TrendingUp, Filter, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useNetworkVariables } from "../config/networkConfig";
import { useCurrentAccount, useIotaClientQuery } from "@iota/dapp-kit";
import EscrowCard from "../components/EscrowCard";
import PropertyCard from "../components/PropertyCard";
import { useFetchProperty } from "../hooks/useFetchProperty.jsx";
import { useOutletContext } from "react-router-dom";
import { formatFirstName } from "../utils/helper.js";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("owned");
  const [searchTerm, setSearchTerm] = useState("");
  const currentAccount = useCurrentAccount();
  const { propatradexPackageId } = useNetworkVariables("propatradexPackageId");
  const registeredUserData = useOutletContext();
  const { propertyDetails: properties, isPending: isPropertiesPending } = useFetchProperty();

  const { data: escrowData, isPending: isEscrowPending } = useIotaClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${propatradexPackageId}::propatradex::EscrowCreated`,
      },
    },
    {
      select: (data) =>
        data.data
          .flatMap((x) => x.parsedJson)
          .filter(
            (y) =>
              y.seller_landlord === currentAccount.address ||
              y.buyer_renter === currentAccount.address
          ),
    }
  );

  const { data: receipts, isPending: isReceiptPending } = useIotaClientQuery(
    "getOwnedObjects",
    {
      owner: currentAccount?.address || "",
      filter: {
        StructType: `${propatradexPackageId}::propatradex::PropertyReceipt`,
      },
      options: {
        showContent: true,
      },
    },
    {
      enabled: !!currentAccount?.address,
      select: (data) => data?.data?.map((x) => x?.data?.content?.fields) ?? [],
    }
  );

  const enrichedEscrows = useMemo(() => {
    if (!escrowData || !receipts) return [];

    return escrowData.map((escrow) => {
      const myReceipt = receipts.find(
        (receipt) =>
          receipt.property_id === escrow.property_id ||
          receipt.timestamp === escrow.timestamp
      );

      const {
        property_id,
        listing_type,
        seller_landlord_address,
        buyer_renter_address,
        ...receiptRest
      } = myReceipt || {};

      return {
        ...escrow,
        ...receiptRest,
        myReceiptId: myReceipt?.id?.id || null,
        isBuyer: currentAccount?.address === escrow.buyer_renter,
        isSeller: currentAccount?.address === escrow.seller_landlord,
      };
    });
  }, [escrowData, receipts, currentAccount?.address]);
  
  const ownedProperties = useMemo(() => {
    if (!properties || !receipts) return [];
    const ownedPropertyIds = new Set(receipts.map(r => r.property_id));
    return properties.filter(p => ownedPropertyIds.has(p.id.id));
  }, [properties, receipts]);

  const filteredOwnedProperties = useMemo(() => {
    if (!searchTerm) return ownedProperties;
    return ownedProperties.filter(p => 
      p.property_address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.property_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.price.toString().includes(searchTerm)
    );
  }, [ownedProperties, searchTerm]);

  const filteredEscrows = useMemo(() => {
    if (!searchTerm) return enrichedEscrows;
    return enrichedEscrows.filter(e =>
      e.property_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.property_address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.property_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enrichedEscrows, searchTerm]);

  const isPending = isEscrowPending || isReceiptPending || isPropertiesPending;

  const stats = [
    { 
      name: "Total Properties Owned", 
      value: ownedProperties.length, 
      icon: Building,
      trend: "+2 this month",
      color: "primary"
    },
    { 
      name: "Properties in Escrow", 
      value: enrichedEscrows.length, 
      icon: Briefcase,
      trend: `${enrichedEscrows.filter(e => e.isBuyer).length} as buyer`,
      color: "accent"
    },
    { 
      name: "Properties for Rent", 
      value: ownedProperties.filter(p => p.listing_type === '2').length, 
      icon: KeyRound,
      trend: "Active listings",
      color: "chart-2"
    },
  ];

  const tabConfig = [
    { id: 'owned', label: 'My Properties', count: filteredOwnedProperties.length },
    { id: 'listed', label: 'Listed', count: 0 },
    { id: 'escrow', label: 'In Escrow', count: filteredEscrows.length },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header Section */}
      <div className="border-b border-border bg-card/30 backdrop-blur">
        <div className="container mx-auto py-8 px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground text-transparent bg-clip-text">
                Welcome Back, {formatFirstName(registeredUserData[0]?.full_name)}!
              </h1>
              <p className="text-muted-foreground mt-2">Manage your property portfolio and track transactions</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20">
                <p className="text-xs font-medium">Portfolio Value</p>
                <p className="text-xl font-bold">
                  {ownedProperties.reduce((sum, p) => sum + Number(p.price), 0).toLocaleString()} IOTA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4 max-w-5xl">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-6 transition-all duration-300 shadow-lg hover:border-primary/50 hover:shadow-[0_0_20px_var(--color-primary)] group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 bg-${stat.color}/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-7 w-7 text-${stat.color}`} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm font-medium mb-2">{stat.name}</p>
              <p className="text-xs text-green-500 font-medium">{stat.trend}</p>
            </div>
          ))}
        </div>

        {/* Tabs and Search Bar */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Tabs */}
            <div className="flex border border-border rounded-lg p-1 bg-background overflow-x-auto">
              {tabConfig.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-2.5 rounded-md text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_var(--color-primary)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                      activeTab === tab.id 
                        ? "bg-primary-foreground/20 text-primary-foreground" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder={`Search ${activeTab} properties...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-background border border-border rounded-lg py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Info */}
          {searchTerm && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Found <span className="font-bold text-primary">
                  {activeTab === 'owned' ? filteredOwnedProperties.length : 
                   activeTab === 'escrow' ? filteredEscrows.length : 0}
                </span> result{(activeTab === 'owned' ? filteredOwnedProperties.length : filteredEscrows.length) !== 1 ? 's' : ''} for "{searchTerm}"
              </p>
            </div>
          )}
        </div>

        {/* Tab Content */}
        <div>
          {isPending ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {activeTab === "owned" && (
                <div>
                  {filteredOwnedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredOwnedProperties.map((prop, i) => (
                        <PropertyCard key={i} property={prop} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="bg-card border border-border rounded-xl p-12">
                        <Building className="mx-auto mb-4 text-muted-foreground" size={48} />
                        <h3 className="text-xl font-bold mb-2">
                          {searchTerm ? "No Properties Found" : "No Properties Yet"}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {searchTerm 
                            ? "Try adjusting your search terms"
                            : "Start building your portfolio by purchasing properties"}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/80 transition-all"
                          >
                            Clear Search
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "listed" && (
                <div className="text-center py-16">
                  <div className="bg-card border border-border rounded-xl p-12">
                    <KeyRound className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <h3 className="text-xl font-bold mb-2">No Listed Properties</h3>
                    <p className="text-muted-foreground mb-6">
                      List your properties to start earning rental income
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "escrow" && (
                <div>
                  {filteredEscrows.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {filteredEscrows.map((escrow, i) => (
                        <EscrowCard key={i} escrow={escrow} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="bg-card border border-border rounded-xl p-12">
                        <Briefcase className="mx-auto mb-4 text-muted-foreground" size={48} />
                        <h3 className="text-xl font-bold mb-2">
                          {searchTerm ? "No Escrow Transactions Found" : "No Active Escrow"}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          {searchTerm
                            ? "Try adjusting your search terms"
                            : "Your escrow transactions will appear here"}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/80 transition-all"
                          >
                            Clear Search
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;