import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { Link } from "react-router-dom";
import styles from "./Wishlist.module.css";

function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className={styles.wishlistPage}>
      <h2>💖 Your Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>
          Your wishlist is empty. <Link to="/">Browse products</Link>
        </p>
      ) : (
        <ul className={styles.itemList}>
          {wishlistItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <Link to={`/product/${item.id}`}>View Product</Link>
              <button onClick={() => dispatch(removeFromWishlist(item.id))}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default WishlistPage;
