export const categoriesData = [
  {
    title: "Electronics",
    sub: ["smartphones", "laptops", "tablets", "mobile-accessories"],
  },
  {
    title: "Fashion",
    sub: [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "womens-dresses",
      "womens-shoes",
      "womens-watches",
      "womens-bags",
      "womens-jewellery",
      "tops",
      "sunglasses",
    ],
  },
  {
    title: "Beauty & Health",
    sub: ["beauty", "fragrances", "skin-care"],
  },
  {
    title: "Home & Living",
    sub: ["furniture", "home-decoration", "kitchen-accessories"],
  },
  {
    title: "Groceries",
    sub: ["groceries"],
  },
  {
    title: "Miscellaneous",
    sub: ["motorcycle", "vehicle", "sports-accessories"],
  },
];

// Helper function to get all category slugs from the data
export const getAllCategorySlugs = () => {
  return categoriesData.flatMap((categoryGroup) => categoryGroup.sub);
};

// Helper function to find category group by slug
export const findCategoryGroupBySlug = (slug) => {
  return categoriesData.find((categoryGroup) =>
    categoryGroup.sub.includes(slug)
  );
};
