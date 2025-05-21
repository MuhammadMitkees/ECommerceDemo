import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logo}>
          <NavLink to="/">🛒 Store</NavLink>
        </div>
        <ul className={styles.links}>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/wishlist">Wishlist</NavLink>
          </li>
          <li>
            <NavLink to="/account">Account</NavLink>
          </li>
        </ul>
        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
