import React, { useEffect, useState } from "react";
import ProductSection from "../../Components/HomePageComp/ProductsExhibition/ProductSection";
import { fetchProducts } from "../../api/products";
import { convertUSDToOMR } from "../../utils/currency";
import HeroSection from "../../Components/HomePageComp/HeroSection/HeroSection";
import TestimonialsSection from "../../Components/HomePageComp/TestimonialsSection/TestimonialsSection";

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const featured = allProducts.slice(0, 16);
  const bestSellers = allProducts.slice(16);
  const twoDays = allProducts.slice(20, 28);
  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setAllProducts(products);
    };
    loadProducts();
  }, []);
  const filterProductsByPriceOMR = (products, min = 1, max = 2) => {
    return products.filter((product) => {
      const discountedPriceUSD = product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;

      const priceOMR = convertUSDToOMR(discountedPriceUSD);

      return priceOMR >= min && priceOMR <= max;
    });
  };
  return (
    <div>
      <HeroSection />
      <ProductSection title="Featured Products" products={featured} />
      <ProductSection title="Best Sellers" products={bestSellers} />
      <ProductSection
        title="Deals from 1 OMR | Free Delivery on First Order"
        products={filterProductsByPriceOMR(allProducts)}
      />
      <ProductSection title="2 days only! 40% discount" products={twoDays} />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;
