import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useSelector } from "react-redux";
import PRODUCTS from "../../Mockups/Products";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function Index() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const user = useSelector((state) => state.user.user);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const handleAddToCart = async () => {
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, {
      items: arrayUnion({ ...product, quantity: 1 }),
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = async () => {
    if (!user) {
      toast.error("Please log in to use the wishlist.");
      return;
    }
    const ref = doc(db, "wishlists", user.uid);
    try {
      if (isInWishlist) {
        await updateDoc(ref, { items: arrayRemove(product) });
        toast.info("Removed from wishlist.");
      } else {
        await updateDoc(ref, { items: arrayUnion(product) });
        toast.success("Added to wishlist!");
      }
    } catch (err) {
      console.error("Failed to update wishlist:", err);
      toast.error("Could not update wishlist.");
    }
  };
  useEffect(() => {
    if (!user || !product) return;
    const ref = doc(db, "wishlists", user.uid);
    const unsubscribe = onSnapshot(ref, (docSnap) => {
      const data = docSnap.data();
      const exists = data?.items?.some((item) => item.id === product.id);
      setIsInWishlist(!!exists);
    });
    return () => unsubscribe();
  }, [user, product]);
  if (!product) return <p>Product not found.</p>;

  return (
    <div className={styles.productPage}>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <h3>${product.price}</h3>

      <button className={styles.cartBtn} onClick={handleAddToCart}>
        Add to Cart
      </button>
      <button className={styles.wishlistBtn} onClick={handleToggleWishlist}>
        {isInWishlist ? (
          <>
            <FaHeart color="red" /> Remove from Wishlist
          </>
        ) : (
          <>
            <FaRegHeart /> Add to Wishlist
          </>
        )}
      </button>
    </div>
  );
}

export default Index;
