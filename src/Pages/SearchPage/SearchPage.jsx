// src/pages/SearchPage.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./SearchPage.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const query = useQuery().get("q")?.toLowerCase();
  const allProducts = useSelector((state) => state.products?.all); // Adjust according to your state
  const allCategories = useSelector((state) => state.categories?.all); // Adjust accordingly
  const navigate = useNavigate();
  const filteredProducts = allProducts?.filter(
    (product) =>
      product.title.toLowerCase().includes(query) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(query))
  );

  const filteredCategories = allCategories?.filter((category) =>
    category.title.toLowerCase().includes(query)
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Results for: {query}</h2>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Categories</h3>
        <div className={styles.grid}>
          {filteredCategories?.map((cat) => (
            <div
              key={cat.id}
              className={styles.card}
              onClick={() => navigate(`/category/${cat.slug}`)}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className={styles.cardImage}
              />
              <div className={styles.cardTitle}>{cat.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Products</h3>
        <div className={styles.grid}>
          {filteredProducts?.map((prod) => (
            <div
              key={prod.id}
              className={styles.card}
              onClick={() => navigate(`/product/${prod.slug}`)}
            >
              <img
                src={prod.image}
                alt={prod.title}
                className={styles.cardImage}
              />
              <div className={styles.cardTitle}>{prod.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
