import { createBrowserRouter } from "react-router-dom";


import { MiddlewareStudent, MiddlewareTeacher,Middleware } from "../middleware/middelware.jsx";
import { Guest, GuestOnly } from "../middleware/isGuest.jsx";

import Index from "../pages/Student/index.jsx";
import PageProgramMateri from "../pages/pageProgramMateri.jsx";
import ClassCourseDetail from "../pages/class.jsx";
import AuthStudent from "../pages/Auth/student.jsx";
import Login from "../pages/Auth/index.jsx";
import Page404 from "../pages/404.jsx";
import Dashboard from "../pages/Admin/dashboard.jsx";
import Profile from "../pages/Admin/profile.jsx";
import ProgramMateri from "../pages/Admin/programMateri.jsx";

import HistoryAbsensi from "../pages/Student/studentReport/historyAbsensi.jsx";
import EvaluasiSemester from "../pages/Admin/evaluasiSemester.jsx";
import DetailEvaluasiSemester from "../pages/Admin/detailEvaluasiSemester.jsx";
import AuthTeacher from "../pages/Auth/teacher.jsx";
import IndexTeacher from "../pages/Teacher/index.jsx";
import PageProgramMateriTeacher from "../pages/Teacher/pageProgramMateriTeacher.jsx";
import ClassGradeTeacher from "../pages/Teacher/classGrade.jsx";
import BookMenu from "../pages/Admin/bookMenu.jsx";
import DetailBookMenu from "../pages/Admin/detailBookMenu.jsx";
import CalenderAcademic from "../pages/Admin/calenderAcademic.jsx";
import ModulTraining from "../pages/Admin/modulTraining.jsx";
import DetailModulTraining from "../pages/Admin/detailModulTraining.jsx";
import CourseTeacher from "../pages/Teacher/course.jsx";

import ModulTrainingTeacher from "../pages/Teacher/modulTraining.jsx";
import DetailModulTrainingTeacher from "../pages/Teacher/detailModulTraining.jsx";
import EvaluationSemesterTeacher from "../pages/Teacher/evaluationSemester.jsx";
import ProfileStudents from "../pages/profileStudent.jsx";
import FeesList from "../pages/Student/studentReport/feessList.jsx";
import ParentsGuide from "../pages/Student/parentsGuide/index.jsx";
import Page7 from "../pages/Student/parentsGuide/page/page7.jsx";
import Page8 from "../pages/Student/parentsGuide/page/page8.jsx";
import ProgramMateriSyllabus from "../pages/Admin/program-materi/syllabus.jsx";
import ProgramMateriExamSpeciment from "../pages/Admin/program-materi/examSpecimen.jsx";
import ProgramMateriLhb from "../pages/Admin/program-materi/lhb.jsx";
import ProgramMateriSlg from "../pages/Admin/program-materi/slg.jsx";
import DetailProgramMateri from "../pages/Admin/program-materi/detailProgramMateri.jsx";
import StudentReport from "../pages/Student/studentReport.jsx";
import LearningResources from "../pages/Student/learningResources.jsx";
import ProfileStudentsFrontend from "../pages/Student/profileStudent.jsx";
import KalenderAkademik from "../pages/Student/learningResources/kalederAkademik.jsx";



const routes = createBrowserRouter([
{
  path: "/page-7",
  element: <Page7 />
},
{
  path: "/page-8",
  element: <Page8 />
},
   {
    path: "/parents-guide",
    element: <ParentsGuide />
  },
  {
    path: "/",
    element: <GuestOnly><AuthStudent /></GuestOnly>,
  },

  {
    path: "login-teacher",
    element: (
      <GuestOnly>
        <AuthTeacher />
      </GuestOnly>
    ),
  },
 {
  element: <MiddlewareStudent />,

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
      path: "students-report/history-absensi",
      element: <HistoryAbsensi />,
    },
    {
      path: "students-report/fees",
      element: <FeesList />
    },

    {
      path: "evaluasi-semester",
      element: <EvaluasiSemester />
    },
    {
      path: "students-report",
      element: <StudentReport />
    },
    {
      path: "learning-resources",
      element: <LearningResources />
    },
    {
      path: "kalender-academic",
      element: <KalenderAkademik />
    },
    {
      path: "profile",
      element: <ProfileStudentsFrontend />
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
      {path: "learning-materi", element: <CourseTeacher />},
      {path: "book-menu", element: <ModulTrainingTeacher url="book-menu" title="Book Menu" placeholder="Book Menu" />},
      {path: "calender-academic", element: <ModulTrainingTeacher url="calender-academic"  title="Calender Academic" placeholder="Calender Academic"/>},
      {path: "class-course/:abbr_course", element: <ClassGradeTeacher url="program-materi"/>},
      {path: "program-materi/:id", element: <PageProgramMateriTeacher filter="Program Materi" url="program-materi" />},
      {path: "modul-training", element: <ModulTrainingTeacher url="modul-training" title="Modul Training" placeholder="Modul Training"/>},
      {path: "modul-training/:id", element: <DetailModulTrainingTeacher title="Detail Modul Training"/>},
      {path: "calender-academic/:id", element: <DetailModulTrainingTeacher title="Detail Calender Academic"/>},
      {path: "book-menu/:id", element: <DetailModulTrainingTeacher title="Detail Book Menu"/>},
      {path: "evaluation-semester", element: <EvaluationSemesterTeacher />},
      {path: "evaluation-semester/class-course/:abbr_course", element: <ClassGradeTeacher url="evaluation-semester-materi" />},
      {path: "evaluation-semester-materi/:id", element: <PageProgramMateriTeacher filter="Evaluasi Semester" url="evaluation-semester-materi"/>},
      
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
      {path: "book-menu/:id", element: <DetailBookMenu />},
      {path: "calender-academic", element: <CalenderAcademic />},
      {path: "modul-training", element: <ModulTraining />},
      {path: "modul-training/:id", element: <DetailModulTraining />},
      {path: "program-materi-syllabus", element: <ProgramMateriSyllabus />},
      {path: "program-materi-exam-speciment", element: <ProgramMateriExamSpeciment/>},
      {path: "program-materi-LHB", element: <ProgramMateriLhb/>},
      {path: "program-materi-SLG", element: <ProgramMateriSlg />},
      {
        path: "program-materi-syllabus/:id",
        element: <DetailProgramMateri filetype={["mp4", "pdf"]} type="Syllabus" title="Detail Program Materi Syllabus" back="/admin/program-materi-syllabus"/> ,},
        {path: "program-materi-exam-speciment/:id", element: <DetailProgramMateri filetype={["mp4", "pdf"]} type="Exam Speciment" title="Detail Program Materi Exam Speciment" back="/admin/program-materi-exam-speciment"/>},
        {path: "program-materi-LHB/:id", element: <DetailProgramMateri filetype={["mp4", "pdf"]} type="LHB" title="Detail Program Materi LHB" back="/admin/program-materi-LHB"/>},
        {path: "program-materi-SLG/:id", element: <DetailProgramMateri filetype={["mp4", "pdf"]} type="SLG" title="Detail Program Materi SLG" back="/admin/program-materi-SLG"/>},
    ],
  },
]);

export default routes;
