import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    // You can replace this with your actual cart logic or Redux action
    console.log(`Added to cart: ${product.title}`);
  };

  return (
    <Link to={`/product/${product.id}`} className={styles.cardLink}>
      <div className={styles.card}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.brand}>{product.brand}</p>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.rating}>⭐ {product.rating}</p>

        <button className={styles.cartButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
