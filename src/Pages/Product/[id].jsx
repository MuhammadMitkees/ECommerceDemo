import React from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { addToWishlist } from "../../redux/slices/wishlistSlice";
import styles from "./styles.module.css";
import { useDispatch } from "react-redux";

// Dummy data for demonstration (replace with API fetch later)
const PRODUCTS = [
  {
    id: "1",
    name: "Laptop",
    description: "High performance laptop",
    price: 999,
  },
  {
    id: "2",
    name: "Headphones",
    description: "Noise cancelling headphones",
    price: 199,
  },
];

function Index() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const handleAddToWishlist = () => {
    dispatch(addToWishlist(product));
  };

  if (!product) return <p>Product not found.</p>;

  return (
    <div className={styles.productPage}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>${product.price}</h3>

      <button className={styles.cartBtn} onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button className={styles.wishlistBtn} onClick={handleAddToWishlist}>
        Add to Wishlist
      </button>
    </div>
  );
}

export default Index;
