import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = () => {
  const location = useLocation();
  const [customPath, setCustomPath] = useState(null);
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    const fetchProductData = async (productId) => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product data");
        }
        const data = await response.json();

        // Format category name for display (convert from kebab-case to Title Case)
        const formattedCategory = data.category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        setCustomPath([
          { name: "Home", path: "/" },
          { name: "Category", path: "/category" },
          { name: formattedCategory, path: `/category/${data.category}` },
          { name: data.title, path: null }, // Last item isn't clickable
        ]);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setCustomPath(null);
      }
    };

    // Check if this is a product page
    if (pathnames[0] === "product" && pathnames[1]) {
      fetchProductData(pathnames[1]);
    } else if (pathnames[0] === "category" && pathnames[1]) {
      // Handle category pages
      const formattedCategory = pathnames[1]
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      setCustomPath([
        { name: "Home", path: "/" },
        { name: "Category", path: "/category" },
        { name: formattedCategory, path: null },
      ]);
    } else {
      // For other pages, create a default path that always starts with Home
      const defaultPath = [{ name: "Home", path: "/" }];

      // Add remaining path segments
      pathnames.forEach((name, index) => {
        const formattedName = name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        defaultPath.push({
          name: formattedName,
          path:
            index === pathnames.length - 1
              ? null
              : `/${pathnames.slice(0, index + 1).join("/")}`,
        });
      });

      setCustomPath(defaultPath);
    }
  }, [location.pathname]);

  // Don't render breadcrumbs on home page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className={styles.breadcrumbs}>
      {customPath &&
        customPath.map((item, index) => (
          <React.Fragment key={item.name}>
            {index > 0 && <span className={styles.separator}>/</span>}
            {item.path ? (
              <Link to={item.path} className={styles.link}>
                {item.name}
              </Link>
            ) : (
              <span className={styles.current}>{item.name}</span>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default Breadcrumbs;
