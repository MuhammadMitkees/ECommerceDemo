import React from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedProducts.module.css";

const RelatedProducts = ({ relatedProducts, renderRatingStars }) => {
  if (!relatedProducts?.length) return null;

  return (
    <div className={styles.relatedProducts}>
      <h2>Products related to this item</h2>
      <div className={styles.relatedProductsGrid}>
        {relatedProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={styles.relatedProductCard}
          >
            <div className={styles.relatedProductImage}>
              <img src={product.thumbnail} alt={product.title} />
            </div>
            <div className={styles.relatedProductInfo}>
              <h3>{product.title}</h3>
              <div className={styles.relatedProductRating}>
                {renderRatingStars(product.rating)}
                <span>({product.reviews?.length || 0})</span>
              </div>
              <div className={styles.relatedProductPrice}>
                <span className={styles.currency}>SAR</span>
                <span className={styles.amount}>
                  {(
                    product.price *
                    (1 - product.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
