
import { useCurrentAccount } from "@iota/dapp-kit";
import { Navigate, useLocation } from "react-router-dom";
import UnconnectedState from "./States/UnconnectedState";

const ProtectedRoute = ({ children }) => {
  const currentAccount = useCurrentAccount()
  if (!currentAccount) {
    return <UnconnectedState/>;
  }
  return children;
};

export default ProtectedRoute;