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
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "explore", element: <Home /> },
      { path: "dashboard", element: (<ProtectedRoute><Dashboard /></ProtectedRoute>) },
      { path: "listing/:id", element: (<ProtectedRoute><Listing /></ProtectedRoute>) },
      { path: "profile", element: (<ProtectedRoute><Profile /></ProtectedRoute>) },
      { path: "upload", element: (<ProtectedRoute><UploadPage /></ProtectedRoute>)},
      { path: "chats", element: (<ProtectedRoute><Chat /></ProtectedRoute>)},
      { path: "admin", element: (<ProtectedRoute><Admin /></ProtectedRoute>)},
    ],
  },
]);
