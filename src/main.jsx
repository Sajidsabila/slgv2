import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./config/routes";
import { StudentsProvider } from "./context/studentsContext";
import { AuthProvider } from "./hooks/useAuth";
import { SyllabusProvider } from "./hooks/useGetSyllabus";
import { ExamSpecimentContext, ExamSpecimentProvider } from "./hooks/useGetExamSpeciment";
import { SlgProvider } from "./hooks/useGetSlg";
import { LhbProvider } from "./hooks/useGetLhb";
import { StudentProfilProvider } from "./hooks/useProfileStudent";
import ProfilGuardian from "./pages/Guardian/profilGuardian";
import { GuardianProfilProvider } from "./hooks/useProfilGuardian";
import { CourseScheduleProvider } from "./hooks/useCourseSchedule";
import { FeesProvider } from "./hooks/useFees";
import { StudentAttandanceProvider } from "./hooks/useGetStudentAttandance";
import { AuthProviderAdmin } from "./hooks/useAuthAdmin";



createRoot(document.getElementById("root")).render(
  // <StrictMode>
      <AuthProvider>
      <AuthProviderAdmin>
        <SyllabusProvider>
            <RouterProvider router={routes} />
        </SyllabusProvider>
        </AuthProviderAdmin>
      </AuthProvider>
);