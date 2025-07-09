import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./MobileMenu.module.css";

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
          {categoriesData.map((category, index) => (
            <div key={category.title} className={styles.categoryContainer}>
              <button
                className={styles.categoryButton}
                onClick={() => handleCategoryClick(index)}
              >
                <span>{category.title}</span>
                <span
                  className={`${styles.arrow} ${
                    expandedCategory === index ? styles.expanded : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {expandedCategory === index && (
                <div className={styles.subcategoriesList}>
                  {category.sub.map((subcategory) => (
                    <button
                      key={subcategory}
                      className={styles.subcategoryButton}
                      onClick={() => handleSubcategoryClick(subcategory)}
                    >
                      {subcategory}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <nav className={styles.navLinks}>
          <NavLink to="/deals" onClick={onClose}>
            {t("todays_deals")}
          </NavLink>
          <NavLink to="/mobiles" onClick={onClose}>
            {t("mobile_phones")}
          </NavLink>
          <NavLink to="/electronics" onClick={onClose}>
            {t("electronics")}
          </NavLink>
          <NavLink to="/home" onClick={onClose}>
            {t("home")}
          </NavLink>
          <NavLink to="/supermarket" onClick={onClose}>
            {t("supermarket")}
          </NavLink>
          <NavLink to="/toys" onClick={onClose}>
            {t("toys_games")}
          </NavLink>
          <NavLink to="/perfumes" onClick={onClose}>
            {t("perfumes")}
          </NavLink>
          <NavLink to="/orders" onClick={onClose}>
            {t("orders")}
          </NavLink>
        </nav>

        <div className={styles.languageSection}>
          <label>{t("Language")}:</label>
          <select value={lang} onChange={handleLanguageChange}>
            <option value="EN">English</option>
            <option value="AR">العربية</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
