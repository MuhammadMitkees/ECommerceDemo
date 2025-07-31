// Category image mappings and helper functions
export const categoryImageMap = {
  // Electronics
  smartphones:
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80",
  laptops:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80",
  tablets:
    "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=500&q=80",
  "mobile-accessories":
    "https://www.shutterstock.com/image-photo/mobile-accessories-include-white-black-260nw-1780870865.jpg",

  // Fashion
  "mens-shirts":
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=500&q=80",
  "mens-shoes":
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
  "mens-watches":
    "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
  "womens-dresses":
    "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/1.webp",
  "womens-shoes":
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80",
  "womens-watches":
    "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=500&q=80",
  "womens-bags":
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
  "womens-jewellery":
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80",
  tops: "https://cdn.dummyjson.com/product-images/tops/tartan-dress/1.webp",
  sunglasses:
    "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80",

  // Beauty & Health
  beauty:
    "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80",
  fragrances:
    "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80",
  "skin-care":
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",

  // Home & Living
  furniture:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500&q=80",
  "home-decoration":
    "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=500&q=80",
  "kitchen-accessories":
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=500&q=80",

  // Groceries
  groceries:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&q=80",

  // Miscellaneous
  motorcycle:
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500&q=80",
  vehicle:
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80",
  "sports-accessories":
    "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80",
};

// Helper function to get category image URL
export const getCategoryImage = (category) => {
  return (
    categoryImageMap[category] ||
    "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?w=500&q=80"
  );
};

// Helper function to format category name for display
export const formatCategoryName = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Categories that need object-fit: contain instead of cover
export const categoriesWithContainFit = ["womens-dresses", "tops"];
