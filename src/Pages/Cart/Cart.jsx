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

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to proceed.");
      return navigate("/login");
    }

    const orderRef = doc(db, "orders", `${user.uid}-${Date.now()}`);
    try {
      await setDoc(orderRef, {
        uid: user.uid,
        items: cartItems,
        total,
        createdAt: new Date().toISOString(),
      });

      handleClearCart();
      if (user) {
        const userCartRef = doc(db, "carts", user.uid);
        await setDoc(userCartRef, { items: [] }, { merge: true });
      }
      toast.success("Order placed successfully!");
      navigate("/account");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order.");
    }
  };
  const handleRemoveItem = async (item) => {
    if (!user) return;
    const cartRef = doc(db, "carts", user.uid);
    await updateDoc(cartRef, { items: arrayRemove(item) });
    toast.info(`${item.name} removed from cart.`);
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
      <h2>🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <img src={emptyCart} alt="Empty cart" />
          <p>Your cart is feeling lonely 🛒</p>
          <Link to="/" className={styles.browseLink}>
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div className={styles.cartDetails}>
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                  <div className={styles.quantityControls}>
                    <button onClick={() => handleUpdateQuantity(item, -1)}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item, 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => handleRemoveItem(item)}
                  >
                    Remove
                  </button>
                </div>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className={styles.productImage}
                />
              </li>
            ))}
          </ul>
          <div className={styles.cartFooter}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <button onClick={handleCheckout} className={styles.checkoutBtn}>
              Proceed to Checkout
            </button>
            <button
              onClick={() => handleClearCart()}
              className={styles.clearBtn}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
