// File: src/routes.js
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from "./Pages/Product/[id]";
import CartPage from "./Pages/Cart/Cart";
import CheckoutPage from "./Pages/Checkout/Checkout";
import LoginPage from "./Pages/Login/Login";
import AccountPage from "./Pages/AccountPage/AccountPage";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import RegisterPage from "./Pages/Register/RegisterPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage/ForgotPasswordPage";
import SearchPage from "./Pages/SearchPage/SearchPage";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import AboutPage from "./Pages/About/About";
import StoryPage from "./Pages/About/Story";
import TeamPage from "./Pages/About/Team";
import WhatWeDoPage from "./Pages/About/WhatWeDo";
import Blog from "./Pages/Blog/Blog";
import BlogPost from "./Pages/Blog/BlogPost";
import Categories from "./Pages/Categories/Categories";
import Orders from "./Pages/Orders/Orders";

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
    path: "/orders",
    element: <Orders />,
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
  {
    path: "/about",
    element: <AboutPage />,
    layout: "public",
  },
  {
    path: "/about/story",
    element: <StoryPage />,
    layout: "public",
  },
  {
    path: "/about/team",
    element: <TeamPage />,
    layout: "public",
  },
  {
    path: "/about/what-we-do",
    element: <WhatWeDoPage />,
    layout: "public",
  },
  {
    path: "/category",
    element: <Categories />,
    layout: "public",
  },
  {
    path: "/blog",
    element: <Blog />,
    layout: "public",
  },
  {
    path: "/blog/:postId",
    element: <BlogPost />,
    layout: "public",
  },
];
