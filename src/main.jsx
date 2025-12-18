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



createRoot(document.getElementById("root")).render(
  <StrictMode>

      <AuthProvider>
        <SyllabusProvider>
          <ExamSpecimentProvider>
            <SlgProvider> 
              <LhbProvider>
                 <StudentProfilProvider>
                  <RouterProvider router={routes} />
                 </StudentProfilProvider>
              </LhbProvider>
            </SlgProvider>
          </ExamSpecimentProvider>
        </SyllabusProvider>
      </AuthProvider>
  </StrictMode>
);