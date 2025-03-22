import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Index from "./pages/index.jsx";

import PageProgramMateri from "./pages/pageProgramMateri.jsx";
import ClassCourseDetail  from "./pages/class.jsx";
const Login = lazy(() => import("./pages/Auth/index.jsx"));
const Dashboard = lazy(() => import("./pages/Admin/dashboard.jsx"));

const Middleware = lazy(() => import("./middleware/middelware.jsx"));
const Guest = lazy(() => import("./middleware/isGuest.jsx"));
const Profile = lazy(() => import("./pages/Admin/profile.jsx"));
const Page404 = lazy(() => import("./pages/404.jsx"));

const ProgramMateri = lazy(() => import("./pages/Admin/programMateri.jsx"));
const DetailProgramMateri= lazy(() => import("./pages/Admin/detailClassFormat.jsx"));

const router = createBrowserRouter([
  { 
    path: "/", 
    element: <Index />,
    errorElement: <Page404 /> 
  },
  {
    path: "*",
    element: <Page404 />
  },
{
  path: "/program-materi/:id",
  element: <PageProgramMateri />
},
  { 
    path: "/login",
     element: <Guest><Login />
     </Guest>
 },
 {
  path: "/class-course/:abbr_course",
  element: < ClassCourseDetail />
 },
  { 
    path: "/admin", 
    element: <Middleware />, 
    children: [
      { path: "", element: <Dashboard /> },
      { path: "profile", element: <Profile /> }, 
      { path: "*", element: <Page404 /> },
      {path: "program-materi", element: <ProgramMateri />},
      {path: "program-materi/:id", element: <DetailProgramMateri />}
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
      <RouterProvider router={router} />

  </StrictMode>
);