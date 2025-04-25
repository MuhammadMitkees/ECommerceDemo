// File: src/pages/HomePage.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import PRODUCTS from "../../Mockups/Products";
import { useSelector } from "react-redux";
import { db } from "../../firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { setWishlist } from "../../redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";

function HomePage() {
  const user = useSelector((state) => state.user.user);
  const [wishlistLocal, setWishlistLocal] = useState([]);
  const [animatingIds, setAnimatingIds] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "wishlists", user.uid);
    const unsubscribe = onSnapshot(ref, (docSnap) => {
      const data = docSnap.data();
      const updated = data?.items || [];
      setWishlistLocal(updated);
      dispatch(setWishlist(updated));
    });
    return () => unsubscribe();
  }, [user]);

  const toggleWishlist = async (product, isInWishlist) => {
    if (!user) return alert("Please login to use wishlist.");
    const ref = doc(db, "wishlists", user.uid);
    try {
      setAnimatingIds((prev) => [...prev, product.id]);
      if (isInWishlist) {
        await updateDoc(ref, { items: arrayRemove(product) });
        toast.info(`${product.name} removed from wishlist.`);
      } else {
        await updateDoc(ref, { items: arrayUnion(product) });
        toast.success(`${product.name} added to wishlist! ❤️`);
      }
      setTimeout(() => {
        setAnimatingIds((prev) => prev.filter((id) => id !== product.id));
      }, 600);
    } catch (err) {
      console.error("Failed to update wishlist:", err);
      toast.error("Error updating wishlist.");
    }
  };

  return (
    <div className={styles.homePage}>
      <h2>
        🛍️ Featured Products{" "}
        <span className={styles.wishlistCount}>({wishlistLocal.length})</span>
      </h2>
      <div className={styles.productGrid}>
        {PRODUCTS.map((product) => {
          const isInWishlist = wishlistLocal.some(
            (item) => item.id === product.id
          );
          const isAnimating = animatingIds.includes(product.id);
          return (
            <div key={product.id} className={styles.card}>
              <Link
                to={`/product/${product.id}`}
                className={styles.linkOverlay}
              >
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </Link>
              <button
                onClick={() => toggleWishlist(product, isInWishlist)}
                className={`${styles.heartBtn} ${
                  isAnimating ? styles.animate : ""
                }`}
                title={
                  isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
              >
                {isInWishlist ? (
                  <FaHeart
                    style={{ color: "red" }}
                    className={`${styles.heartIcon} ${styles.animated}`}
                  />
                ) : (
                  <FaRegHeart className={styles.heartIcon} />
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
