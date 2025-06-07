import React from "react";
import styles from "./Story.module.css";

const Story = () => {
  return (
    <div className={styles.storyContainer}>
      <div className={styles.hero}>
        <h1>Our Story</h1>
        <p>A Journey of Innovation and Growth</p>
      </div>

      <div className={styles.content}>
        <div className={styles.intro}>
          <p>
            From our humble beginnings to becoming a leading e-commerce
            platform, our journey has been driven by a single mission: to
            revolutionize how people shop online by providing the best possible
            shopping experience.
          </p>
        </div>

        <div className={styles.timeline}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>2018</h3>
              <h4>The Beginning</h4>
              <p>
                Started as a small online marketplace with a vision to transform
                e-commerce through technology and customer-centric approach.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>2019</h3>
              <h4>Rapid Growth</h4>
              <p>
                Expanded our product categories and partnered with hundreds of
                trusted sellers to provide more choices to our customers.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>2020</h3>
              <h4>Digital Innovation</h4>
              <p>
                Launched our mobile app and implemented AI-powered
                recommendations to enhance the shopping experience.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>2021</h3>
              <h4>Going Global</h4>
              <p>
                Expanded operations to multiple countries and introduced
                international shipping to serve customers worldwide.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>2022</h3>
              <h4>Sustainability Focus</h4>
              <p>
                Implemented eco-friendly packaging and launched our
                sustainability initiative to reduce environmental impact.
              </p>
            </div>
          </div>

          <div className={styles.timelineItem}>
            <div className={styles.timelineContent}>
              <h3>2023</h3>
              <h4>Innovation Continues</h4>
              <p>
                Introduced same-day delivery and AI-powered customer service to
                further enhance the shopping experience.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.vision}>
          <h2>Looking Forward</h2>
          <p>
            As we continue to grow, our commitment to innovation, customer
            satisfaction, and sustainable practices remains stronger than ever.
            We're excited about the future and the endless possibilities to
            serve our customers better.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Story;
