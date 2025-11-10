import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { urlLink } from "../config/config";


export const Guest = ({ children }) => {
  const user = sessionStorage.getItem("user");

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export const GuestOnly = ({ children }) => {
const user = sessionStorage.getItem("token");
  if (user) {
    return <Navigate to="/home" replace />;
  }
  return children;
};
