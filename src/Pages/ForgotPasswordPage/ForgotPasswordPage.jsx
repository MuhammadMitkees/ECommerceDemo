import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import styles from "./ForgotPassword.module.css";
import Navbar from "../../Components/Navbar/Navbar";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <form onSubmit={handleReset} className={styles.form}>
          <h2>Reset Password 🔐</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">
            Send Reset Email
          </button>
        </form>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
