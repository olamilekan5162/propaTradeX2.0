import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./routes/Home";
import Dashboard from "./routes/Dashboard";
import Listing from "./routes/Listing";
import Profile from "./routes/Profile";
import Upload from "./routes/Upload";
import Chat from "./routes/Chat";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "listing", element: <Listing /> },
      { path: "profile", element: <Profile /> },
      { path: "upload", element: <Upload /> },
      { path: "chats", element: <Chat /> },
    ],
  },
]);
