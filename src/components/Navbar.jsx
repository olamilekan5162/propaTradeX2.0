import { ConnectButton, useCurrentAccount } from "@iota/dapp-kit";
import Jazzicon from "react-jazzicon";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ registeredUserData }) => {
  const currentAccount = useCurrentAccount();

  return (
    <header className="w-full bg-background  border-b border-solid border-border  px-4 md:px-10 lg:px-40">
      <div className="flex items-center justify-between whitespace-nowrap h-16 max-w-7xl mx-auto">
        <Link to={"/"} className="flex items-center gap-4 text-foreground">
          <div className="size-6 text-primary">
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
          <h2 className="text-foreground text-lg font-bold leading-tight tracking-[-0.015em]">
            PropaTradeX
          </h2>
        </Link>
        <div className="hidden md:flex flex-1 justify-center gap-8">
          <NavLink
            className="text-muted-foreground text-sm font-medium leading-normal hover:text-primary "
            to="explore"
          >
            Explore
          </NavLink>

          {registeredUserData && registeredUserData.length > 0 && (
            <>
              <NavLink
                className="text-muted-foreground text-sm font-medium leading-normal hover:text-primary "
                to="dashboard"
              >
                Dashboard
              </NavLink>
              <NavLink
                className="text-muted-foreground text-sm font-medium leading-normal hover:text-primary "
                to="upload"
              >
                Upload
              </NavLink>
            </>
          )}

          {currentAccount?.address ===
            "0xfff6cfb02d8b81e1ab2195ce4c7361274575c386bdfb638269a416db1b6aefb9" && (
            <NavLink
              className="text-muted-foreground text-sm font-medium leading-normal hover:text-primary "
              to="admin"
            >
              Admin
            </NavLink>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ConnectButton className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-primary-foreground text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors" />

          <NavLink
            to={"profile"}
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          >
            <Jazzicon diameter={40} seed={currentAccount?.address}/>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
