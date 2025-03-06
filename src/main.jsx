import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Index from "./pages/index.jsx";
import ClassFormat from "./pages/Admin/classFormat.jsx";
const Saxophone = lazy(() => import("./pages/saxophone.jsx"));
const Violin = lazy(() => import("./pages/violin.jsx"));
const Cfk1Piano = lazy(() => import("./pages/Piano/PrivateClass/cfk1piano.jsx"));
const Login = lazy(() => import("./pages/Auth/index.jsx"));
const Dashboard = lazy(() => import("./pages/Admin/dashboard.jsx"));
const AdminPiano = lazy(() => import("./pages/Admin/piano.jsx"));
const Middleware = lazy(() => import("./pages/middelware.jsx"));
const Guest = lazy(() => import("./pages/isGuest.jsx"));
const Profile = lazy(() => import("./pages/Admin/profile.jsx"));
const Page404 = lazy(() => import("./pages/404.jsx"));

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Index />,
    errorElement: <Page404 /> 
  },
  {
     path: "/saxophone",
     element: <Saxophone /> 
    },
  {
    path: "/violin",
     element: <Violin />
     },
  {
     path: "/cfk-1-piano",
     element: <Cfk1Piano />
     },
  { 
    path: "/login",
     element: <Guest><Login />
     </Guest>
 },
  { 
    path: "/admin", 
    element: <Middleware />, 
    children: [
      { path: "", element: <Dashboard /> },
      { path: "course", element: <AdminPiano /> },
      { path: "profile", element: <Profile /> }, 
      {path: "class-format", element: <ClassFormat />}
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
