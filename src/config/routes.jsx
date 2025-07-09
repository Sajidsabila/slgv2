import { createBrowserRouter } from "react-router-dom";


import { MiddlewareStudent, MiddlewareTeacher,Middleware } from "../middleware/middelware.jsx";
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
import HistoryAbsensi from "../pages/historyAbsensi.jsx";
import EvaluasiSemester from "../pages/Admin/evaluasiSemester.jsx";
import DetailEvaluasiSemester from "../pages/Admin/detailEvaluasiSemester.jsx";
import AuthTeacher from "../pages/Auth/teacher.jsx";
import IndexTeacher from "../pages/Teacher/index.jsx";
import PageProgramMateriTeacher from "../pages/Teacher/pagePRogramMateriTeacher.jsx";
import ClassGradeTeacher from "../pages/Teacher/classGrade.jsx";
import BookMenu from "../pages/Admin/bookMenu.jsx";
import DetailBookMenu from "../pages/Admin/detailBookMenu.jsx";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <GuestStudent><AuthStudent /></GuestStudent>,
  },
  {
    path: "login-teacher",
    element: (
      <GuestStudent>
        <AuthTeacher />
      </GuestStudent>
    ),
  },
 {
  element: <MiddlewareStudent />,
  errorElement: <Page404 />,
  children: [
    {
      path: "/home",
      element: <Index />,
    },
    {
      path: "/program-materi/:id",
      element: <PageProgramMateri />,
    },
    {
      path: "/class-course/:abbr_course",
      element: <ClassCourseDetail />,
    },
    {
      path: "/history-absensi",
      element: <HistoryAbsensi />,
    },
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
    path: "/teacher",
    element: <MiddlewareTeacher />,
    children:[
      {path: "", element: <IndexTeacher />},
      {path: "class-course/:abbr_course", element: <ClassGradeTeacher />},
      {path: "program-materi/:id", element: <PageProgramMateriTeacher />},
    ]
  },
  {
    path: "/admin",
    element: <Middleware />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "program-materi", element: <ProgramMateri /> },
      { path: "program-materi/:id", element: <DetailProgramMateri /> },
      { path: "evaluasi-semester", element: <EvaluasiSemester /> },
      { path: "evaluasi-semester/:id", element: <DetailEvaluasiSemester /> },
      { path: "*", element: <Page404 /> },
      {path: "book-menu", element: <BookMenu />},
      {path: "detail-book-menu", element: <DetailBookMenu />}
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default routes;
