import Hero from "../components/Hero";

const Home = () => {
  return (
    <div className="bg-primary-bg font-display text-primary-text">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <main className="flex-1">
                <Hero />
                <div className="bg-primary-bg px-4 sm:px-6 lg:px-10 py-5">
                  <div className="flex flex-wrap sm:flex-nowrap gap-3 p-3 ">
                    {/* Location */}

                    <select className="flex h-8 w-36 sm:w-auto shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 pl-4 pr-8 text-sm font-medium text-gray-800 hover:bg-gray-200 appearance-none focus:outline-none">
                      <option>Location</option>
                      <option>New York</option>
                      <option>Los Angeles</option>
                    </select>

                    {/* Property Type */}

                    <select className="flex h-8 w-36 sm:w-auto shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 pl-4 pr-8 text-sm font-medium text-gray-800 hover:bg-gray-200 appearance-none focus:outline-none">
                      <option>Property Type</option>
                      <option>Apartment</option>
                      <option>House</option>
                    </select>

                    {/* Price Range */}

                    <select className="flex h-8 w-36 sm:w-auto shrink-0 items-center justify-center gap-x-2 rounded-lg bg-gray-100 pl-4 pr-8 text-sm font-medium text-gray-800 hover:bg-gray-200 appearance-none focus:outline-none">
                      <option>Price Range</option>
                      <option>$0 - $100k</option>
                      <option>$100k - $500k</option>
                    </select>
                  </div>

                  <h2 className="text-primary-text text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                    {" "}
                    Featured Properties{" "}
                  </h2>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-4">
                    <div className="flex flex-col gap-3 pb-3 rounded-lg bg-secondary-bg overflow-hidden group">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-300 group-hover:scale-105"
                        data-alt="A modern villa with a swimming pool"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPx36n8MBcQx4xgAwer8Uiq33oJPcgBc_1u9xYtVEEUb-3g1FIaE6FSd4mAlpdwZi8L7HzIWenDirVQdzah1lkRLvObUmu3gIulN7N2Ueeltq9jDSHgkC_rNsCKYK0gug_nSZXEX2BZRzIJwAl0ES0gEqZHeJmLoeiqeD-5uCv1_q5tG9SpOfhI5pTzKRNQGNyYknP37SyWBB2JKBIIXxSSBonRqaNz7RDxf8CJdK2kVmlHkQXOhvs4_XpdMb7AGLIXlhUJYGc6A")',
                        }}
                      ></div>
                      <div className="px-4">
                        <p className="text-primary-text text-base font-medium leading-normal">
                          {" "}
                          Modern Villa in Miami{" "}
                        </p>
                        <p className="text-secondary-color text-sm font-bold leading-normal">
                          {" "}
                          1,500,000 IOTA{" "}
                        </p>
                        <p className="text-secondary-text text-sm font-normal leading-normal">
                          {" "}
                          3 beds, 2 baths, 2,500 sqft{" "}
                        </p>
                      </div>
                      <div className="flex gap-2 px-4 pb-2 mt-2">
                        <button className="flex-1 text-center py-2 rounded-md bg-primary-color text-white text-sm font-bold hover:bg-opacity-80">
                          {" "}
                          Buy{" "}
                        </button>
                        <button className="flex-1 text-center py-2 rounded-md bg-gray-300 text-primary-text text-sm font-bold hover:bg-gray-400">
                          {" "}
                          View Details{" "}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3 rounded-lg bg-secondary-bg overflow-hidden group">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-300 group-hover:scale-105"
                        data-alt="Luxury condo with a view of the ocean"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC8b7D7SZBlY2qNhjPeggpWU03E1e0r07zMsuZmh2JUDe1NyICybxmJ6qhsF55KviXM0Tbr-pfb5j2gBtmYfS6bnhPzGx6AxJAJkQ3Jt0hB_ZcbCetqco5-0nX-uJuegwH5L1PyDFh0b092U70LEmI1M8acy3C3qSTQRy1Fq3vwDw5Wgffl5AZmq8swQHYWj8arPfEiPPDTicaIBkSAezsLdQIuvgRhjvJuID3bm7JTVnKcALC7ne7bj_1uXbTioO4m03yhbNLI4w")',
                        }}
                      ></div>
                      <div className="px-4">
                        <p className="text-primary-text text-base font-medium leading-normal">
                          {" "}
                          Luxury Condo with Ocean View{" "}
                        </p>
                        <p className="text-secondary-color text-sm font-bold leading-normal">
                          {" "}
                          3,200,000 IOTA{" "}
                        </p>
                        <p className="text-secondary-text text-sm font-normal leading-normal">
                          {" "}
                          2 beds, 2 baths, 1,800 sqft{" "}
                        </p>
                      </div>
                      <div className="flex gap-2 px-4 pb-2 mt-2">
                        <button className="flex-1 text-center py-2 rounded-md bg-primary-color text-white text-sm font-bold hover:bg-opacity-80">
                          {" "}
                          Buy{" "}
                        </button>
                        <button className="flex-1 text-center py-2 rounded-md bg-gray-300 text-primary-text text-sm font-bold hover:bg-gray-400">
                          {" "}
                          View Details{" "}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3 rounded-lg bg-secondary-bg overflow-hidden group">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-300 group-hover:scale-105"
                        data-alt="A cozy suburban family home"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC-_mVkDtomWRCmLcs6zt5VeuvZlDNTJH7-FlSQSEOZ2VK269_BwwuLy5n8csXCU9GYzHARGW-1dvLxwqiFW3UYlMUVmkZxtxEFqFy8ox30ZP1YvSEsJW6M7aspBOHHP47moUJENHdfojQfxGJPXMvkPbTl7UInfslPwBcnEOX0rcws-hk0T9gMkTu9_1ehmmb2XV1S6fB51VFWZFtBR0mr8vUDJN26_fJ3zSYMjBlZgLJcRs4BUxpamybzvTozLzOfZPq9ZuxU-g")',
                        }}
                      ></div>
                      <div className="px-4">
                        <p className="text-primary-text text-base font-medium leading-normal">
                          {" "}
                          Suburban Family Home{" "}
                        </p>
                        <p className="text-secondary-color text-sm font-bold leading-normal">
                          {" "}
                          850,000 IOTA{" "}
                        </p>
                        <p className="text-secondary-text text-sm font-normal leading-normal">
                          {" "}
                          4 beds, 3 baths, 3,000 sqft{" "}
                        </p>
                      </div>
                      <div className="flex gap-2 px-4 pb-2 mt-2">
                        <button className="flex-1 text-center py-2 rounded-md bg-primary-color text-white text-sm font-bold hover:bg-opacity-80">
                          {" "}
                          Buy{" "}
                        </button>
                        <button className="flex-1 text-center py-2 rounded-md bg-gray-300 text-primary-text text-sm font-bold hover:bg-gray-400">
                          {" "}
                          View Details{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-primary-text text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">
                    {" "}
                    Recent Listings{" "}
                  </h2>
                  <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-4">
                    <div className="flex flex-col gap-3 pb-3 rounded-lg bg-secondary-bg overflow-hidden group">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-300 group-hover:scale-105"
                        data-alt="Downtown Loft Apartment"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAhQCcQR-wCEyJSghuJZsQWEFXzD5xerLksUN73H66GigIhHSKWrnOgFNLOieHQlae3jTJpkqx5HhYvc4pNINWeZWmntBhBUT6lMLMGE3tIndoXucozHQc15yFF8K4HVyCJyBCGDUUE3GuMqa2TzryZ4C68Vh32WixlrEJEltWFqjyevh64l9ku2xHUYWO9m68MRV5bRxk8dmsdLE2_Ghgy_dPobfvAMVGWB_grPlOV2Bl9FcZRsYAzjpiwroKNoAUNcFytDRGePA")',
                        }}
                      ></div>
                      <div className="px-4">
                        <p className="text-primary-text text-base font-medium leading-normal">
                          {" "}
                          Downtown Loft Apartment{" "}
                        </p>
                        <p className="text-secondary-color text-sm font-bold leading-normal">
                          {" "}
                          1,100,000 IOTA{" "}
                        </p>
                        <p className="text-secondary-text text-sm font-normal leading-normal">
                          {" "}
                          1 bed, 1 bath, 1,200 sqft{" "}
                        </p>
                      </div>
                      <div className="flex gap-2 px-4 pb-2 mt-2">
                        <button className="flex-1 text-center py-2 rounded-md bg-primary-color text-white text-sm font-bold hover:bg-opacity-80">
                          {" "}
                          Buy{" "}
                        </button>
                        <button className="flex-1 text-center py-2 rounded-md bg-gray-300 text-primary-text text-sm font-bold hover:bg-gray-400">
                          {" "}
                          View Details{" "}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3 rounded-lg bg-secondary-bg overflow-hidden group">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-300 group-hover:scale-105"
                        data-alt="A modern apartment building"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCn4IvwkmcCAEBzH6fx4n_e9NKBiv5xTdMTRxMqtyNKR3UmVhhpjgbUHuFGIF6N6AwpEvFL-V6qDiu188aoiCOJacuxdaiJQIwvpvgUHG8gm_Cifi6wqTN8bHRV14l0ibP7m8igMFdGwxEkNg5O6oXaPWACxITLah2ltfzh93NQXkkRpUBfOQVPLQQis2dvb2czy3IUYTB4WMDN6ze-WBFwqj9hk7o65R6fMc7arJ0edvjeEe1yhY2H0iSeJIWVeFoJWEccjDONRA")',
                        }}
                      ></div>
                      <div className="px-4">
                        <p className="text-primary-text text-base font-medium leading-normal">
                          {" "}
                          City Center Apartment{" "}
                        </p>
                        <p className="text-secondary-color text-sm font-bold leading-normal">
                          {" "}
                          6,000 IOTA/mo{" "}
                        </p>
                        <p className="text-secondary-text text-sm font-normal leading-normal">
                          {" "}
                          2 beds, 1 bath, 900 sqft{" "}
                        </p>
                      </div>
                      <div className="flex gap-2 px-4 pb-2 mt-2">
                        <button className="flex-1 text-center py-2 rounded-md bg-secondary-color text-white text-sm font-bold hover:bg-opacity-80">
                          {" "}
                          Rent{" "}
                        </button>
                        <button className="flex-1 text-center py-2 rounded-md bg-gray-300 text-primary-text text-sm font-bold hover:bg-gray-400">
                          {" "}
                          View Details{" "}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 pb-3 rounded-lg bg-secondary-bg overflow-hidden group">
                      <div
                        className="w-full bg-center bg-no-repeat aspect-video bg-cover transition-transform duration-300 group-hover:scale-105"
                        data-alt="A charming house in the countryside"
                        style={{
                          backgroundImage:
                            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB8gw2M_Lc564qkoL1egUwr8pk9fs9s2-IvbC2s3EImKt7xV-iLFJn_gwUgfJdEYyN4weckTDm-x74w078AkHHEgn9IKjFM0Eekl4Q70jPCEDqW_XLKPgCGVxgaQavyC3HOyvEom7HhN737reB4hVxPbdjoF4mUzYQe8cn3-BsnuRgPZjY9N9kfwbB8lgq2zWWucMT4v7yiujiAuu13m5QMsFP-Ri8jkAaIDcHr8wf1yHqWttyD1JD7EEgiiV1G9m_oEYCdonz3yA")',
                        }}
                      ></div>
                      <div className="px-4">
                        <p className="text-primary-text text-base font-medium leading-normal">
                          {" "}
                          Countryside Cottage{" "}
                        </p>
                        <p className="text-secondary-color text-sm font-bold leading-normal">
                          {" "}
                          450,000 IOTA{" "}
                        </p>
                        <p className="text-secondary-text text-sm font-normal leading-normal">
                          {" "}
                          2 beds, 1 bath, 1,500 sqft{" "}
                        </p>
                      </div>
                      <div className="flex gap-2 px-4 pb-2 mt-2">
                        <button className="flex-1 text-center py-2 rounded-md bg-primary-color text-white text-sm font-bold hover:bg-opacity-80">
                          {" "}
                          Buy{" "}
                        </button>
                        <button className="flex-1 text-center py-2 rounded-md bg-gray-300 text-primary-text text-sm font-bold hover:bg-gray-400">
                          {" "}
                          View Details{" "}
                        </button>
                      </div>
                    </div>
                  </div>
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
