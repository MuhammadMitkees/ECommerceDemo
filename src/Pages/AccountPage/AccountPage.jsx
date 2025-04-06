import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import styles from "./AccountPage.module.css";

const dummyOrders = [
  { id: "001", date: "2024-09-01", total: 89.99 },
  { id: "002", date: "2024-09-10", total: 45.5 },
];

function AccountPage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className={styles.accountPage}>
      <h2>👤 My Account</h2>

      <div className={styles.info}>
        <p>
          <strong>Name:</strong> {user?.displayName || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>

      <div className={styles.orders}>
        <h3>🧾 Recent Orders</h3>
        {dummyOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul>
            {dummyOrders.map((order) => (
              <li key={order.id}>
                Order #{order.id} – {order.date} – ${order.total}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
