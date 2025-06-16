import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase";
import {
  arrayRemove,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import styles from "./Cart.module.css";
import { toast } from "react-toastify";
import emptyCart from "../../assets/empty-cart.svg";
import { setCart } from "../../redux/slices/cartSlice";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
    console.log("cartItems", cartItems);
  }, [cartItems]);

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please log in to proceed.");
      return navigate("/login");
    }
    navigate("/checkout");
  };

  const handleRemoveItem = async (item) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, { items: arrayRemove(item) });
    toast.info(`${item.title} removed from cart.`);
  };

  const handleUpdateQuantity = async (item, change) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    const snap = await getDoc(cartRef);
    if (snap.exists()) {
      let cartItems = snap.data().items || [];
      const updatedItems = cartItems.map((i) =>
        i.id === item.id
          ? { ...i, quantity: Math.max(1, i.quantity + change) }
          : i
      );
      await setDoc(cartRef, { items: updatedItems }, { merge: true });
    }
  };

  const handleClearCart = async () => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, {
      items: [],
    });
    toast.info("Cart cleared!");
  };

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "carts", user.uid);
    const unsubscribe = onSnapshot(ref, (docSnap) => {
      const data = docSnap.data();
      const cartItems = data?.items || [];
      dispatch(setCart(cartItems));
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div className={styles.cartPage}>
      <h2 className={styles.heading}>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <img src={emptyCart} alt="Empty cart" />
          <p>Your cart is feeling lonely 🛒</p>
          <Link to="/" className={styles.browseLink}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className={styles.cartContent}>
          <ul className={styles.cartList}>
            {cartItems.map((item) => {
              const discounted = item.discountPercentage > 0;
              const discountedPrice = discounted
                ? (item.price * (1 - item.discountPercentage / 100)).toFixed(2)
                : item.price.toFixed(2);
              return (
                <li key={item.id} className={styles.cartItem}>
                  <div className={styles.productImageWrapper}>
                    <Link to={`/product/${item.id}`} tabIndex={-1}>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className={styles.productImage}
                      />
                    </Link>
                  </div>
                  <div className={styles.cartDetails}>
                    <div className={styles.productHeaderRow}>
                      <Link
                        to={`/product/${item.id}`}
                        className={styles.productName}
                      >
                        {item.title}
                      </Link>
                      <span className={styles.sku}>SKU: {item.sku}</span>
                    </div>
                    <div className={styles.metaRow}>
                      <span className={styles.brand}>{item.brand}</span>
                      {item.category && (
                        <span className={styles.category}>{item.category}</span>
                      )}
                    </div>
                    <div className={styles.priceQtyRow}>
                      <span className={styles.price}>
                        {discounted ? (
                          <>
                            <span className={styles.discountedPrice}>
                              ${discountedPrice}
                            </span>
                            <span className={styles.originalPrice}>
                              ${item.price.toFixed(2)}
                            </span>
                            <span className={styles.discountBadge}>
                              -{item.discountPercentage}%
                            </span>
                          </>
                        ) : (
                          <>${item.price.toFixed(2)}</>
                        )}
                      </span>
                      <div className={styles.quantityControls}>
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => handleUpdateQuantity(item, -1)}
                          className={styles.qtyBtn}
                          disabled={
                            item.quantity <= (item.minimumOrderQuantity || 1)
                          }
                        >
                          −
                        </button>
                        <span className={styles.qty}>{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => handleUpdateQuantity(item, 1)}
                          className={styles.qtyBtn}
                          disabled={item.quantity >= item.stock}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className={styles.stockRow}>
                      {item.stock > 0 ? (
                        <span className={styles.inStock}>
                          <span className={styles.dot}></span>In Stock (
                          {item.stock} available)
                        </span>
                      ) : (
                        <span className={styles.outOfStock}>
                          <span className={styles.dot}></span>Out of Stock
                        </span>
                      )}
                      {item.minimumOrderQuantity > 1 && (
                        <span className={styles.minOrder}>
                          Min. order: {item.minimumOrderQuantity}
                        </span>
                      )}
                    </div>
                    <div className={styles.extraInfoRow}>
                      {item.shippingInformation && (
                        <span
                          className={styles.infoTag}
                          title="Shipping Information"
                        >
                          🚚 {item.shippingInformation}
                        </span>
                      )}
                      {item.warrantyInformation && (
                        <span
                          className={styles.infoTag}
                          title="Warranty Information"
                        >
                          🛡 {item.warrantyInformation}
                        </span>
                      )}
                      {item.returnPolicy && (
                        <span className={styles.infoTag} title="Return Policy">
                          ↩ {item.returnPolicy}
                        </span>
                      )}
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => handleRemoveItem(item)}
                      aria-label={`Remove ${item.title} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <aside className={styles.cartSidebar}>
            <div className={styles.cartSummaryBox}>
              <h3 className={styles.summaryHeading}>Order Summary</h3>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className={styles.checkoutBtn}
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
              <button
                onClick={handleClearCart}
                className={styles.clearBtn}
                aria-label="Clear cart"
              >
                Clear Cart
              </button>
              <Link to="/" className={styles.continueShoppingLink}>
                ← Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default CartPage;
