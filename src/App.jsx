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

function App() {
  const currentAccount = useCurrentAccount();
  const { propatradexPackageId, propatradexProfileRegistry } =
    useNetworkVariables("propatradexPackageId", "propatradexProfileRegistry");

  const { data: RegisteredUserData } = useIotaClientQuery(
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

  console.log("RegisteredUserData:", RegisteredUserData);

  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Outlet context={RegisteredUserData || []} />
      <Footer />
    </>
  );
}

export default App;
