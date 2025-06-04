// File: src/routes.js
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from "./Pages/Product/[id]";
import CartPage from "./Pages/Cart/Cart";
import CheckoutPage from "./Pages/Checkout/Checkout";
import LoginPage from "./Pages/Login/Login";
import WishlistPage from "./Pages/Wishlist/Wishlist";
import AccountPage from "./Pages/AccountPage/AccountPage";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import RegisterPage from "./Pages/Register/RegisterPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
    layout: "public",
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
    layout: "public",
  },
  {
    path: "/cart",
    element: <CartPage />,
    layout: "public",
  },
  {
    path: "/wishlist",
    element: <WishlistPage />,
    layout: "public",
  },
  {
    path: "/login",
    element: <LoginPage />,
    layout: null, // no layout (raw page)
  },
  {
    path: "/checkout",
    element: <CheckoutPage />,
    layout: "protected",
  },
  {
    path: "/account",
    element: <AccountPage />,
    layout: "protected",
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    layout: "admin",
  },
  {
    path: "/register",
    element: <RegisterPage />,
    layout: "public",
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
    layout: null,
  },
  {
    path: "/search",
    element: <SearchPage />,
    layout: "public",
  },
  {
    path: "/category/:categoryname",
    element: <CategoryPage />,
    layout: "public",
  },
];
