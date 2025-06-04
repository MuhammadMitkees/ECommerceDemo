import React, { useState, useEffect } from "react";
import styles from "./AllCategoriesMenu.module.css";
import { fetchProductsFromCategory } from "../../../api/fetchMultipleProductsFromCategory";
import { useNavigate } from "react-router-dom";

const categoriesData = [
  {
    title: "Electronics",
    sub: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  },
  {
    title: "Fashion",
    sub: [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "womens-dresses",
      "womens-shoes",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
      "tops",
      "sunglasses",
    ],
  },
  {
    title: "Beauty & Health",
    sub: ["beauty", "fragrances", "skin-care"],
  },
  {
    title: "Home & Living",
    sub: ["furniture", "home-decoration", "kitchen-accessories"],
  },
  {
    title: "Groceries",
    sub: ["groceries"],
  },
  {
    title: "Miscellaneous",
    sub: ["motorcycle", "vehicle", "sports-accessories"],
  },
];

function AllCategoriesMenu() {
  const [hoveredCatIndex, setHoveredCatIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const activeCategory = categoriesData[hoveredCatIndex];
  const activeSubcategories = activeCategory?.sub || [];

  useEffect(() => {
    let isCancelled = false;

    const fetchProducts = async () => {
      setLoading(true);
      setProducts([]);

      const totalSlots = 10;
      const numSubs = activeSubcategories.length;
      const base = Math.floor(totalSlots / numSubs);
      const remainder = totalSlots % numSubs;

      const fetches = [];

      for (let i = 0; i < numSubs; i++) {
        const sub = activeSubcategories[i];
        const count = base + (i < remainder ? 1 : 0);
        fetches.push(fetchProductsFromCategory(sub, count));
      }

      try {
        const results = await Promise.all(fetches);
        if (isCancelled) return;

        const allProducts = results.flat().slice(0, 10);
        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      isCancelled = true;
    };
  }, [hoveredCatIndex]);

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
