import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SearchBar.module.css";
import { useTranslation } from "react-i18next";
import { searchProductsAndCategories } from "../../../api/search";

function SearchBar({ isToggled = false, onClose, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({
    products: [],
    categories: [],
  });
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
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
      setIsFocused(false);
      setSearchQuery(""); // Clear search query after search
      if (onSearch) onSearch(); // Close toggle if this is a toggled search
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Add a small delay to allow clicks on suggestions to register
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  return (
    <form
      className={`${styles.searchBar} ${
        isToggled ? styles.toggledSearchBar : ""
      }`}
      onSubmit={handleSearch}
    >
      <select className={styles.categorySelect}>
        <option value="all">{t("all")}</option>
      </select>

      <div className={styles.searchInputContainer}>
        <input
          type="text"
          placeholder={t("search_placeholder")}
          value={searchQuery}
          onChange={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <button type="submit">🔍</button>

      {searchQuery && isFocused && (
        <div className={styles.suggestions}>
          {isLoadingSuggestions ? (
            <div className={styles.suggestionItem}>Loading suggestions...</div>
          ) : suggestions.products.length === 0 ? (
            <div className={styles.suggestionItem}>No suggestions found.</div>
          ) : (
            suggestions.products.map((prod) => (
              <div
                key={prod.id}
                className={styles.suggestionItem}
                onClick={() => {
                  navigate(`/product/${prod.slug}`);
                  setSearchQuery(""); // Clear search query when clicking suggestion
                  if (onSearch) onSearch(); // Close toggle if this is a toggled search
                }}
              >
                <img src={prod.image} alt={prod.title} />
                <span>{prod.title}</span>
              </div>
            ))
          )}
        </div>
      )}
    </form>
  );
}

export default SearchBar;
