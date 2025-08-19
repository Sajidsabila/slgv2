import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./config/routes";
import { StudentsProvider } from "./context/studentsContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StudentsProvider>
         <RouterProvider router={routes} />
    </StudentsProvider>
  </StrictMode>
);