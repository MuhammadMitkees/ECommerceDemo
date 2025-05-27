export async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products; // returns an array of product objects
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
