import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SortDropdown from "../../Components/CategoriesComp/SortDropdown/SortDropdown";
import FilterSidebar from "../../Components/CategoriesComp/FilterSidebar/FilterSidebar";
import ProductCard from "../../Components/CategoriesComp/ProductCard/ProductCard";
import Pagination from "../../Components/CategoriesComp/Pagination/Pagination";
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const { categoryname } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${categoryname}`
        );
        const data = await res.json();
        setAllProducts(data.products || []);
        setFilteredProducts(data.products || []);
      } catch (error) {
        console.error("Failed to load category data:", error);
      }
    };

    fetchCategoryData();
    setCurrentPage(1); // Reset to page 1 on category change
  }, [categoryname]);

  useEffect(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "highToLow":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "lowToHigh":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted = [...allProducts]; // Featured
    }
    setFilteredProducts(sorted);
  }, [sortOption, allProducts]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      <div className={styles.topBar}>
        <div>{`${indexOfFirst + 1}-${Math.min(
          indexOfLast,
          filteredProducts.length
        )} of ${filteredProducts.length} results`}</div>
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </div>

      <div className={styles.mainLayout}>
        <div className={styles.leftColumn}>
          <FilterSidebar
            allProducts={allProducts}
            onFilter={setFilteredProducts}
          />
        </div>
        <div className={styles.rightColumn}>
          {currentItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CategoryPage;
