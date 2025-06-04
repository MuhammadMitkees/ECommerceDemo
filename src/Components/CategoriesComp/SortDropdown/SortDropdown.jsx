import React from "react";
import styles from "./SortDropdown.module.css";

const SortDropdown = ({ value, onChange }) => {
  return (
    <select
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="featured">Featured</option>
      <option value="highToLow">Price: High to Low</option>
      <option value="lowToHigh">Price: Low to High</option>
      <option value="rating">Average Rating</option>
    </select>
  );
};

export default SortDropdown;
