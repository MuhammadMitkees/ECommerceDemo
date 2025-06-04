import React, { useState, useEffect } from "react";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = ({ allProducts, onFilter }) => {
  // Get unique values
  const uniqueBrands = [...new Set(allProducts.map((p) => p.brand))];
  const uniqueTags = [...new Set(allProducts.flatMap((p) => p.tags || []))];

  // State
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Filtering logic
  useEffect(() => {
    let result = [...allProducts];

    // Rating filter
    if (selectedRatings.length > 0) {
      result = result.filter((item) =>
        selectedRatings.some((rating) => item.rating >= rating)
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((item) => selectedBrands.includes(item.brand));
    }

    // Tags filter
    if (selectedTags.length > 0) {
      result = result.filter((item) =>
        item.tags?.some((tag) => selectedTags.includes(tag))
      );
    }

    // Price filter
    result = result.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    onFilter(result);
  }, [
    selectedRatings,
    selectedBrands,
    selectedTags,
    priceRange,
    allProducts,
    onFilter,
  ]);

  // Handlers
  const toggleCheckbox = (value, setState, currentValues) => {
    if (currentValues.includes(value)) {
      setState(currentValues.filter((v) => v !== value));
    } else {
      setState([...currentValues, value]);
    }
  };

  return (
    <div>
      {/* Rating Filter */}
      <div className={styles.filterGroup}>
        <label>Rating</label>
        {[4, 3, 2].map((rating) => (
          <div className={styles.checkAndLabel} key={rating}>
            <input
              type="checkbox"
              id={`rating-${rating}`}
              onChange={() =>
                toggleCheckbox(rating, setSelectedRatings, selectedRatings)
              }
              checked={selectedRatings.includes(rating)}
            />
            <label htmlFor={`rating-${rating}`}>{rating}★ & up</label>
          </div>
        ))}
      </div>

      {/* Brand Filter */}
      {selectedBrands.lenght > 0 && (
        <div className={styles.filterGroup}>
          <label>Brands</label>
          {uniqueBrands.map((brand) => (
            <div className={styles.checkAndLabel} key={brand}>
              <input
                type="checkbox"
                id={`brand-${brand}`}
                onChange={() =>
                  toggleCheckbox(brand, setSelectedBrands, selectedBrands)
                }
                checked={selectedBrands.includes(brand)}
              />
              <label htmlFor={`brand-${brand}`}>{brand}</label>
            </div>
          ))}
        </div>
      )}

      {/* Price Filter */}
      <div className={styles.filterGroup}>
        <label>Price Range</label>
        <input
          type="number"
          placeholder="Min"
          onChange={(e) =>
            setPriceRange([Number(e.target.value), priceRange[1]])
          }
        />
        <input
          type="number"
          placeholder="Max"
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>

      {/* Tags Filter */}
      <div className={styles.filterGroup}>
        <label>Tags</label>
        {uniqueTags.map((tag) => (
          <div className={styles.checkAndLabel} key={tag}>
            <input
              type="checkbox"
              id={`tag-${tag}`}
              onChange={() =>
                toggleCheckbox(tag, setSelectedTags, selectedTags)
              }
              checked={selectedTags.includes(tag)}
            />
            <label htmlFor={`tag-${tag}`}>{tag}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterSidebar;
