// File: src/components/AuthLoader.jsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";
import styles from "./Authloader.module.css";
import logo from "../../assets/logo.png";
const AuthLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) dispatch(loginSuccess(user));
      setTimeout(() => setLoading(false), 2000); // Simulated delay
    });

    return () => unsubscribe();
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
