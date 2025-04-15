import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import styles from "./Navbar.module.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const dispatch = useDispatch();

  const activeClass = ({ isActive }) => (isActive ? styles.active : "");

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
              <button onClick={() => dispatch(logout())}>Logout</button>
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
