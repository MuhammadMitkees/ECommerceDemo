// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { searchProductsAndCategories } from "../../api/search";
import styles from "./SearchPage.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchPage() {
  const [searchResults, setSearchResults] = useState({
    products: [],
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery().get("q");
  const navigate = useNavigate();

  useEffect(() => {
    if (query?.trim()) {
      setIsLoading(true);
      searchProductsAndCategories(query)
        .then((results) => {
          setSearchResults(results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Search error:", error);
          setSearchResults({ products: [], categories: [] });
          setIsLoading(false);
        });
    } else {
      setSearchResults({ products: [], categories: [] });
      setIsLoading(false);
    }
  }, [query]);

  const hasResults =
    searchResults.products.length > 0 || searchResults.categories.length > 0;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading search results...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Search Results for: "{query}"</h1>

      {!hasResults ? (
        <div className={styles.noResults}>
          <p>No results found for your search. Try different keywords.</p>
        </div>
      ) : (
        <>
          {searchResults.categories.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Categories</h2>
              <div className={styles.grid}>
                {searchResults.categories.map((category) => (
                  <div
                    key={category.slug}
                    className={styles.card}
                    onClick={() => navigate(`/category/${category.slug}`)}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={category.image}
                        alt={category.title}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardTitle}>{category.title}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {searchResults.products.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Products</h2>
              <div className={styles.grid}>
                {searchResults.products.map((product) => (
                  <div
                    key={product.id}
                    className={styles.card}
                    onClick={() => navigate(`/product/${product.slug}`)}
                  >
                    <div className={styles.imageContainer}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardTitle}>{product.title}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default SearchPage;
