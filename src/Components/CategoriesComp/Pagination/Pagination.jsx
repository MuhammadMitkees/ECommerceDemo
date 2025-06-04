import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page}
          className={`${styles.pageButton} ${
            page + 1 === currentPage ? styles.active : ""
          }`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
