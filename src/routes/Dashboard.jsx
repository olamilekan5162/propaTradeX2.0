
import { Search, Building, KeyRound, Briefcase } from "lucide-react";
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
  const registeredUserData = useOutletContext()
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
      p.price.toString().includes(searchTerm)
    );
  }, [ownedProperties, searchTerm]);

  const filteredEscrows = useMemo(() => {
    if (!searchTerm) return enrichedEscrows;
    // This is a simplified search. A real implementation would search property details.
    return enrichedEscrows.filter(e =>
      e.property_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [enrichedEscrows, searchTerm]);


  const isPending = isEscrowPending || isReceiptPending || isPropertiesPending;

  const stats = [
    { name: "Total Properties Owned", value: ownedProperties.length, icon: Building },
    { name: "Properties in Escrow", value: enrichedEscrows.length, icon: Briefcase },
    { name: "Properties for Rent", value: ownedProperties.filter(p => p.listing_type === '2').length, icon: KeyRound },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen font-sans">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back, {formatFirstName(registeredUserData[0]?.full_name)}!</h1>
          <p className="text-muted-foreground mt-2">Here is an overview of your property portfolio.</p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 flex items-center gap-6 transition-all duration-300 shadow-lg hover:border-primary/50 hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <stat.icon className="h-8 w-8" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm font-medium">{stat.name}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs and Search */}
        <div className="mb-8">
            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <div className="flex border-b border-border gap-2 md:gap-8">
                    {['owned', 'listed', 'escrow'].map((tab) => (
                        <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 pt-2 px-2 md:px-4 text-sm md:text-base font-bold transition-colors capitalize ${
 activeTab === tab
                            ? "text-primary border-b-[3px] border-primary"
                            : "text-muted-foreground border-b-[3px] border-transparent hover:text-foreground hover:border-border"
                        }`}
                        >
                        {tab}
                        </button>
                    ))}
                </div>
                <div className="relative w-full md:w-auto flex-grow md:flex-grow-0">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20}/>
                    <input
                        type="text"
                        placeholder="Search properties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-card border border-border rounded-lg py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
                    />
                </div>
          </div>
        </div>

        {/* Tab Content */}
        <div>
          {isPending ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">Loading your properties...</p>
            </div>
          ) : (
            <>
              {activeTab === "owned" && (
                <div>
                  {filteredOwnedProperties.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredOwnedProperties.map((prop, i) => (
                        <PropertyCard key={i} property={prop} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-card border border-border rounded-xl">
                       <p className="text-muted-foreground">You don't own any properties yet.</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "listed" && (
                <div className="text-center py-10 bg-card border border-border rounded-xl">
                   <p className="text-muted-foreground">You have not listed any properties yet.</p>
                </div>
              )}

              {activeTab === "escrow" && (
                 <div>
                    {filteredEscrows.length > 0 ? (
                        <div className="flex flex-col gap-4">
                        {filteredEscrows.map((escrow, i) => (
                            <EscrowCard key={i} escrow={escrow} />
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-card border border-border rounded-xl">
                           <p className="text-muted-foreground">No escrow transactions found.</p>
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
