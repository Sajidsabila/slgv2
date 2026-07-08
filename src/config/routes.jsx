import { createBrowserRouter } from "react-router-dom";

import { Middleware } from "../middleware/middelware.jsx";
import { Guest } from "../middleware/isGuest.jsx";

import Index from "../pages/Student/index.jsx";
import Login from "../pages/Auth/index.jsx";
import Page404 from "../pages/404.jsx";
import Dashboard from "../pages/Admin/dashboard.jsx";
import Profile from "../pages/Admin/profile.jsx";
import ProgramMateri from "../pages/Admin/programMateri.jsx";
import HistoryAbsensi from "../pages/Student/studentReport/historyAbsensi.jsx";
import EvaluasiSemester from "../pages/Admin/evaluasiSemester.jsx";
import DetailEvaluasiSemester from "../pages/Admin/detailEvaluasiSemester.jsx";
import DetailBookMenu from "../pages/Admin/detailBookMenu.jsx";
import CalenderAcademic from "../pages/Admin/calenderAcademic.jsx";
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
import KalenderAkademik from "../pages/Student/learningResources/kalederAkademik.jsx";
import ProgramEdukasi from "../pages/Student/learningResources/programEdukasi.jsx";
import MateriPembelajaran from "../pages/Student/learningResources/materiPembelajaran.jsx";
import EvaluasiSemesterStudent from "../pages/Student/studentReport/evaluasiSemesterStudent.jsx";
import SetStudentPassword from "../pages/Auth/setStudentPassword.jsx";
import UpdatePassword from "../pages/Auth/updatePassword.jsx";
import Syllabus from "../pages/Student/learningResources/learningMateri/syllabus.jsx";
import ExamSpeciment from "../pages/Student/learningResources/learningMateri/examSpeciment.jsx";
import MainAuth from "../pages/Auth/mainAuth.jsx";
import IndexTeacher from "../pages/Teacher/index.jsx";
import SlgTeacher from "../pages/Teacher/LearningResources/slgTeacher.jsx";
import LhbTeacher from "../pages/Teacher/LearningResources/lhbTeacher.jsx";
import ExamSpecimentForTeacher from "../pages/Teacher/LearningResources/examSpecimentTeacher.jsx";
import SyllabusTeacher from "../pages/Teacher/LearningResources/syllabusTeacher.jsx";
import DetailLearningMateri from "../pages/Student/learningResources/learningMateri/detailLearningMateri.jsx";
import DetailLearningMateriTeacher from "../pages/Teacher/LearningResources/detailLearningMateriTeacher.jsx";
import StaticInitialTrainingFile from "../pages/Teacher/ModulTraining/staticIntialTrainingFile.jsx";
import ModulTrainingForTeacher from "../pages/Admin/modulTrainingForTeacher.jsx";
import DetailModulTrainingForTeacher from "../pages/Admin/detailModulTrainingForTeacher.jsx";
import PageDynamicModulTraining from "../pages/Teacher/ModulTraining/pageDynamicModulTraining.jsx";
import { MiddlewareAdmin } from "../middleware/middlewareAdmin.jsx";
import ProfilGuardian from "../pages/Guardian/profilGuardian.jsx";
import UserProfile from "../pages/userProfile.jsx";
import CourseSchdedule from "../pages/courseSchedule.jsx";


