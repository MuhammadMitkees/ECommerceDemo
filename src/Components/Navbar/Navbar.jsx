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
import MobileMenu from "./MobileMenu/MobileMenu";

function Navbar() {
  const [city, setCity] = useState("Riyadh");
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cartItems = useSelector((state) => state.cart.items);
  const lang = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const OPEN_CAGE_API_KEY = "3c092179a7f14ff8bc98d71caafbf1d1";

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const isMobile = windowWidth <= 768;

  const closeMenu = () => setShowMenu(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
    dispatch(setCart([]));
    dispatch(setWishlist([]));
    setIsMobileMenuOpen(false);
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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topBar}>
          {isMobile ? (
            <>
              <NavLink to="/" className={styles.logoLink}>
                <img src={logo} className={styles.logo} alt="Logo" />
              </NavLink>

              <div className={styles.searchContainer}>
                <SearchBar />
              </div>

              <NavLink to="/cart" className={styles.cart}>
                🛒{" "}
                {totalItems > 0 && (
                  <span className={styles.cartCount}>{totalItems}</span>
                )}
              </NavLink>

              <button
                className={styles.hamburger}
                onClick={() => setIsMobileMenuOpen(true)}
              >
                ☰
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" className={styles.logoLink}>
                <img src={logo} className={styles.logo} alt="Logo" />
              </NavLink>

              <div className={styles.centerSection}>
                <div className={styles.location}>
                  <p>
                    {t("delivering_to")} <span>{city}</span>
                  </p>
                  <button onClick={detectCity}>{t("update_location")}</button>
                </div>

                <div className={styles.searchContainer}>
                  <SearchBar />
                </div>

                <div className={styles.language}>
                  <select value={lang} onChange={handleLanguageChange}>
                    <option value="EN">EN</option>
                    <option value="AR">AR</option>
                  </select>
                </div>
              </div>

              <div className={styles.rightSection}>
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
            </>
          )}
        </div>

        {!isMobile && (
          <nav className={styles.bottomBar}>
            <div
              onMouseEnter={() => setShowMenu(true)}
              onMouseLeave={() => setShowMenu(false)}
              style={{ position: "relative" }}
              className={styles.allMenutextDiv}
            >
              <NavLink to="#">☰ {t("All")}</NavLink>
              {showMenu && <AllCategoriesMenu onClose={closeMenu} />}
            </div>
            <NavLink to="/category/smartphones">{t("mobile_phones")}</NavLink>
            <NavLink to="/category/laptops">{t("laptops")}</NavLink>
            <NavLink to="/category/home-decoration">{t("home")}</NavLink>
            <NavLink to="/category/groceries">{t("supermarket")}</NavLink>
            <NavLink to="/category/tablets">{t("tablets")}</NavLink>
            <NavLink to="/category/fragrances">{t("perfumes")}</NavLink>
          </nav>
        )}
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        isAuthenticated={isAuthenticated}
        handleLogout={handleLogout}
        lang={lang}
        handleLanguageChange={handleLanguageChange}
        city={city}
        detectCity={detectCity}
      />
    </>
  );
}

export default Navbar;
