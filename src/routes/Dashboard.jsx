import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-primary-bg font-display text-primary-text">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="flex flex-1 justify-center py-5 bg-secondary-bg">
            <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1">
              <div className="flex-1 p-10 bg-secondary-bg ">
                <div className="flex flex-wrap justify-between gap-3 mb-8">
                  <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-primary-text text-4xl font-black leading-tight tracking-[-0.033em]">
                      Welcome back, Alex!
                    </p>
                    <p className="text-secondary-text text-base font-normal leading-normal">
                      Here is an overview of your property portfolio.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg bg-primary-bg p-6 border border-border-color">
                    <p className="text-secondary-text text-base font-medium leading-normal">
                      Portfolio Value Trend
                    </p>
                    <p className="text-primary-text tracking-light text-[32px] font-bold leading-tight truncate">
                      $1,250,000
                    </p>
                    <div className="flex gap-1">
                      <p className="text-secondary-text text-base font-normal leading-normal">
                        Last 12 months
                      </p>
                      <p className="text-primary-color text-base font-medium leading-normal">
                        +5.2%
                      </p>
                    </div>
                    <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
                      <svg
                        fill="none"
                        height="148"
                        preserveAspectRatio="none"
                        viewBox="-3 0 478 150"
                        width="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H326.769H0V109Z"
                          fill="url(#paint0_linear_1131_5935)"
                        ></path>
                        <path
                          d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                          stroke="var(--primary-color)"
                          stroke-linecap="round"
                          stroke-width="3"
                        ></path>
                        <defs>
                          <linearGradient
                            gradientUnits="userSpaceOnUse"
                            id="paint0_linear_1131_5935"
                            x1="236"
                            x2="236"
                            y1="1"
                            y2="149"
                          >
                            <stop
                              stop-color="var(--primary-color)"
                              stop-opacity="0.3"
                            ></stop>
                            <stop
                              offset="1"
                              stop-color="var(--primary-bg)"
                              stop-opacity="0"
                            ></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="flex justify-around">
                        <p className="text-secondary-text text-[13px] font-bold leading-normal tracking-[0.015em]">
                          Jan
                        </p>
                        <p className="text-secondary-text text-[13px] font-bold leading-normal tracking-[0.015em]">
                          Feb
                        </p>
                        <p className="text-secondary-text text-[13px] font-bold leading-normal tracking-[0.015em]">
                          Mar
                        </p>
                        <p className="text-secondary-text text-[13px] font-bold leading-normal tracking-[0.015em]">
                          Apr
                        </p>
                        <p className="text-secondary-text text-[13px] font-bold leading-normal tracking-[0.015em]">
                          May
                        </p>
                        <p className="text-secondary-text text-[13px] font-bold leading-normal tracking-[0.015em]">
                          Jun
                        </p>
                        <p className="text-secondary-text text-[13px] font-bold leading-normal tracking-[0.015em]">
                          Jul
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-lg bg-primary-bg p-6 border border-border-color">
                    <p className="text-secondary-text text-base font-medium leading-normal">
                      Property Type Distribution
                    </p>
                    <p className="text-primary-text tracking-light text-[32px] font-bold leading-tight truncate">
                      5 Properties
                    </p>
                    <div className="flex gap-1">
                      <p className="text-secondary-text text-base font-normal leading-normal">
                        All time
                      </p>
                      <p className="text-primary-color text-base font-medium leading-normal">
                        +1 property
                      </p>
                    </div>
                    <div className="flex-1 flex items-center justify-center py-4">
                      <div className="relative size-48">
                        <svg
                          className="size-full"
                          height="36"
                          viewBox="0 0 36 36"
                          width="36"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="18"
                            cy="18"
                            fill="transparent"
                            r="15.9154943092"
                            stroke="var(--border-color)"
                            stroke-width="3"
                          ></circle>
                          <circle
                            cx="18"
                            cy="18"
                            fill="transparent"
                            r="15.9154943092"
                            stroke="var(--primary-color)"
                            stroke-dasharray="60 40"
                            stroke-dashoffset="25"
                            stroke-width="3"
                          ></circle>
                          <circle
                            cx="18"
                            cy="18"
                            fill="transparent"
                            r="15.9154943092"
                            stroke="var(--secondary-color)"
                            stroke-dasharray="20 80"
                            stroke-dashoffset="-15"
                            stroke-width="3"
                          ></circle>
                        </svg>
                      </div>
                    </div>
                    <div className="flex justify-center gap-6">
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-primary-color"></div>
                        <p className="text-secondary-text text-sm font-medium">
                          Residential
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-secondary-color"></div>
                        <p className="text-secondary-text text-sm font-medium">
                          Commercial
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-border-color"></div>
                        <p className="text-secondary-text text-sm font-medium">
                          Industrial
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pb-3 bg-primary-bg rounded-t-lg">
                  <div className="flex border-b border-border-color px-4 gap-8">
                    <a
                      className="flex flex-col items-center justify-center border-b-[3px] border-b-primary-color text-primary-color pb-[13px] pt-4"
                      href="#"
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        Owned
                      </p>
                    </a>
                    <a
                      className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-secondary-text pb-[13px] pt-4 hover:border-b-primary-color/50 hover:text-primary-color transition-colors"
                      href="#"
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        Listed
                      </p>
                    </a>
                    <a
                      className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-secondary-text pb-[13px] pt-4 hover:border-b-primary-color/50 hover:text-primary-color transition-colors"
                      href="#"
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        Rented
                      </p>
                    </a>
                  </div>
                </div>
                <div className="px-4 py-3 bg-primary-bg ">
                  <label className="flex flex-col min-w-40 h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-border-color">
                      <div className="text-secondary-text flex border border-r-0 border-border-color bg-secondary-bg items-center justify-center pl-4 rounded-l-lg">
                        <Search />
                      </div>
                      <input
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-primary-text focus:outline-0 focus:ring-0 bg-primary-bg h-full placeholder:text-secondary-text px-4 rounded-l-none  pl-2 text-base font-normal leading-normal"
                        placeholder="Search by location, price, or status"
                        value=""
                      />
                    </div>
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 bg-primary-bg rounded-b-lg">
                  <div className="rounded-lg bg-primary-bg border border-border-color overflow-hidden flex flex-col  hover:border-primary-color transition-all duration-300 shadow-sm">
                    <div
                      className="h-48 bg-cover bg-center"
                      data-alt="Modern downtown apartment with a balcony"
                      style={{
                        backgroundImage:
                          'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiNb6yoh5Z-8kBOWVAil8PWd1gjnOIiNKm5q-uBn-V0IxJBZDh7Cm2AdBSjVwhA03MX3ogfpmPxVypYrjd6lrvMElx2TKWjEatmbn2b1rFv60lTd2xAZnQe_nQv6yTLMrgAgTuM5-gHWGubNnt6pDRgqQIbqe7eNlH66HmF6Pyujak9MNLX7KwWl81S8fHZ8O_qhPchuGP8p7rqfw8Qf7lmbcwe2rGK6wVhUQh1XLgMebw7ePJ9Y0a1lzshHk1NZORZvFV5q4K1Q")',
                      }}
                    ></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-primary-text">
                        Downtown Luxury Apartment
                      </h3>
                      <p className="text-sm text-secondary-text mb-4">
                        123 Main St, Metropolis
                      </p>
                      <div className="flex-1">
                        <p className="text-secondary-text">
                          Current Value:{" "}
                          <span className="text-primary-text font-semibold">
                            $750,000
                          </span>
                        </p>
                      </div>
                      <button className="mt-4 w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-color/10 text-primary-color text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-color/20 transition-colors">
                        <span className="truncate">Manage</span>
                      </button>
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary-bg border border-border-color overflow-hidden flex flex-col group hover:border-primary-color transition-all duration-300 shadow-sm">
                    <div
                      className="h-48 bg-cover bg-center"
                      data-alt="Suburban family home with a large yard"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBX3-aZaRiM5xO68o33PzRrviVuUg_jxsoBlibEMgflDjlQz9KRBQIsrB2utI_HnBnQv7SIadwNGPQT8PbhmSGwRvCYCtdySK-r_R9xKOVNjgiB_PAde53vUhXpSQBwr56UidE2zsXeGKnbgoe1CoQmBm9myPZho1ieYpYBXoIt21UjL_W_UY9xK3NCWlZUjdJFDFV6XsqD3MywHbrpSCKyMEWX3zmPUEVZrzBaYvLE_PDcRdajtGz-z90Uovavi1tc6-ekrxmkHQ')",
                      }}
                    ></div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-lg font-bold text-primary-text">
                        Suburban Family Home
                      </h3>
                      <p className="text-sm text-secondary-text mb-4">
                        456 Oak Ave, Suburbia
                      </p>
                      <div className="flex-1">
                        <p className="text-secondary-text">
                          Current Value:{" "}
                          <span className="text-primary-text font-semibold">
                            $500,000
                          </span>
                        </p>
                      </div>
                      <button className="mt-4 w-full flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-color/10 text-primary-color text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-color/20 transition-colors">
                        <span className="truncate">Manage</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 pt-6">
                  <button className="size-8 rounded-lg bg-primary-bg border border-border-color text-secondary-text hover:bg-secondary-bg hover:text-primary-text transition-colors flex items-center justify-center">
                    <ChevronLeft className="text-base" />
                  </button>
                  <button className="size-8 rounded-lg bg-primary-color text-primary-bg font-bold text-sm">
                    1
                  </button>
                  <button className="size-8 rounded-lg bg-primary-bg text-secondary-text font-bold text-sm hover:bg-secondary-bg hover:text-primary-text transition-colors">
                    2
                  </button>
                  <button className="size-8 rounded-lg bg-primary-bg text-secondary-text font-bold text-sm hover:bg-secondary-bg hover:text-primary-text transition-colors">
                    3
                  </button>
                  <button className="size-8 rounded-lg bg-primary-bg border border-border-color text-secondary-text hover:bg-secondary-bg hover:text-primary-text transition-colors flex items-center justify-center">
                    <ChevronRight className="text-base" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
