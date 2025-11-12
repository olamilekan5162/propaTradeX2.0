import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Listing from "./routes/Listing";
import Profile from "./routes/Profile";
import Chat from "./routes/Chat";
import UploadPage from "./routes/UploadPage";
import LandingPage from "./routes/LandingPage";
import Admin from "./routes/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "home", element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "listing/:id", element: <Listing /> },
      { path: "profile", element: <Profile /> },
      { path: "upload", element: <UploadPage /> },
      { path: "chats", element: <Chat /> },
      { path: "admin", element: <Admin /> },
    ],
  },
]);
