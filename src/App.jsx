import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {
  useCurrentAccount,
  useIotaClient,
  useIotaClientQuery,
} from "@iota/dapp-kit";
import { useNetworkVariables } from "./config/networkConfig";
import { Toaster } from "react-hot-toast";
import { Transaction } from "@iota/iota-sdk/transactions";
import UnconnectedState from "./components/States/UnconnectedState";

function App() {
  const currentAccount = useCurrentAccount();
  const { propatradexPackageId, propatradexProfileRegistry } =
    useNetworkVariables("propatradexPackageId", "propatradexProfileRegistry");

  const { data: registeredUserData } = useIotaClientQuery(
    "queryEvents",
    {
      query: {
        MoveEventType: `${propatradexPackageId}::propatradex::UserRegistered`,
      },
    },
    {
      select: (data) =>
        data.data
          .flatMap((x) => x.parsedJson)
          .filter((y) => y.user_address === currentAccount.address),
    }
  );

 

 

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      {
        currentAccount ? <Outlet context={registeredUserData || []} /> : <UnconnectedState />
      }
      
      <Footer />
    </>
  )
}

export default App;
