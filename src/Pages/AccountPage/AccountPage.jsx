import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "../../redux/slices/userSlice";
import { auth, db } from "../../firebase";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { FaCheckCircle, FaBox, FaClock } from "react-icons/fa";
import styles from "./AccountPage.module.css";
import DummyOrders from "../../Mockups/dummyOrder";
import { FiCheck, FiEdit } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { setCart } from "../../redux/slices/cartSlice";
import { setWishlist } from "../../redux/slices/wishlistSlice";

function AccountPage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [emailVerified, setEmailVerified] = useState(false);
  const [orders, setOrders] = useState([]);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740"
  );
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [removingPhoto, setRemovingPhoto] = useState(false);
  const CLOUDINARY_CLOUD_NAME = "djj7cfoow";
  const CLOUDINARY_UPLOAD_PRESET = "unsigned_profile";
  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        console.log("emailVerified", auth.currentUser);

        setEmailVerified(auth.currentUser.emailVerified);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    if (user?.email) {
      fetch(`https://ecommercedemo-o7k4.onrender.com/orders/${user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => setOrders(data))
        .catch((err) => console.error("Error loading orders:", err));
    }
    const loadPhotoURL = async () => {
      if (!user) return;
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.photoURL) {
            setPreviewUrl(data.photoURL);
          }
        }
      } catch (err) {
        console.error("Failed to fetch photoURL from Firestore", err);
      }
    };
    loadPhotoURL();
  }, [user]);
  const handleSaveName = async () => {
    try {
      await updateProfile(auth.currentUser, { displayName });
      await auth.currentUser?.reload();
      dispatch(loginSuccess(auth.currentUser));
      toast.success("Name updated!");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update name.");
    }
  };
  const handleSendVerification = async () => {
    try {
      await sendEmailVerification(auth.currentUser);
      toast.success("Verification email sent!");
    } catch (err) {
      toast.error("Failed to send verification email.");
    }
  };
  const getEstimatedDate = (status, dateStr) => {
    const baseDate = new Date(dateStr);
    if (status === "Delivered") return baseDate.toDateString();
    if (status === "Shipped") baseDate.setDate(baseDate.getDate() + 2);
    if (status === "Processing") baseDate.setDate(baseDate.getDate() + 5);
    return baseDate.toDateString();
  };

  const handleClearPhoto = async () => {
    setRemovingPhoto(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { photoURL: "" });

      await updateProfile(auth.currentUser, { photoURL: "" });
      await auth.currentUser.reload();
      dispatch(loginSuccess(auth.currentUser));
      setPreviewUrl(
        "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740"
      );
      toast.success("Profile picture removed.");
    } catch (err) {
      toast.error("Failed to clear profile picture.");
    }
    setRemovingPhoto(false);
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingPhoto(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data?.secure_url) {
        console.error("Cloudinary Error:", data);
        throw new Error("Image upload failed.");
      }

      const imageUrl = data.secure_url;

      // Update in Firebase
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { photoURL: imageUrl });

      await updateProfile(auth.currentUser, { photoURL: imageUrl });
      await auth.currentUser.reload();
      dispatch(loginSuccess(auth.currentUser));

      setPreviewUrl(imageUrl);
      toast.success("Photo uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to upload image.");
    } finally {
      setLoadingPhoto(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout()); // clears user state
    dispatch(setCart(null)); // clears cart
    dispatch(setWishlist(null)); // clears wishlist
  };
  return (
    <div className={styles.accountPage}>
      <h2>👤 My Account</h2>

      <div className={styles.info}>
        <div className={styles.avatarSection}>
          <img
            src={previewUrl || "https://via.placeholder.com/100"}
            alt="Profile"
            className={styles.avatar}
          />
          <label className={styles.uploadBtn}>
            Upload New Photo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {previewUrl &&
            previewUrl !==
              "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740" && (
              <button
                onClick={handleClearPhoto}
                className={`${styles.clearBtn} ${styles.button}`}
              >
                Remove Photo
              </button>
            )}
          {(loadingPhoto || removingPhoto) && (
            <div className={styles.spinnerWrapper}>
              <ClipLoader size={30} color="#007bff" />
            </div>
          )}{" "}
        </div>

        <p>
          <strong>Name:</strong>{" "}
          {isEditing ? (
            <>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={styles.nameInput}
                placeholder="Enter your name"
              />
              <button
                onClick={handleSaveName}
                className={`${styles.iconButton} ${styles.button}`}
                title="Save"
              >
                <FiCheck />
              </button>
            </>
          ) : (
            <>
              {user?.displayName || "N/A"}
              <button
                onClick={() => setIsEditing(true)}
                className={`${styles.iconButton} ${styles.button}`}
                title="Edit Name"
              >
                <FiEdit />
              </button>
            </>
          )}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}{" "}
          {emailVerified ? (
            <span className={styles.verifiedBadge}>✔ Verified</span>
          ) : (
            <button
              onClick={handleSendVerification}
              className={`${styles.verifyBtn} ${styles.button}`}
            >
              Verify Email
            </button>
          )}
        </p>
        <button className={styles.button} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>

      <div className={styles.orders}>
        <h3>🧾 Recent Orders</h3>
        {DummyOrders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <ul className={styles.accountOrderList}>
            {DummyOrders.map((order) => (
              <li key={order.id} className={styles.accountOrderItem}>
                <strong>Order #{order.id.slice(-5)}</strong> – {order.date} – $
                {order.amount_total / 100}
                <span
                  className={`${styles.accountOrderStatus} ${
                    styles[`accountOrderStatus--${order.status.toLowerCase()}`]
                  }`}
                >
                  {order.status === "Delivered" && (
                    <FaCheckCircle className={styles.statusIcon} />
                  )}
                  {order.status === "Shipped" && (
                    <FaBox className={styles.statusIcon} />
                  )}
                  {order.status === "Processing" && (
                    <FaClock className={styles.statusIcon} />
                  )}{" "}
                  {order.status}
                </span>
                <p className={styles.accountOrderEstimated}>
                  Estimated Delivery:{" "}
                  {getEstimatedDate(order.status, order.date)}
                </p>
                <ul className={styles.accountOrderItems}>
                  {order.items.map((item, index) => (
                    <li key={index} className={styles.accountOrderItemDetail}>
                      {item.name} x{item.quantity} – $
                      {(item.price / 100).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AccountPage;
