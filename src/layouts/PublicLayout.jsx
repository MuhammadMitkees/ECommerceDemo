import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import styles from "./styles.module.css";

const PublicLayout = ({ children }) => (
  <div className={styles.pageContainer}>
    <Navbar />
    <main className={styles.contentWrapper}>{children}</main>
    <Footer />
  </div>
);

export default PublicLayout;
