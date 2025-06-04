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
export async function fetchProductById(id) {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

export const fetchRelatedProducts = async (tags) => {
  try {
    // Get all products
    const response = await fetch("https://dummyjson.com/products?limit=100");
    const data = await response.json();

    // Filter products that share at least one tag
    const relatedProducts = data.products.filter((product) => {
      if (!product.tags) return false;
      return product.tags.some((tag) => tags.includes(tag));
    });

    return relatedProducts;
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
};
