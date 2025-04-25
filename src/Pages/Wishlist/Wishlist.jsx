import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setWishlist } from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import styles from "./Wishlist.module.css";
import emptyCart from "../../assets/empty-cart.svg";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleMoveToCart = async (item) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    const wishlistRef = doc(db, "wishlists", user.uid);

    try {
      // 1. Add the item to the cart in Firestore
      await updateDoc(cartRef, {
        items: arrayUnion({ ...item, quantity: 1 }),
      });

      // 2. Remove the item from the wishlist in Firestore
      await updateDoc(wishlistRef, {
        items: arrayRemove(item),
      });

      toast.success(`${item.name} moved to cart!`);
    } catch (error) {
      console.error("Failed to move item to cart:", error);
      toast.error("Failed to move item to cart.");
    }
  };

  const removeItemFromFirestore = async (itemId) => {
    if (!user) return;
    const ref = doc(db, "wishlists", user.uid);
    try {
      const itemToRemove = wishlistItems.find((item) => item.id === itemId);
      await updateDoc(ref, {
        items: arrayRemove(itemToRemove),
      });
    } catch (error) {
      console.error("Failed to remove from wishlist in Firestore:", error);
    }
  };
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "wishlists", user.uid);
    const unsubscribe = onSnapshot(ref, (docSnap) => {
      const data = docSnap.data();
      if (data?.items) {
        dispatch(setWishlist(data.items));
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleRemove = async (itemId) => {
    await removeItemFromFirestore(itemId);
    toast.info("Item removed from wishlist.");
  };
  return (
    <div className={styles.wishlistPage}>
      <h2>💖 Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <img src={emptyCart} alt="Empty wishlist" />
          <p>Your wishlist is feeling empty 💔</p>
          <Link to="/" className={styles.browseLink}>
            Browse Products
          </Link>
        </div>
      ) : (
        <ul className={styles.wishlistList}>
          {wishlistItems.map((item) => (
            <li key={item.id} className={styles.wishlistItem}>
              <div className={styles.wishlistDetails}>
                <h4>{item.name}</h4>
                <p>Price: ${item.price}</p>
                <Link to={`/product/${item.id}`} className={styles.viewBtn}>
                  View Product
                </Link>
                <button
                  className={styles.moveBtn}
                  onClick={() => handleMoveToCart(item)}
                >
                  Move to Cart
                </button>
                <button
                  className={styles.removeBtn}
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
              <img
                src={item.imageUrl || "https://via.placeholder.com/140"}
                alt={item.name}
                className={styles.productImage}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistPage;
