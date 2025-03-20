import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Index from "./pages/index.jsx";
import { FilterProvider } from "./context/FilterContext";
import ClassFormat from "./pages/Admin/classFormat.jsx"

import PageProgramMateri from "./pages/pageProgramMateri.jsx";
import ClassCourseDetail  from "./pages/class.jsx";
const Login = lazy(() => import("./pages/Auth/index.jsx"));
const Dashboard = lazy(() => import("./pages/Admin/dashboard.jsx"));
const AdminPiano = lazy(() => import("./pages/Admin/piano.jsx"));
const Middleware = lazy(() => import("./middleware/middelware.jsx"));
const Guest = lazy(() => import("./middleware/isGuest.jsx"));
const Profile = lazy(() => import("./pages/Admin/profile.jsx"));
const Page404 = lazy(() => import("./pages/404.jsx"));
const ClassGrading = lazy(() => import("./pages/Admin/classGrasding.jsx"));
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
      { path: "course", element: <AdminPiano /> },
      { path: "profile", element: <Profile /> }, 
      {path: "class-format", element: <ClassFormat />},
      { path: "*", element: <Page404 /> },
      {path: "class-grading", element: <ClassGrading />},
      {path: "program-materi", element: <ProgramMateri />},
      {path: "program-materi/:id", element: <DetailProgramMateri />}
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FilterProvider> {/* Tambahkan FilterProvider di sini */}
      <RouterProvider router={router} />
    </FilterProvider>
  </StrictMode>
);