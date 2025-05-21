import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import styles from "./styles.module.css";
const AdminLayout = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.email === "admin@example.com";

  return isAdmin ? (
    <div className={styles.pageContainer}>
      <Navbar />
      <main className={styles.contentWrapper}>{children}</main>
      <Footer />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AdminLayout;
