import { createBrowserRouter } from "react-router-dom";


import {Middleware } from "../middleware/middelware.jsx";
import { Guest} from "../middleware/isGuest.jsx";

import Index from "../pages/Student/index.jsx";
import PageProgramMateri from "../pages/pageProgramMateri.jsx";
import ClassCourseDetail from "../pages/class.jsx";

import Login from "../pages/Auth/index.jsx";
import Page404 from "../pages/404.jsx";
import Dashboard from "../pages/Admin/dashboard.jsx";
import Profile from "../pages/Admin/profile.jsx";
import ProgramMateri from "../pages/Admin/programMateri.jsx";

import HistoryAbsensi from "../pages/Student/studentReport/historyAbsensi.jsx";
import EvaluasiSemester from "../pages/Admin/evaluasiSemester.jsx";
import DetailEvaluasiSemester from "../pages/Admin/detailEvaluasiSemester.jsx";

import BookMenu from "../pages/Admin/bookMenu.jsx";
import DetailBookMenu from "../pages/Admin/detailBookMenu.jsx";
import CalenderAcademic from "../pages/Admin/calenderAcademic.jsx";
import ModulTraining from "../pages/Admin/modulTraining.jsx";
import DetailModulTraining from "../pages/Admin/detailModulTraining.jsx";

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
import ProgramEdukasi from "../pages/Student/learningResources/programEdukasi.jsx";
import MateriPembelajaran from "../pages/Student/learningResources/materiPembelajaran.jsx";
import EvaluasiSemesterStudent from "../pages/Student/studentReport/evaluasiSemesterStudent.jsx";

import SetStudentPassword from "../pages/Auth/setStudentPassword.jsx";
import DetaiCalenderAcademic from "../pages/Admin/detailCalenderAcademic.jsx";
import UpdatePassword from "../pages/Auth/updatePassword.jsx";
import Syllabus from "../pages/Student/learningResources/learningMateri/syllabus.jsx";
import DetailSyllabus from "../pages/Student/learningResources/learningMateri/detailLearningMateri.jsx";
import ExamSpeciment from "../pages/Student/learningResources/learningMateri/examSpeciment.jsx";
import MainAuth from "../pages/Auth/mainAuth.jsx";
import IndexTeacher from "../pages/Teacher/index.jsx";
import SlgTeacher from "../pages/Teacher/LearningResources/slgTeacher.jsx";
import LhbTeacher from "../pages/Teacher/LearningResources/lhbTeacher.jsx";
import ExamSpecimentForTeacher from "../pages/Teacher/LearningResources/examSpecimentTeacher.jsx";
import SyllabusTeacher from "../pages/Teacher/LearningResources/syllabusTeacher.jsx";
import DetailLearningMateri from "../pages/Student/learningResources/learningMateri/detailLearningMateri.jsx";
import DetailLearningMateriTeacher from "../pages/Teacher/LearningResources/detailLearningMateriTeacher.jsx";



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
    path: "/",
    element: <Guest><MainAuth /></Guest>,
  },
 {
  path: "/set-password",
  element: <Guest><SetStudentPassword /></Guest>
 },
  { 
    path: "update-password",
    element: <UpdatePassword />
  },
 {
  path: "/student",
  element:<Middleware allowed={["Student", "Student Guardian"]}/>,
  children: [
    {
      path: "",
      element: <Index />,
    },
    {
    path: "parents-guide",
    element: <ParentsGuide />
  },
    {
      path: "program-materi/:id",
      element: <PageProgramMateri />,
    },
    {
      path: "class-course/:abbr_course",
      element: <ClassCourseDetail />,
    },
    {
      path: "students-report/history-absensi",
      element: <HistoryAbsensi />,
    },
    {
      path: "students-report/evaluasi-semester",
      element: <EvaluasiSemesterStudent />
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
      path: "learning-resources/kalender-academic",
      element: <KalenderAkademik />
    },
    {
      path: "learning-resources/program-edukasi",
      element: <ProgramEdukasi />
    },
    {
      path : "learning-resources/learning-materi",
      element: <MateriPembelajaran />
   },
   {
    path: "learning-resources/materi-pembelajaran/syllabus",
    element: <Syllabus />
   },
   {
    path: "learning-resources/materi-pembelajaran/exam-speciment",
    element: <ExamSpeciment />
   },
     {
    path: "learning-resources/materi-pembelajaran/exam-speciment/:id",
    element: <DetailLearningMateri/>
   },
   {
    path: "learning-resources/materi-pembelajaran/syllabus/:id",
    element: <DetailLearningMateri />
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
    element:<Middleware allowed={["Instructor"]}/>,
    children:[
      {path: "", element: <IndexTeacher />},
       {
      path: "learning-resources/kalender-academic",
      element: <KalenderAkademik />
    },
    {
      path: "learning-resources/program-edukasi",
      element: <ProgramEdukasi />
    },

    {
      path: "learning-resources/slg",
      element: <SlgTeacher />
    },
    { 
      path: "learning-resources/lhb",
      element: <LhbTeacher />
    },
    {
      path: "learning-resources/syllabus",
      element: <SyllabusTeacher/>
    },
    { 
      path: "learning-resources/exam-speciment",
      element: <ExamSpecimentForTeacher />
    },
    {
      path: "/teacher/learning-resources/syllabus/:id",
      element: <DetailLearningMateriTeacher/>
    },
     {
      path: "/teacher/learning-resources/exam-speciment/:id",
      element: <DetailLearningMateriTeacher/>
    },
     {
      path: "/teacher/learning-resources/slg/:id",
      element: <DetailLearningMateriTeacher/>
    },
      {
      path: "/teacher/learning-resources/lhb/:id",
      element: <DetailLearningMateriTeacher/>
    },
    ]
  },
  {
    path: "/admin",
    element: <Middleware allowed={["LMS User"]}/>,
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
      {path: "calender-academic/:id", element: <DetaiCalenderAcademic />},
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
  {
    path: "*", 
    element: <Page404 />
  }
]);

export default routes;
