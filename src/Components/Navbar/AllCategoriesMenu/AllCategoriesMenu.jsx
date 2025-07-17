import React, { useState } from "react";
import styles from "./AllCategoriesMenu.module.css";
import { useNavigate } from "react-router-dom";
import { useCategoriesMenu } from "../../../hooks/useCategoriesMenu";

function AllCategoriesMenu() {
  const [hoveredCatIndex, setHoveredCatIndex] = useState(0);
  const navigate = useNavigate();

  const { categoriesData, activeSubcategories, products, loading } =
    useCategoriesMenu(hoveredCatIndex);

  return (
    <div className={styles.menu}>
      <div className={styles.column}>
        {categoriesData.map((cat, idx) => (
          <div
            key={cat.title}
            className={`${styles.category} ${
              hoveredCatIndex === idx ? styles.active : ""
            }`}
            onMouseEnter={() => setHoveredCatIndex(idx)}
          >
            {cat.title}
          </div>
        ))}
      </div>

      <div className={styles.column}>
        {activeSubcategories.map((sub) => (
          <div
            key={sub}
            className={styles.subcategory}
            onClick={() => navigate(`/category/${sub}`)}
          >
            {sub}
          </div>
        ))}
      </div>

      <div className={styles.products}>
        {loading ? (
          <>
            {Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className={`${styles.product} ${styles.skeletonProduct}`}
              >
                <div className={styles.skeletonCircle}></div>
                <div className={styles.skeletonText}></div>
              </div>
            ))}
          </>
        ) : (
          products.map((prod) => (
            <div key={prod.id} className={styles.product}>
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllCategoriesMenu;
