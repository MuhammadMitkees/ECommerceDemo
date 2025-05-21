import React, { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";
import { encrypt } from "../../utils/encryption";
import Navbar from "../../Components/Navbar/Navbar";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("userCredential", userCredential);

      dispatch(loginSuccess(userCredential?.user));
      localStorage.setItem(
        "auth_token",
        encrypt(JSON.stringify({ email, password }))
      );
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      dispatch(loginSuccess(result.user));
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.loginPage}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome Back 👋</h2>
          <p className={styles.subtitle}>Please sign in to your account</p>
          <form onSubmit={handleLogin} className={styles.form}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className={styles.input}
            />
            <p className={styles.linkText}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            <button type="submit" className={styles.primaryBtn}>
              Login with Email
            </button>
          </form>

          <div className={styles.divider}>or</div>

          <button onClick={handleGoogleLogin} className={styles.googleBtn}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
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
