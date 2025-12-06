import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./config/routes";
import { StudentsProvider } from "./context/studentsContext";
import { AuthProvider } from "./hooks/useAuth";
import { SyllabusProvider } from "./hooks/useGetSyllabus";
import { ExamSpecimentContext, ExamSpecimentProvider } from "./hooks/useGetExamSpeciment";
import { StudentProfilProvider } from "./context/StudentProfilContext";


createRoot(document.getElementById("root")).render(
  <StrictMode>

      <AuthProvider>
      <SyllabusProvider>
        <ExamSpecimentProvider>
        <StudentProfilProvider>
            <RouterProvider router={routes} />
          </StudentProfilProvider>
        </ExamSpecimentProvider>
      </SyllabusProvider>
      </AuthProvider>
  </StrictMode>
);