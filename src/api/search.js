import { getCategoryImage, formatCategoryName } from "../utils/categoryImages";
import { getAllCategorySlugs } from "../utils/categoriesData";

export async function searchProductsAndCategories(query) {
  const trimmedQuery = query.trim().toLowerCase();
  const results = {
    categories: [],
    products: [],
  };

  try {
    // 1. Match categories from local data - only by category name/slug
    const allCategorySlugs = getAllCategorySlugs();

    results.categories = allCategorySlugs
      .filter(
        (categorySlug) =>
          categorySlug.toLowerCase().includes(trimmedQuery) ||
          formatCategoryName(categorySlug).toLowerCase().includes(trimmedQuery)
      )
      .map((categorySlug) => ({
        title: formatCategoryName(categorySlug),
        image: getCategoryImage(categorySlug),
        slug: categorySlug,
      }));

    // 2. Match products - only by product title, not category
    const prodRes = await fetch(
      `https://dummyjson.com/products/search?q=${trimmedQuery}`
    );
    const data = await prodRes.json();

    // Filter products to only include those where the title matches the search query
    results.products = data.products
      .filter((prod) => prod.title.toLowerCase().includes(trimmedQuery))
      .map((prod) => ({
        id: prod.id,
        title: prod.title,
        image: prod.thumbnail,
        slug: prod.id,
      }));
  } catch (error) {
    console.error("Search error:", error);
  }

  return results;
}
