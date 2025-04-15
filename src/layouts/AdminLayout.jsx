import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const AdminLayout = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.email === "admin@example.com";

  return isAdmin ? (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminLayout;
