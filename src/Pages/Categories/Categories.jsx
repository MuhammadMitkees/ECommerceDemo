import React from "react";
import { Link } from "react-router-dom";
import styles from "./Categories.module.css";
import {
  getCategoryImage,
  formatCategoryName,
  categoriesWithContainFit,
} from "../../utils/categoryImages";
import { categoriesData } from "../../utils/categoriesData";

const Categories = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainTitle}>All Categories</h1>

      <div className={styles.categoriesGrid}>
        {categoriesData.map((categoryGroup) => (
          <div key={categoryGroup.title} className={styles.categorySection}>
            <h2 className={styles.sectionTitle}>{categoryGroup.title}</h2>
            <div className={styles.subCategoriesGrid}>
              {categoryGroup.sub.map((subCategory) => (
                <Link
                  to={`/category/${subCategory}`}
                  key={subCategory}
                  className={styles.categoryCard}
                >
                  <div className={styles.imageContainer}>
                    <img
                      src={getCategoryImage(subCategory)}
                      alt={formatCategoryName(subCategory)}
                      className={
                        categoriesWithContainFit.includes(subCategory)
                          ? `${styles.categoryImage} ${styles.objectFitContain}`
                          : styles.categoryImage
                      }
                    />
                  </div>
                  <h3 className={styles.categoryName}>
                    {formatCategoryName(subCategory)}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
