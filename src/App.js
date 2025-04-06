// File: src/App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import store from "./redux/store";
import HomePage from "./Pages/HomePage/HomePage";
import ProductPage from "./Pages/Product/[id]";
import CartPage from "./Pages/Cart/Cart";
import CheckoutPage from "./Pages/Checkout/Checkout";
import LoginPage from "./Pages/Login/Login";
import WishlistPage from "./Pages/Wishlist/Wishlist";
import AccountPage from "./Pages/AccountPage/AccountPage";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function AdminRoute({ children }) {
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.email === "admin@example.com"; // Example condition
  return isAdmin ? children : <Navigate to="/" />;
}

function App() {
  useEffect(() => {
    console.log("Stripe Key:", process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
    console.log("All ENV keys:", process.env);
  }, []);
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
          <ToastContainer position="top-right" autoClose={3000} />
        </Router>
      </Elements>
    </Provider>
  );
}

export default App;
