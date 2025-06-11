import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import routes from "./config/routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <RouterProvider router={routes} />
  </StrictMode>
);