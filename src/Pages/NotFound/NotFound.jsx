import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();
  const [floatingElements, setFloatingElements] = useState([]);

  // Generate random floating space elements
  useEffect(() => {
    const elements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 0.5 + 0.5,
    }));
    setFloatingElements(elements);
  }, []);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className={styles.container}>
      {/* Floating space elements */}
      <div className={styles.spaceElements}>
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className={styles.floatingElement}
            style={{
              top: `${element.top}%`,
              left: `${element.left}%`,
              animationDelay: `${element.delay}s`,
              transform: `scale(${element.size})`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Astronaut illustration */}
        <div className={styles.astronautContainer}>
          <div className={styles.astronaut}>
            <div className={styles.helmet}>
              <div className={styles.reflection}></div>
              <div className={styles.face}>
                <div className={styles.eyes}>
                  <div className={styles.eye}></div>
                  <div className={styles.eye}></div>
                </div>
                <div className={styles.mouth}></div>
              </div>
            </div>
            <div className={styles.body}></div>
            <div className={styles.arms}>
              <div className={styles.arm}></div>
              <div className={styles.arm}></div>
            </div>
            <div className={styles.legs}>
              <div className={styles.leg}></div>
              <div className={styles.leg}></div>
            </div>
          </div>

          {/* Floating space debris */}
          <div className={styles.debris}>
            <div className={styles.wrench}></div>
            <div className={styles.screw}></div>
            <div className={styles.cable}></div>
          </div>
        </div>

        {/* Error message */}
        <div className={styles.errorSection}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorTitle}>Oops! You're floating in space!</h2>
          <p className={styles.errorMessage}>
            Looks like this page got lost in the cosmic void. Our astronaut
            couldn't find it either!
          </p>

          {/* Action buttons */}
          <div className={styles.actions}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={handleGoHome}
            >
              🚀 Return to Earth (Home)
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={handleGoBack}
            >
              ⬅️ Go Back
            </button>
          </div>

          {/* Fun message */}
          <div className={styles.funMessage}>
            <p>💫 Fun fact: In space, no one can hear you 404</p>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className={styles.stars}></div>
      <div className={styles.earth}></div>
    </div>
  );
}

export default NotFound;
