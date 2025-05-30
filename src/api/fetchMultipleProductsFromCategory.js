// Fetch multiple products from a specific category (subcategory)
export async function fetchProductsFromCategory(categorySlug, limit = 1) {
  try {
    const response = await fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(
        categorySlug
      )}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch category: ${categorySlug}`);
    }
    const data = await response.json();
    return data.products?.slice(0, limit) || [];
  } catch (error) {
    console.error(`Error fetching category ${categorySlug}:`, error);
    return [];
  }
}
