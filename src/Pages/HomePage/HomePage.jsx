import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

// Dummy products (can be replaced with API fetch later)
const PRODUCTS = [
  { id: "1", name: "Laptop", price: 999 },
  { id: "2", name: "Headphones", price: 199 },
  { id: "3", name: "Smartphone", price: 799 },
];

function HomePage() {
  return (
    <div className={styles.homePage}>
      <h2>🛍️ Featured Products</h2>
      <div className={styles.productGrid}>
        {PRODUCTS.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className={styles.card}
          >
            <h3>{product.name}</h3>
            <p>${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