const routes = createBrowserRouter([
  {
    path: "/page-7",
    element: <Page7 />,
  },
  {
    path: "/page-8",
    element: <Page8 />,
  },

  {
    path: "/",
    element: (
      <Guest>
        <MainAuth />
      </Guest>
    ),
  },
  {
    path: "/set-password",
    element: (
      <Guest>
        <SetStudentPassword />
      </Guest>
    ),
  },
  {
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    path: "/student",
    element: <Middleware allowed={["Student"]} />,
    children: [
      {
        path: "",
        element:
          <Index />
      },
      {
        path: "students-report/course-schedule",
        element: 
            <CourseSchdedule />,
      },
      {path: "profil-user", element: <UserProfile/>},
      {
        path: "parents-guide",
        element: <ParentsGuide />,
      },
      {
        path: "students-report/history-absensi",
        element:
            <HistoryAbsensi />,
      },
      {
        path: "students-report/evaluasi-semester",
        element: <EvaluasiSemesterStudent />,
      },
      {
        path: "students-report/fees",
        element: 
            <FeesList />,
      },
      {
        path: "students-report",
        element: <StudentReport />,
      },
      {
        path: "learning-resources",
        element: <LearningResources />,
      },
      {
        path: "learning-resources/kalender-academic",
        element: <KalenderAkademik />,
      },
      {
        path: "learning-resources/program-edukasi",
        element: <ProgramEdukasi />,
      },
      {
        path: "learning-resources/learning-materi",
        element: <MateriPembelajaran />,
      },
      {
        path: "learning-resources/materi-pembelajaran/syllabus",
        element: <Syllabus />,
      },
      {
        path: "learning-resources/materi-pembelajaran/exam-speciment",
        element:
              <ExamSpeciment />,
      },
      {
        path: "learning-resources/materi-pembelajaran/exam-speciment/:id",
        element: <DetailLearningMateri />,
      },
      {
        path: "learning-resources/materi-pembelajaran/syllabus/:id",
        element: <DetailLearningMateri />,
      },
    ],
  },

  {
    path: "/guardian",
    element: <Middleware allowed={["Student Guardian"]} />,
    children: [
      {
        path: "",
        element: 
            <ProfilGuardian />
      },
      {
        path: "profil-user",
        element: <UserProfile/>
      },
      {
        path: "fees-list",
        element: <FeesList />,
      },
      {
        path: "history-absensi",
        element: <HistoryAbsensi />,
      },
      {
        path: "evaluasi-semester",
        element: <EvaluasiSemesterStudent />,
      }
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
    element: <Middleware allowed={["Instructor"]} />,
    children: [
      { path: "", element: <IndexTeacher /> },
      {path: "profil-user", element: <UserProfile/>},
      {
        path: "learning-resources/kalender-academic",
        element: <KalenderAkademik />,
      },
      {
        path: "learning-resources/program-edukasi",
        element: <ProgramEdukasi />,
      },

      {
        path: "learning-resources/slg",
        element: 
          <SlgTeacher />,
      },
      {
        path: "learning-resources/lhb",
        element:
              <LhbTeacher />, 
      },
      {
        path: "learning-resources/syllabus",
        element: <SyllabusTeacher />,
      },
      {
        path: "learning-resources/exam-speciment",
        element: 
          <ExamSpecimentForTeacher />,
      },
      {
        path: "learning-resources/syllabus/:id",
        element: <DetailLearningMateriTeacher />,
      },
      {
        path: "learning-resources/exam-speciment/:id",
        element: <DetailLearningMateriTeacher />,
      },
      {
        path: "learning-resources/slg/:id",
        element: <DetailLearningMateriTeacher />,
      },
      {
        path: "learning-resources/lhb/:id",
        element: <DetailLearningMateriTeacher />,
      },

      {
        path: "initial-training/product-knowledge",
        element: (
          <StaticInitialTrainingFile
            title="Product Knowledge"
            filetitle="Program Knowledge Materi"
            file="/file_modul_training/product_knowladge.pdf"
          />
        ),
      },
      {
        path: "initial-training/company-profile",
        element: (
          <StaticInitialTrainingFile
            title="Company Profile"
            filetitle="Company Profile Materi"
            file="/file_modul_training/product_knowladge.pdf"
          />
        ),
      },
      {
        path: "initial-training/visi-misi",
        element: (
          <StaticInitialTrainingFile
            title="Visi Misi"
            filetitle="Visi Misi Materi"
            file="/file_modul_training/product_knowladge.pdf"
          />
        ),
      },
      {
        path: "initial-training/smi-value",
        element: (
          <StaticInitialTrainingFile
            title="SMI VALUE"
            filetitle="SMI Value Materi"
            file="/file_modul_training/product_knowladge.pdf"
          />
        ),
      },

      {
        path: "initial-training/:id",
        element: <PageDynamicModulTraining />,
      },
      {
        path: "musical-skill/:id",
        element: <PageDynamicModulTraining />,
      },
      {
        path: "technology-skill/:id",
        element: <PageDynamicModulTraining />,
      },
      {
        path: "head-education-modul/:id",
        element: <PageDynamicModulTraining />,
      },
      {
        path: "pedagogy-skill/:id",
        element: <PageDynamicModulTraining />,
      },
    ],
  },
  {
    path: "/admin",
    element: <MiddlewareAdmin allowed={["LMS User"]} />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "program-materi", element: <ProgramMateri /> },
      { path: "program-materi/:id", element: <DetailProgramMateri /> },
      { path: "evaluasi-semester", element: <EvaluasiSemester /> },
      { path: "evaluasi-semester/:id", element: <DetailEvaluasiSemester /> },
      { path: "*", element: <Page404 /> },
      {
        path: "book-menu",
        element: (
          <CalenderAcademic
            url="/admin/book-menu"
            title="Book Menu"
            filter="Book Menu"
          />
        ),
      },
      {
        path: "book-menu/:id",
        element: <DetailBookMenu url="/admin/book-menu" />,
      },
      {
        path: "calender-academic",
        element: (
          <CalenderAcademic
            url="/admin/calender-academic"
            title="Calendar Academic"
            filter="Calendar Academic"
          />
        ),
      },
      {
        path: "calender-academic/:id",
        element: <DetailBookMenu url="/admin/calender-academic" />,
      },
      {
        path: "modul-training",
        element: (
          <CalenderAcademic
            url="/admin/modul-training"
            title="Modul Training"
            filter="Modul Training"
          />
        ),
      },
      {
        path: "modul-training/:id",
        element: <DetailBookMenu url="/admin/modul-training" />,
      },
      { path: "program-materi-syllabus", element: <ProgramMateriSyllabus /> },
      {
        path: "program-materi-exam-speciment",
        element: <ProgramMateriExamSpeciment />,
      },
      { path: "program-materi-LHB", element: <ProgramMateriLhb /> },
      { path: "program-materi-SLG", element: <ProgramMateriSlg /> },
      {
        path: "modul-training-teacher/initial-training",
        element: (
          <ModulTrainingForTeacher
            valueSelect={[
              { value: "Syllabus Overview", label: "Syllabus Overview" },
              { value: "IMTE", label: "IMTE" },
              { value: "Classroom SOP", label: "Classroom SOP" },
            ]}
            filteredType={["Syllabus Overview", "IMTE", "Classroom SOP"]}
            url="initial-training"
          />
        ),
      },
      {
        path: "modul-training-teacher/musical_skill",
        element: (
          <ModulTrainingForTeacher
            valueSelect={[
              { value: "Playing", label: "Playing" },
              { value: "Imrovising", label: "Improvising" },
              { value: "Listening", label: "Listening" },
              { value: "Reading", label: "Reading" },
              { value: "Singing", label: "Singing" },
              { value: "Instrument Knowledge", label: "Instrument Knowledge" },
            ]}
            filteredType={[
              "Playing",
              "Improvising",
              "Listening",
              "Reading",
              "Singing",
              "Instrument Knowledge",
              "Classroom SOP",
            ]}
            url="musical-skill"
          />
        ),
      },

      {
        path: "modul-training-teacher/technology-skill",
        element: (
          <ModulTrainingForTeacher
            valueSelect={[
              { value: "Beginner", label: "Beginner" },
              { value: "Intermediate", label: "Intermediate" },
              { value: "Advanced", label: "Advanced" },
            ]}
            filteredType={["Beginner", "Intermediate", "Advanced"]}
            url="technology-skill"
          />
        ),
      },
      {
        path: "modul-training-teacher/pedagogy-skill",
        element: (
          <ModulTrainingForTeacher
            valueSelect={[{ value: "Pedagogy Skill", label: "Pedagogy Skill" }]}
            filteredType={["Pedagogy Skill"]}
            url="pedagogy-skill"
          />
        ),
      },

      {
        path: "modul-training-teacher/head-education-modul",
        element: (
          <ModulTrainingForTeacher
            valueSelect={[
              { value: "Head Education Modul", label: "Head Education Modul" },
            ]}
            filteredType={["Head Education Modul"]}
            url="head-education-modul"
          />
        ),
      },
      {
        path: "modul-training-teacher/initial-training/:id",
        element: (
          <DetailModulTrainingForTeacher
            back="/admin/modul-training-teacher/initial-training"
            title="Detail Modul Training Initial Training"
          />
        ),
      },

      {
        path: "modul-training-teacher/musical-skill/:id",
        element: (
          <DetailModulTrainingForTeacher
            back="/admin/modul-training-teacher/musical_skill"
            title="Detail Modul Training Musical Skill"
          />
        ),
      },
      {
        path: "modul-training-teacher/technology-skill/:id",
        element: (
          <DetailModulTrainingForTeacher
            back="/admin/modul-training-teacher/technology-skill"
            title="Detail Modul Training Technology Skill"
          />
        ),
      },
      {
        path: "modul-training-teacher/pedagogy-skill/:id",
        element: (
          <DetailModulTrainingForTeacher
            back="/admin/modul-training-teacher/pedagogy-skill"
            title="Detail Modul Training Pedagogy Skill"
          />
        ),
      },
      {
        path: "modul-training-teacher/head-education-modul/:id",
        element: (
          <DetailModulTrainingForTeacher
            back="/admin/modul-training-teacher/head-education-modul"
            title="Detail Modul Training Head Education Modul"
          />
        ),
      },

      {
        path: "program-materi-syllabus/:id",
        element: (
          <DetailProgramMateri
            filetype={["mp4", "pdf"]}
            type="Syllabus"
            title="Detail Program Materi Syllabus"
            back="/admin/program-materi-syllabus"
          />
        ),
      },
      {
        path: "program-materi-exam-speciment/:id",
        element: (
          <DetailProgramMateri
            filetype={["mp4", "pdf"]}
            type="Exam Speciment"
            title="Detail Program Materi Exam Speciment"
            back="/admin/program-materi-exam-speciment"
          />
        ),
      },
      {
        path: "program-materi-LHB/:id",
        element: (
          <DetailProgramMateri
            filetype={["mp4", "pdf"]}
            type="LHB"
            title="Detail Program Materi LHB"
            back="/admin/program-materi-LHB"
          />
        ),
      },
      {
        path: "program-materi-SLG/:id",
        element: (
          <DetailProgramMateri
            filetype={["mp4", "pdf"]}
            type="SLG"
            title="Detail Program Materi SLG"
            back="/admin/program-materi-SLG"
          />
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

export default routes;