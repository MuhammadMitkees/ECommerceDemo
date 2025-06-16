import React, { useState, useEffect } from "react";
import styles from "./DiscountPopup.module.css";

export const DiscountPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const checkPopupStatus = () => {
      const lastShown = localStorage.getItem("discountPopupLastShown");
      const today = new Date().toDateString();

      if (!lastShown || lastShown !== today) {
        setTimeout(() => {
          setIsOpen(true);
        }, 2000); // Show popup after 2 seconds
      }
    };

    checkPopupStatus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    localStorage.setItem("discountPopupLastShown", new Date().toDateString());
    setIsOpen(false);
    // You can add email submission logic here
    alert("Thank you! Your 15% discount code will be sent to your email.");
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("discountPopupLastShown", new Date().toDateString());
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={handleClose}>
          ×
        </button>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <i className="fas fa-tag"></i>
          </div>
          <h2>15% Off Your First Order</h2>
          <p>Sign up to see what's new, offers, and updates.</p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.subscribeButton}>
              Subscribe
            </button>
          </form>
          <p className={styles.terms}>
            By signing up, you agree to receive email marketing
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscountPopup;
