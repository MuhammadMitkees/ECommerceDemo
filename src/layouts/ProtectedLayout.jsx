import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import styles from "./styles.module.css";

const ProtectedLayout = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.contentWrapper}>{children}</main>
      <Footer />
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedLayout;
