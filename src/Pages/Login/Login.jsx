import React, { useState } from "react";
import { auth, googleProvider, db } from "../../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  browserLocalPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { encrypt } from "../../utils/encryption";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = "Email is required";
    if (!form.password) errs.password = "Password is required";
    return errs;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      dispatch(loginSuccess(userCredential?.user));
      if (form.remember) {
        localStorage.setItem(
          "auth_token",
          encrypt(
            JSON.stringify({ email: form.email, password: form.password })
          )
        );
      }
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Set persistence to survive browser close
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Ensure user document exists in Firestore with Google profile data
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // Create new document if doesn't exist
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL || "",
            createdAt: new Date(),
          });
        } else {
          // Update existing document with Google photo if not already set
          const userData = docSnap.data();
          if (!userData.photoURL && user.photoURL) {
            await updateDoc(userRef, {
              photoURL: user.photoURL,
            });
          }
        }
      } catch (firestoreErr) {
        console.error("Error updating Firestore:", firestoreErr);
        // Continue with login even if Firestore update fails
      }

      dispatch(loginSuccess(user));
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <div className={styles.loginPage}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome Back 👋</h2>
          <p className={styles.subtitle}>Please sign in to your account</p>

          <form onSubmit={handleLogin} className={styles.form}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={styles.input}
            />
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}

            <p className={styles.linkText}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
                className={styles.input}
              />
              Remember me
            </label>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                onChange={() => setShowPassword((prev) => !prev)}
                className={styles.input}
              />
              Show password
            </label>

            <button type="submit" className={styles.primaryBtn}>
              Sign In
            </button>
          </form>

          <div className={styles.divider}>or</div>

          <button onClick={handleGoogleLogin} className={styles.googleBtn}>
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google"
              className={styles.googleIcon}
            />
            Sign in with Google
          </button>

          <p className={styles.register}>
            Don't have an account?{" "}
            <Link to="/register" className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
