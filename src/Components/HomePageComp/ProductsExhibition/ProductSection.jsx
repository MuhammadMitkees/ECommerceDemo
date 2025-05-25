import React from "react";
import styles from "./ProductSection.module.css";

const ProductSection = ({ title, products }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.productList}>
        {products.map((product, index) => (
          <div key={index} className={styles.productCard}>
            <div className={styles.imageWrapper}>
              {product.discount && (
                <span className={styles.discountTag}>-{product.discount}%</span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
            </div>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productPrice}>
              {product.discount ? (
                <>
                  <span className={styles.discountedPrice}>
                    {product.price}
                  </span>
                  <span className={styles.originalPrice}>
                    {product.originalPrice}
                  </span>
                </>
              ) : (
                product.price
              )}
            </p>
            <p className={styles.category}>{product.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
