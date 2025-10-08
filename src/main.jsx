import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./config/routes";
import { StudentsProvider } from "./context/studentsContext";
import { AuthProvider } from "./hooks/useAuth";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudentsProvider>
      <AuthProvider>
             <RouterProvider router={routes} />

      </AuthProvider>
    </StudentsProvider>
  </StrictMode>
);