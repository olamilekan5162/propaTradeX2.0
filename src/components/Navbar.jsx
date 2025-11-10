import { ConnectButton } from "@iota/dapp-kit";
import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full bg-primary-bg  border-b border-solid border-gray-200  px-4 md:px-10 lg:px-40">
      <div className="flex items-center justify-between whitespace-nowrap h-16 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 text-primary-text">
          <div className="size-6 text-primary-color">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_330)">
                <path
                  clip-rule="evenodd"
                  d="M24 0.757355L47.2426 24L24 47.2426L0.757355 24L24 0.757355ZM21 35.7574V12.2426L9.24264 24L21 35.7574Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_6_330">
                  <rect fill="white" height="48" width="48"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>
          <h2 className="text-primary-text text-lg font-bold leading-tight tracking-[-0.015em]">
            PropaTradeX
          </h2>
        </div>
        <div className="hidden md:flex flex-1 justify-center gap-8">
          <NavLink
            className="text-secondary-text text-sm font-medium leading-normal hover:text-primary "
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="text-primary text-sm font-medium leading-normal"
            to="kyc"
          >
            Kyc
          </NavLink>
          <NavLink
            className="text-secondary-text text-sm font-medium leading-normal hover:text-primary "
            to="dashboard"
          >
            Dashboard
          </NavLink>
          <NavLink
            className="text-secondary-text text-sm font-medium leading-normal hover:text-primary "
            to="chats"
          >
            Messages
          </NavLink>
          <NavLink
            className="text-secondary-text text-sm font-medium leading-normal hover:text-primary "
            to="upload"
          >
            Upload
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <ConnectButton className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary-color text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors" />

          <NavLink
            to={"profile"}
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpnTCpM1kz8XGj2WvIaiJ3Cr8CF988I6uX5Y3O14aQ5IIHb13PwdmQFWHODryRlP58UeFAl75Ap7lS6Wgj7c0FXh3Rr0d37AikupOrU36s34Znzd1E8mn46tAY3D7ZyVEKJBRQCirfiKZmWHMDSP5UTjMWLb02Uck59AKofz3ugzxuNOIL86ZYkVE28Wfs82YMgpm13Lrlbp0q5GK7McEfcbRyPrpAr6yfCWbmXQoaUC_xEWCL9EVEThKX9790t7D-0cpFz5T6Mw")',
            }}
          ></NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
