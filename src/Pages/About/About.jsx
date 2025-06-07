import React from "react";
import { Link } from "react-router-dom";
import styles from "./About.module.css";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.hero}>
        <h1>About Us</h1>
        <p>Your Trusted E-Commerce Partner</p>
      </div>

      <div className={styles.content}>
        <div className={styles.intro}>
          <h2>Welcome to Our World of E-Commerce Excellence</h2>
          <p>
            We're more than just an online marketplace – we're your partner in
            discovering quality products, amazing deals, and a shopping
            experience that puts you first. With millions of products and
            thousands of sellers, we're committed to transforming how you shop
            online.
          </p>
        </div>

        <div className={styles.cards}>
          <Link to="/about/story" className={styles.card}>
            <div className={styles.cardContent}>
              <h3>Our Story</h3>
              <p>
                Discover how we grew from a simple idea to a leading e-commerce
                platform.
              </p>
              <span className={styles.learnMore}>Learn More →</span>
            </div>
          </Link>

          <Link to="/about/team" className={styles.card}>
            <div className={styles.cardContent}>
              <h3>Our Team</h3>
              <p>Meet the passionate people behind our success story.</p>
              <span className={styles.learnMore}>Learn More →</span>
            </div>
          </Link>

          <Link to="/about/what-we-do" className={styles.card}>
            <div className={styles.cardContent}>
              <h3>What We Do</h3>
              <p>
                Explore our services and how we're revolutionizing online
                shopping.
              </p>
              <span className={styles.learnMore}>Learn More →</span>
            </div>
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <h3>10M+</h3>
            <p>Happy Customers</p>
          </div>
          <div className={styles.stat}>
            <h3>50K+</h3>
            <p>Products</p>
          </div>
          <div className={styles.stat}>
            <h3>1000+</h3>
            <p>Sellers</p>
          </div>
          <div className={styles.stat}>
            <h3>24/7</h3>
            <p>Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
