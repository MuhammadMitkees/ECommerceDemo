import { useState, useEffect, useMemo } from "react";
import { fetchProductsFromCategory } from "../api/fetchMultipleProductsFromCategory";

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

export const useCategoriesMenu = (activeCategoryIndex = 0) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const activeCategory = useMemo(
    () => categoriesData[activeCategoryIndex],
    [activeCategoryIndex]
  );

  const activeSubcategories = useMemo(
    () => activeCategory?.sub || [],
    [activeCategory]
  );

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

    if (activeSubcategories.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
      setProducts([]);
    }

    return () => {
      isCancelled = true;
    };
  }, [activeSubcategories]);

  return {
    categoriesData,
    activeCategory,
    activeSubcategories,
    products,
    loading,
  };
};
