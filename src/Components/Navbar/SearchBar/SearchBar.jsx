import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import { useTranslation } from "react-i18next";
import { searchProductsAndCategories } from "../../../api/search";
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
  });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setIsLoadingSuggestions(true);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    const newTimeout = setTimeout(() => {
      if (value.trim()) {
        searchProductsAndCategories(value).then((res) => {
          setSuggestions(res);
          setIsLoadingSuggestions(false);
        });
      } else {
        setSuggestions({ products: [], categories: [] });
        setIsLoadingSuggestions(false);
      }
    }, 300);
    setDebounceTimeout(newTimeout);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSuggestions({ products: [], categories: [] });
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <select className={styles.categorySelect}>
        <option value="all">{t("all")}</option>
      </select>

      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={searchQuery}
          onChange={handleInput}
        />
        {searchQuery && (
          <div className={styles.suggestions}>
            {isLoadingSuggestions ? (
              <div className={styles.suggestionItem}>
                Loading suggestions...
              </div>
            ) : suggestions.products.length === 0 &&
              suggestions.categories.length === 0 ? (
              <div className={styles.suggestionItem}>No suggestions found.</div>
            ) : (
              <>
                {suggestions.categories.map((cat) => (
                  <div
                    key={cat.slug}
                    className={styles.suggestionItem}
                    onClick={() => navigate(`/category/${cat.slug}`)}
                  >
                    <img src={cat.image} alt={cat.title} />
                    <span>{cat.title}</span>
                  </div>
                ))}
                {suggestions.products.map((prod) => (
                  <div
                    key={prod.id}
                    className={styles.suggestionItem}
                    onClick={() => navigate(`/product/${prod.slug}`)}
                  >
                    <img src={prod.image} alt={prod.title} />
                    <span>{prod.title}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      <button type="submit">🔍</button>
    </form>
  );
}

export default SearchBar;
