import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./MobileMenu.module.css";
import { useCategoriesMenu } from "../../../hooks/useCategoriesMenu";

function MobileMenu({
  isOpen,
  onClose,
  user,
  handleLogout,
  lang,
  handleLanguageChange,
  isAuthenticated,
  city,
  detectCity,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const { categoriesData } = useCategoriesMenu(0);

  if (!isOpen) {
    return null;
  }

  const handleCategoryClick = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/category/${subcategory}`);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
        {expandedCategory === null ? (
          /* Main Menu View */
          <>
            <div className={styles.header}>
              <h3>Menu</h3>
              <button className={styles.closeButton} onClick={onClose}>
                &times;
              </button>
            </div>

            <div className={styles.userSection}>
              {isAuthenticated ? (
                <>
                  <div className={styles.userInfo}>
                    <span>
                      {t("Hello")}, {user?.displayName || user?.email}
                    </span>
                  </div>
                  <NavLink
                    to="/account"
                    onClick={onClose}
                    className={styles.userLink}
                  >
                    {t("account_lists")}
                  </NavLink>
                  <NavLink
                    to="/orders"
                    onClick={onClose}
                    className={styles.userLink}
                  >
                    {t("orders")}
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      onClose();
                    }}
                    className={styles.logoutBtn}
                  >
                    {t("Logout")}
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  onClick={onClose}
                  className={styles.signinLink}
                >
                  {t("hello_sign_in")}
                </NavLink>
              )}
            </div>

            <div className={styles.locationSection}>
              <div className={styles.locationInfo}>
                <div>
                  <p>{t("delivering_to")}</p>
                  <span className={styles.cityName}>{city}</span>
                </div>
              </div>
              <button onClick={detectCity} className={styles.updateLocation}>
                {t("update_location")}
              </button>
            </div>

            <div className={styles.categoriesSection}>
              <h4 className={styles.sectionTitle}>Categories</h4>
              {categoriesData && categoriesData.length > 0 ? (
                categoriesData.map((category, index) => (
                  <div
                    key={category.title}
                    className={styles.categoryContainer}
                  >
                    <button
                      className={styles.categoryButton}
                      onClick={() => handleCategoryClick(index)}
                    >
                      <span>{category.title}</span>
                      <span className={styles.arrow}>▶</span>
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ color: "white", padding: "20px" }}>
                  Loading categories...
                </div>
              )}
            </div>

            <div className={styles.languageSection}>
              <label>{t("Language")}:</label>
              <select value={lang} onChange={handleLanguageChange}>
                <option value="EN">English</option>
                <option value="AR">العربية</option>
              </select>
            </div>
          </>
        ) : (
          /* Subcategories Only View - Full Menu */
          <>
            <div className={styles.header}>
              <button
                className={styles.backButtonHeader}
                onClick={() => setExpandedCategory(null)}
              >
                ← Back
              </button>
              <h3>{categoriesData[expandedCategory]?.title}</h3>
              <button className={styles.closeButton} onClick={onClose}>
                &times;
              </button>
            </div>

            <div className={styles.subcategoriesFullMenu}>
              {categoriesData[expandedCategory]?.sub?.map(
                (subcategory, idx) => (
                  <div key={subcategory} className={styles.categoryContainer}>
                    <button
                      className={`${styles.categoryButton} ${styles.subcategoryItem}`}
                      onClick={() => handleSubcategoryClick(subcategory)}
                      style={{
                        animationDelay: `${idx * 0.05}s`,
                      }}
                    >
                      <span style={{ textTransform: "capitalize" }}>
                        {subcategory}
                      </span>
                      <span className={styles.arrow}>▶</span>
                    </button>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MobileMenu;
