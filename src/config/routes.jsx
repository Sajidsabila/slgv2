import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { MiddlewareStudent } from "../middleware/middelware.jsx";
const Middleware = lazy(() => import("../middleware/middelware.jsx"));
const Guest = lazy(() => import("../middleware/isGuest.jsx"));

import Index from "../pages/index.jsx";
import PageProgramMateri from "../pages/pageProgramMateri.jsx";
import ClassCourseDetail from "../pages/class.jsx";
import AuthStudent from "../pages/Auth/student.jsx";
import { GuestStudent } from "../middleware/isGuest.jsx";
const Login = lazy(() => import("../pages/Auth/index.jsx"));
const Page404 = lazy(() => import("../pages/404.jsx"));

const Dashboard = lazy(() => import("../pages/Admin/dashboard.jsx"));
const Profile = lazy(() => import("../pages/Admin/profile.jsx"));
const ProgramMateri = lazy(() => import("../pages/Admin/programMateri.jsx"));
const DetailProgramMateri = lazy(() => import("../pages/Admin/detailClassFormat.jsx"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestStudent><AuthStudent /></GuestStudent>,
  },
  {
    path: "/home",
    element: <MiddlewareStudent />,
    children: [
        { path: "", element: <Index /> }
    ],
    errorElement: <Page404 />,
  },
  {
    path: "/program-materi/:id",
    element:<MiddlewareStudent />,
    children: [
        { path: "", element: <PageProgramMateri /> }
    ],
  },
  {
    path: "/class-course/:abbr_course",
    element: <MiddlewareStudent />,
    children: [
        { path: "", element: <ClassCourseDetail /> }
    ]
  },
  {
    path: "/login",
    element: (
      <Guest>
        <Login />
      </Guest>
    ),
  },
  {
    path: "/admin",
    element: <Middleware />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "program-materi", element: <ProgramMateri /> },
      { path: "program-materi/:id", element: <DetailProgramMateri /> },
      { path: "*", element: <Page404 /> },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default routes;
