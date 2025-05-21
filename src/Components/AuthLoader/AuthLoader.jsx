// File: src/components/AuthLoader.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../redux/slices/userSlice";
import styles from "./Authloader.module.css";
import logo from "../../assets/logo.png";
import { decrypt } from "../../utils/encryption";
const AuthLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const tryAutoLogin = async () => {
      const storedToken = localStorage.getItem("auth_token");
      if (storedToken) {
        try {
          const { email, password } = JSON.parse(decrypt(storedToken));
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          dispatch(loginSuccess(userCredential.user));
        } catch (err) {
          console.warn("⚠️ Auto-login failed:", err.message);
          localStorage.removeItem("auth_token");
          dispatch(logout());
        }
      }
      setTimeout(() => setLoading(false), 1000);
    };

    tryAutoLogin();
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  if (loading) {
    return (
      <div
        style={{
          backgroundColor: theme === "dark" ? "#1f1f1f" : "#f5f7fa",
          color: theme === "dark" ? "#f5f5f5" : "#333",
        }}
        className={styles.loaderContainer}
      >
        <img src={logo} alt="Loading..." className={styles.animatedLogo} />
        <p className={styles.text}>Loading your experience...</p>

        <div className={styles.progressContainer}>
          <div className={styles.progressBar}></div>
        </div>

        <button
          onClick={toggleTheme}
          className={`${styles.themeToggle} ${
            theme === "light" && styles.lightTheme
          }`}
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    );
  }

  return children;
};

export default AuthLoader;
