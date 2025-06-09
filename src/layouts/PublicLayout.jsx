import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumbs";
import styles from "./styles.module.css";

const PublicLayout = ({ children }) => (
  <div className={styles.pageContainer}>
    <Navbar />
    <Breadcrumbs />
    <main className={styles.contentWrapper}>{children}</main>
    <Footer />
  </div>
);

export default PublicLayout;
