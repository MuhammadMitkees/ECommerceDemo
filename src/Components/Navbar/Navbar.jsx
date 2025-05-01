import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { doc, onSnapshot } from "firebase/firestore";
import styles from "./Navbar.module.css";
import { db } from "../../firebase";
import { setCart } from "../../redux/slices/cartSlice";
import { setWishlist } from "../../redux/slices/wishlistSlice";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  useEffect(() => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    const unsubscribe = onSnapshot(cartRef, (docSnap) => {
      const data = docSnap.data();
      const cartItems = data?.items || [];
      dispatch(setCart(cartItems));
    });
    return () => unsubscribe();
  }, [user]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();

  const activeClass = ({ isActive }) => (isActive ? styles.active : "");
  const handleLogout = () => {
    dispatch(logout()); // clears user state
    dispatch(setCart([])); // clears cart
    dispatch(setWishlist([])); // clears wishlist
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <NavLink to="/">🛒 Store</NavLink>
      </div>

      <div className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}>
        {isAuthenticated && (
          <>
            <li>
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={activeClass}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className={activeClass}
              >
                Cart{" "}
                {totalItems > 0 && (
                  <span className={styles.badge}>{totalItems}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className={activeClass}
              >
                Wishlist
                {wishlistItems.length > 0 && (
                  <span className={styles.badge}>{wishlistItems.length}</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account"
                onClick={() => setIsOpen(false)}
                className={activeClass}
              >
                Account
              </NavLink>
            </li>
          </>
        )}

        {isAuthenticated ? (
          <>
            <li className={styles.username}>
              Hi, {user.displayName || user.email}
            </li>
            <li>
              <button onClick={() => dispatch(handleLogout)}>Logout</button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className={activeClass}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
