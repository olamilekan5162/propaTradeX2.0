import { SearchIcon } from "lucide-react";
import React from "react";

const Hero = ({ searchTerm, setSearchTerm, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div
        className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center px-4 pb-10 text-center"
        style={{
          backgroundImage:
            'linear-gradient(to top, rgba(17, 17, 22, 1) 0%, rgba(17, 17, 22, 0.6) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAO4SjQsBpIAwr9mHlTjvaZePc0Ceft5GNeWCAttu2mpOAEXW6iRfHmsKKybcQTDnuAchVE6ZlnLsaYX7-cK1VRH3SW1xggwG1X0VgdqwOhtCh7DrFIgk9SSa-CvsX9J1OmoihAh2deyl9gMebXlZ_7h9fe_m_aPq7bbMtTbrJNG5KtWNc5VX5003JupI2h9oVKQpuKnkqp3J4cTdljC1t2gOMASw18JyVDLwkfltA7YsQf1W88PCcfEnQjQJ21qOfPTjurvdpyWg")',
        }}
      >
        <div className="flex flex-col gap-2 max-w-3xl">
          <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
            The Future of Property Trading on the IOTA Blockchain
          </h1>
          <h2 className="text-gray-300 text-base font-normal leading-normal md:text-lg">
            Discover, buy, and rent properties with unparalleled speed and security
          </h2>
        </div>
        <label className="flex flex-col min-w-40 h-14 w-full max-w-2xl mt-4">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
            <div className="text-muted-foreground flex border border-border bg-card items-center justify-center pl-4 rounded-l-lg border-r-0">
              <SearchIcon />
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex w-full min-w-0 flex-1 overflow-hidden rounded-none text-foreground focus:outline-0 focus:ring-0 border-y border-border bg-card focus:border-border h-full placeholder:text-muted-foreground px-4 text-base font-normal leading-normal"
              placeholder="Search by location, property type..."
            />
            <div className="flex items-center justify-center rounded-r-lg border border-border bg-card pr-2 border-l-0">
              <button 
                onClick={handleSearch}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-5 bg-primary text-primary-foreground text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/80 transition-all"
              >
                Search
              </button>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Hero;