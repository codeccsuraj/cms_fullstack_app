import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.token);


  // If no token → Redirect to login page
  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoutes;
