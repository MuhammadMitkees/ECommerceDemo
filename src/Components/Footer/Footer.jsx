import React from "react";
import styles from "./Footer.module.css";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSections}>
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
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
          </div>

          <div className={styles.footerSection}>
            <h3>About Us</h3>
            <ul className={styles.links}>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/about/story">Our Story</NavLink>
              </li>
              <li>
                <NavLink to="/about/team">Our Team</NavLink>
              </li>
              <li>
                <NavLink to="/about/what-we-do">What We Do</NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Contact</h3>
            <ul className={styles.links}>
              <li>
                <a href="mailto:support@store.com">Email Us</a>
              </li>
              <li>
                <a href="tel:+1234567890">Call Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <div className={styles.logo}>
            <NavLink to="/">🛒 Store</NavLink>
          </div>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
