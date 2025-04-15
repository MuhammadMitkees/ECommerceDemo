import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutPage.module.css";

function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "https://ecommercedemo-o7k4.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartItems }),
        }
      );
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <h2>Checkout</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price} × {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout} className={styles.checkoutBtn}>
        Pay with Stripe
      </button>
    </div>
  );
}

export default CheckoutPage;
