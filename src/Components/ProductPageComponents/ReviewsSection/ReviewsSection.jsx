import React from "react";
import styles from "./ReviewsSection.module.css";

const ReviewsSection = ({ product, renderRatingStars }) => {
  const totalReviews = product.reviews?.length || 0;
  const averageRating = product.rating || 0;
  const ratingCounts = {
    5: Math.round(totalReviews * 0.37), // Example distribution
    4: Math.round(totalReviews * 0.28),
    3: Math.round(totalReviews * 0.2),
    2: Math.round(totalReviews * 0.1),
    1: Math.round(totalReviews * 0.05),
  };

  const renderRatingBar = (percentage, count, total) => (
    <div className={styles.ratingBar}>
      <div className={styles.ratingBarLabel}>{count} star</div>
      <div className={styles.ratingBarTrack}>
        <div
          className={styles.ratingBarFill}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className={styles.ratingBarCount}>{total}</div>
    </div>
  );

  return (
    <div className={styles.reviewsSection}>
      <div className={styles.reviewsHeader}>
        <h2>Customer Reviews</h2>
        <button className={styles.writeReviewBtn}>Write a review</button>
      </div>

      <div className={styles.reviewsOverview}>
        <div className={styles.overallRating}>
          <div className={styles.averageRating}>
            {averageRating.toFixed(1)} out of 5
          </div>
          <div className={styles.ratingStars}>
            {renderRatingStars(averageRating)}
          </div>
          <div className={styles.totalRatings}>
            {totalReviews} global ratings
          </div>
        </div>

        <div className={styles.ratingBreakdown}>
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className={styles.ratingBarContainer}>
              {renderRatingBar(
                (ratingCounts[stars] / totalReviews) * 100,
                stars,
                ratingCounts[stars]
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.reviewsList}>
        {product.reviews?.map((review, index) => (
          <div key={index} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewerAvatar}>
                {review.reviewerName?.[0] || "?"}
              </div>
              <div className={styles.reviewerInfo}>
                <div className={styles.reviewerName}>{review.reviewerName}</div>
                <div className={styles.reviewerEmail}>
                  {review.reviewerEmail}
                </div>
              </div>
            </div>
            <div className={styles.reviewRating}>
              {renderRatingStars(review.rating)}
              <span className={styles.reviewDate}>
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <p className={styles.reviewContent}>{review.comment}</p>
            <div className={styles.reviewActions}>
              <button className={styles.helpfulBtn}>Helpful</button>
              <button className={styles.reportBtn}>Report</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsSection;
