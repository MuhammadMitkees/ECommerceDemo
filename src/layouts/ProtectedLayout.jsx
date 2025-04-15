import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const ProtectedLayout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedLayout;
