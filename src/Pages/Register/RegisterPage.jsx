import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
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
    if (!form.name) errs.name = "Name is required";
    if (!form.email) errs.email = "Email is required";
    if (form.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (form.confirmPassword !== form.password)
      errs.confirmPassword = "Passwords do not match";
    return errs;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      await sendEmailVerification(user); // ✅ Send verification email

      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: form.name,
          email: user.email,
          createdAt: new Date(),
        });
      } catch (err) {
        console.error("Firestore write error:", err);
        toast.error("Failed to save user data.");
        return;
      }
      dispatch(loginSuccess(user));
      toast.success("Welcome! Account created successfully.");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });

      dispatch(loginSuccess(user));
      toast.success("Signed in with Google!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Account ✨</h2>
        <p className={styles.subtitle}>Join us by creating your account</p>

        <form onSubmit={handleSignup} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}

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
            placeholder="Password (min 8 chars)"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword}</p>
          )}

          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={form.remember}
              onChange={handleChange}
              name="remember"
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
            Sign Up
          </button>
        </form>

        <div className={styles.divider}>or</div>

        <button onClick={handleGoogleSignup} className={styles.googleBtn}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google"
            className={styles.googleIcon}
          />
          Sign up with Google
        </button>

        <p className={styles.login}>
          Already have an account?{" "}
          <Link to="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
