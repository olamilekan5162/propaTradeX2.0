import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Listing from "./routes/Listing";
import Profile from "./routes/Profile";
import Chat from "./routes/Chat";
import KycPage from "./routes/KycPage";
import UploadPage from "./routes/UploadPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "kyc", element: <KycPage /> },
      { path: "listing/:id", element: <Listing /> },
      { path: "profile", element: <Profile /> },
      { path: "upload", element: <UploadPage /> },
      { path: "chats", element: <Chat /> },
    ],
  },
]);
