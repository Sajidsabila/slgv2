import { createBrowserRouter } from "react-router-dom";


import { MiddlewareStudent, Middleware } from "../middleware/middelware.jsx";
import { GuestStudent, Guest } from "../middleware/isGuest.jsx";

import Index from "../pages/index.jsx";
import PageProgramMateri from "../pages/pageProgramMateri.jsx";
import ClassCourseDetail from "../pages/class.jsx";
import AuthStudent from "../pages/Auth/student.jsx";
import Login from "../pages/Auth/index.jsx";
import Page404 from "../pages/404.jsx";

import Dashboard from "../pages/Admin/dashboard.jsx";
import Profile from "../pages/Admin/profile.jsx";
import ProgramMateri from "../pages/Admin/programMateri.jsx";
import DetailProgramMateri from "../pages/Admin/detailClassFormat.jsx";


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
