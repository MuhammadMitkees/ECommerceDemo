import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { setCart } from "../../redux/slices/cartSlice";
import { setWishlist } from "../../redux/slices/wishlistSlice";
import { setLanguage } from "../../redux/slices/languageSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import logo from "../../assets/logo.png";
import { useTranslation } from "react-i18next";
import styles from "./Navbar.module.css";
import AllCategoriesMenu from "./AllCategoriesMenu/AllCategoriesMenu";
import SearchBar from "./SearchBar/SearchBar";

function Navbar() {
  const [city, setCity] = useState("Riyadh");
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const OPEN_CAGE_API_KEY = "3c092179a7f14ff8bc98d71caafbf1d1";

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
    dispatch(setCart([]));
    dispatch(setWishlist([]));
  };

  const getCityFromCoords = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPEN_CAGE_API_KEY}`
      );
      const data = await res.json();
      const components = data.results[0]?.components;
      const cityName =
        components.city ||
        components.town ||
        components.village ||
        components.county;
      if (cityName) setCity(cityName);
    } catch (error) {
      console.error("Geolocation error:", error);
    }
  };

  const detectCity = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityFromCoords(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation permission denied or error:", error);
        }
      );
    } else {
      console.warn("Geolocation is not supported by this browser.");
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

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

  useEffect(() => {
    detectCity();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <NavLink to="/">
          <img src={logo} className={styles.logo} />
        </NavLink>
        <div className={styles.location}>
          <span
            className={
              lang !== "EN"
                ? `${styles.locationIcon} ${styles.arabicLocation}`
                : `${styles.locationIcon}`
            }
          >
            📍
          </span>
          <p>
            {t("delivering_to")} <span>{city}</span>
          </p>
          <button onClick={detectCity}>{t("update_location")}</button>
        </div>
        <SearchBar />
        <div className={styles.language}>
          <select value={lang} onChange={handleLanguageChange}>
            <option value="EN">EN</option>
            <option value="AR">AR</option>
          </select>
        </div>
        <div className={styles.account}>
          {isAuthenticated ? (
            <>
              <span>
                {t("Hello")}, {user.displayName || user.email}
              </span>
              <div>
                <NavLink to="/account">{t("account_lists")}</NavLink>
                <button onClick={handleLogout}>{t("Logout")}</button>
              </div>
            </>
          ) : (
            <NavLink className={styles.signinTxt} to="/login">
              {t("hello_sign_in")}
            </NavLink>
          )}
        </div>
        <NavLink to="/orders" className={styles.orders}>
          {t("orders")}
        </NavLink>
        <NavLink to="/cart" className={styles.cart}>
          🛒 {t("cart")}{" "}
          {totalItems > 0 && (
            <span className={styles.cartCount}>{totalItems}</span>
          )}
        </NavLink>
      </div>

      <nav className={styles.bottomBar}>
        <div
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
          style={{ position: "relative" }}
        >
          <NavLink to="#">☰ {t("All")}</NavLink>
          {showMenu && <AllCategoriesMenu />}
        </div>
        <NavLink to="/deals">{t("todays_deals")}</NavLink>
        <NavLink to="/mobiles">{t("mobile_phones")}</NavLink>
        <NavLink to="/electronics">{t("electronics")}</NavLink>
        <NavLink to="/home">{t("home")}</NavLink>
        <NavLink to="/supermarket">{t("supermarket")}</NavLink>
        <NavLink to="/toys">{t("toys_games")}</NavLink>
        <NavLink to="/perfumes">{t("perfumes")}</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
