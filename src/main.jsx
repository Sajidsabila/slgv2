import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {  RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./config/routes";
import { AuthProvider } from "./hooks/useAuth";
import { AuthProviderAdmin } from "./hooks/useAuthAdmin";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
      <AuthProvider>
      <AuthProviderAdmin>
            <RouterProvider router={routes} />
        </AuthProviderAdmin>
      </AuthProvider>
);