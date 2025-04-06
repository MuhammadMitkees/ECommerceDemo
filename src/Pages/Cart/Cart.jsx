import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  return (
    <div className={styles.cartPage}>
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className={styles.emptyMessage}>
          Your cart is empty. <Link to="/">Go shopping</Link>
        </p>
      ) : (
        <>
          <ul className={styles.itemList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.item}>
                <h4>{item.name}</h4>
                <p>
                  Price: ${item.price} × {item.quantity}
                </p>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.totalSection}>
            <h3>Total: ${total}</h3>
            <button onClick={handleCheckout} className={styles.primaryBtn}>
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(clearCart())}
              className={styles.secondaryBtn}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
