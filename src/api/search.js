export async function searchProductsAndCategories(query) {
  const trimmedQuery = query.trim().toLowerCase();
  const results = {
    categories: [],
    products: [],
  };

  try {
    // 1. Match categories
    const catRes = await fetch("https://dummyjson.com/products/categories");
    const categoryList = await catRes.json();

    results.categories = categoryList
      .filter(
        (cat) =>
          typeof cat === "string" && cat.toLowerCase().includes(trimmedQuery)
      )
      .map((cat) => ({
        title: cat,
        image: `https://dummyjson.com/image/category/${cat}`, // placeholder logic
        slug: cat,
      }));

    // 2. Match products
    const prodRes = await fetch(
      `https://dummyjson.com/products/search?q=${trimmedQuery}`
    );
    const data = await prodRes.json();

    results.products = data.products.map((prod) => ({
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
