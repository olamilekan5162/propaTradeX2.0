import {
  Bath,
  BedDouble,
  CheckCircle,
  ExternalLink,
  Play,
  Ruler,
  TowerControl,
} from "lucide-react";

const Listing = () => {
  return (
    <div className="bg-primary-bg  text-primary-text ">
      <div className="relative flex h-full min-h-screen w-full flex-col  overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <main className="flex-1 px-4 md:px-10 lg:px-40 py-8 bg-secondary-bg ">
            <div className="max-w-7xl mx-auto">
              <div
                className="w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-xl min-h-[400px] mb-8"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBL6xySfp5TEEL0pE3LQtQpq1Jd1dLISKpAXWNVotFxCG1YPN0xti_4_OqmH7eQZglN9dgArWOIkWL6jB9tO8EUFpEMcBkq5YGThY5o4FM27i1Z_p2xETLuvxAV1DwiOukW0ujQj8ukO7l1ahXOPwh-lAxy7dYf72kgroFANBiy_5STRG6xcQXjb9drV3oN7r-EZIku-h4CP3Q2yVZYgQ4Qw4NnA5kwfWMXUdLrGExQi1yRues1x8ocknTs95ubftCe0EatxVIz3A")',
                }}
              ></div>
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <div className="mb-6">
                    <h1 className="text-primary-text text-4xl font-black leading-tight tracking-[-0.033em]">
                      Modern Downtown Loft with Skyline Views
                    </h1>
                    <p className="text-secondary-text font-normal leading-normal mt-2">
                      123 Main Street, Metropolis
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
                      Discover the pinnacle of urban living in this exquisite
                      downtown loft. Boasting breathtaking skyline views from
                      floor-to-ceiling windows, this modern residence is
                      designed for comfort and style. The open-concept living
                      space is perfect for entertaining, featuring high-end
                      finishes, hardwood floors, and a gourmet kitchen with
                      state-of-the-art appliances. Retreat to the spacious
                      master suite with its spa-like ensuite bathroom. Located
                      in the heart of Metropolis, you are just steps away from
                      the finest dining, shopping, and cultural attractions.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-text mb-4">
                      Inspection Video
                    </h3>
                    <div className=" w-full sm:w-64 h-64 aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-black relative">
                      <div
                        className="absolute inset-0 bg-center bg-cover"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBL6xySfp5TEEL0pE3LQtQpq1Jd1dLISKpAXWNVotFxCG1YPN0xti_4_OqmH7eQZglN9dgArWOIkWL6jB9tO8EUFpEMcBkq5YGThY5o4FM27i1Z_p2xETLuvxAV1DwiOukW0ujQj8ukO7l1ahXOPwh-lAxy7dYf72kgroFANBiy_5STRG6xcQXjb9drV3oN7r-EZIku-h4CP3Q2yVZYgQ4Qw4NnA5kwfWMXUdLrGExQi1yRues1x8ocknTs95ubftCe0EatxVIz3A")',
                          filter: "blur(4px) brightness(0.7)",
                        }}
                      ></div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-transform hover:scale-110">
                          <Play className="text-white text-6xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <div className="sticky top-8 bg-primary-bg p-6 rounded-xl shadow-lg border border-gray-200">
                    <h3 className="text-2xl font-bold text-primary-text ">
                      Actions
                    </h3>
                    <div className="mb-6">
                      <p className="text-sm font-medium text-secondary-text  mb-2">
                        Transaction Status
                      </p>
                      <div className="flex items-center gap-3 bg-green-100 text-green-600 p-3 rounded-lg">
                        <CheckCircle className="material-symbols-outlined" />

                        <p className="font-bold">Confirmed</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4 mb-6">
                      <button className="w-full flex items-center justify-center h-12 px-6 bg-primary-color text-white text-base font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Buy Now
                      </button>
                      <button className="w-full flex items-center justify-center h-12 px-6 bg-secondary-color text-white text-base font-bold rounded-lg hover:bg-secondary/90 transition-colors">
                        Rent Now
                      </button>
                    </div>
                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="text-lg font-bold text-primary-text mb-4">
                        Receipt
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-secondary-text ">
                            Transaction ID:
                          </span>
                          <a
                            className="text-primary-color hover:underline font-medium truncate ml-2"
                            href="#"
                            title="0x123...abc"
                          >
                            0x123...abc
                          </a>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-text ">Date:</span>
                          <span className="font-medium text-primary-text ">
                            2023-10-27
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-text ">Time:</span>
                          <span className="font-medium text-primary-text ">
                            14:30 UTC
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-secondary-text ">Price:</span>
                          <span className="font-medium text-primary-text">
                            1,500,000 IOTA
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary-text">Explorer:</span>
                          <a
                            className="text-primary-color hover:underline font-medium flex items-center gap-1"
                            href="#"
                          >
                            <span>View on Tangle</span>
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </div>
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
