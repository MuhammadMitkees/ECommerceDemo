import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { loginSuccess, logout } from "../../redux/slices/userSlice";
import { auth, db } from "../../firebase";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaBox,
  FaClock,
  FaUser,
  FaEnvelope,
  FaShoppingBag,
  FaCalendarAlt,
  FaDollarSign,
  FaTruck,
  FaCamera,
  FaEdit,
  FaSignOutAlt,
  FaArrowRight,
} from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./AccountPage.module.css";
import DummyOrders from "../../Mockups/dummyOrder";
import { setCart } from "../../redux/slices/cartSlice";
import { setWishlist } from "../../redux/slices/wishlistSlice";

function AccountPage() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();

  const [emailVerified, setEmailVerified] = useState(false);
  const [orders, setOrders] = useState([]);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_hybrid&w=740"
  );
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [removingPhoto, setRemovingPhoto] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const CLOUDINARY_CLOUD_NAME = "djj7cfoow";
  const CLOUDINARY_UPLOAD_PRESET = "unsigned_profile";

  // Check if user just placed an order
  useEffect(() => {
    if (location.state?.orderConfirmed) {
      setOrderConfirmed(true);
      setTimeout(() => setOrderConfirmed(false), 5000);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        setEmailVerified(auth.currentUser.emailVerified);
      }
    };
    fetchUser();
  }, []);

  // Fetch real orders from Firestore
  useEffect(() => {
    if (!user?.uid) return;

    setLoadingOrders(true);
    console.log("Fetching orders for user:", user.uid);

    const ordersRef = collection(db, "orders");

    // Try multiple possible user ID field names and without orderBy first
    const possibleQueries = [
      query(ordersRef, where("userId", "==", user.uid)),
      query(ordersRef, where("uid", "==", user.uid)),
      query(ordersRef, where("user_id", "==", user.uid)),
      query(ordersRef, where("userUid", "==", user.uid)),
    ];

    let queryToUse = possibleQueries[0]; // Default to userId

    const unsubscribe = onSnapshot(
      queryToUse,
      (querySnapshot) => {
        console.log("Query snapshot size:", querySnapshot.size);
        console.log("Query snapshot empty:", querySnapshot.empty);

        const firestoreOrders = [];
        querySnapshot.forEach((doc) => {
          console.log("Found order document:", doc.id, doc.data());
          const orderData = doc.data();

          // More flexible data transformation
          const transformedOrder = {
            id: orderData.orderId || orderData.id || doc.id,
            date:
              orderData.createdAt?.toDate?.()?.toISOString()?.split("T")[0] ||
              orderData.created_at?.toDate?.()?.toISOString()?.split("T")[0] ||
              orderData.date ||
              new Date().toISOString().split("T")[0],
            amount_total: Math.round(
              (orderData.pricing?.total ||
                orderData.total ||
                orderData.amount_total ||
                0) * 100
            ),
            status: orderData.status || "Processing",
            items:
              orderData.items?.map((item) => ({
                name: item.title || item.name || "Unknown Item",
                quantity: item.quantity || 1,
                price: Math.round((item.price || 0) * 100),
              })) || [],
            paymentMethod: orderData.paymentMethod || orderData.payment_method,
            shipping: orderData.shipping,
            estimatedDelivery:
              orderData.estimatedDelivery?.toDate?.() ||
              orderData.estimated_delivery?.toDate?.() ||
              new Date(),
          };

          console.log("Transformed order:", transformedOrder);
          firestoreOrders.push(transformedOrder);
        });

        console.log("Final orders array:", firestoreOrders);
        setOrders(firestoreOrders);
        setLoadingOrders(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        console.error("Error details:", error.message, error.code);

        // Try alternative queries if first one fails
        if (
          error.code === "failed-precondition" ||
          error.message.includes("index")
        ) {
          console.log("Trying query without orderBy...");
          // Retry without orderBy
          const simpleQuery = query(ordersRef, where("userId", "==", user.uid));
          onSnapshot(simpleQuery, (snapshot) => {
            console.log("Simple query result:", snapshot.size);
            const orders = [];
            snapshot.forEach((doc) => {
              console.log("Simple query order:", doc.data());
              orders.push(doc.data());
            });
            setOrders(orders);
            setLoadingOrders(false);
          });
        } else {
          setLoadingOrders(false);
        }
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  useEffect(() => {
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
        // Also check if user has photoURL in auth
        if (user.photoURL) {
          setPreviewUrl(user.photoURL);
        }
      } catch (err) {
        console.error("Failed to fetch photoURL from Firestore", err);
      }
    };
    loadPhotoURL();
  }, [user]);

  const ensureUserDocument = async () => {
    if (!user?.uid) return;
    try {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // Create user document if it doesn't exist
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
        console.log("User document created");
      }
    } catch (err) {
      console.error("Error ensuring user document:", err);
    }
  };

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

  const getEstimatedDate = (order) => {
    if (order.estimatedDelivery) {
      return order.estimatedDelivery.toLocaleDateString();
    }

    const baseDate = new Date(order.date);
    if (order.status === "Delivered") return baseDate.toDateString();
    if (order.status === "Shipped") baseDate.setDate(baseDate.getDate() + 2);
    if (order.status === "Processing") baseDate.setDate(baseDate.getDate() + 5);
    return baseDate.toDateString();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "#10B981";
      case "shipped":
        return "#3B82F6";
      case "confirmed":
        return "#8B5CF6";
      case "processing":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <FaCheckCircle />;
      case "shipped":
        return <FaTruck />;
      case "confirmed":
        return <FaBox />;
      case "processing":
        return <FaClock />;
      default:
        return <FaClock />;
    }
  };

  const handleClearPhoto = async () => {
    setRemovingPhoto(true);
    try {
      // Ensure user document exists
      await ensureUserDocument();

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
      console.error("Error removing photo:", err);
      toast.error(
        "Failed to clear profile picture. Please check your permissions."
      );
    }
    setRemovingPhoto(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB.");
      return;
    }

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
        throw new Error(data?.error?.message || "Image upload failed.");
      }

      const imageUrl = data.secure_url;

      // Ensure user document exists before updating
      await ensureUserDocument();

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { photoURL: imageUrl });

      await updateProfile(auth.currentUser, { photoURL: imageUrl });
      await auth.currentUser.reload();
      dispatch(loginSuccess(auth.currentUser));

      setPreviewUrl(imageUrl);
      toast.success("Photo uploaded successfully!");
    } catch (err) {
      console.error("Upload error:", err);
      if (err.message.includes("permissions")) {
        toast.error(
          "Permission denied. Please check your Firestore rules or try again later."
        );
      } else {
        toast.error(err.message || "Failed to upload image.");
      }
    } finally {
      setLoadingPhoto(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    dispatch(logout());
    dispatch(setCart([]));
    dispatch(setWishlist([]));
  };

  // Use real orders if available, otherwise fallback to mock data
  const allOrders = orders.length > 0 ? orders : DummyOrders;
  // Show only the 3 most recent orders on account page
  const displayOrders = allOrders.slice(0, 3);

  return (
    <div className={styles.accountPage}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className={styles.pageTitle}>
            <FaUser className={styles.titleIcon} />
            My Account
          </h1>
          {orderConfirmed && (
            <motion.div
              className={styles.successBanner}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <FaCheckCircle />
              Order placed successfully! Check your recent orders below.
            </motion.div>
          )}
        </motion.div>

        <div className={styles.content}>
          {/* Profile Section */}
          <motion.div
            className={styles.profileCard}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className={styles.profileHeader}>
              <h2>Profile Information</h2>
            </div>

            <div className={styles.profileContent}>
              <div className={styles.avatarSection}>
                <div className={styles.avatarContainer}>
                  <img
                    src={previewUrl || "https://via.placeholder.com/120"}
                    alt="Profile"
                    className={styles.avatar}
                  />
                  <div className={styles.avatarOverlay}>
                    <label className={styles.uploadBtn}>
                      <FaCamera />
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  {(loadingPhoto || removingPhoto) && (
                    <div className={styles.avatarLoader}>
                      <ClipLoader size={20} color="#4F46E5" />
                    </div>
                  )}
                </div>

                {previewUrl &&
                  !previewUrl.includes("freepik.com") &&
                  !previewUrl.includes("placeholder") &&
                  !previewUrl.includes("user-circles-set") && (
                    <button
                      onClick={handleClearPhoto}
                      className={styles.removePhotoBtn}
                      disabled={removingPhoto}
                    >
                      {removingPhoto ? "Removing..." : "Remove Photo"}
                    </button>
                  )}
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <FaUser className={styles.infoIcon} />
                    Full Name
                  </div>
                  <div className={styles.infoValue}>
                    {isEditing ? (
                      <div className={styles.editGroup}>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className={styles.editInput}
                          placeholder="Enter your name"
                        />
                        <button
                          onClick={handleSaveName}
                          className={styles.saveBtn}
                        >
                          <FiCheck />
                        </button>
                      </div>
                    ) : (
                      <div className={styles.valueGroup}>
                        <span>{user?.displayName || "Not set"}</span>
                        <button
                          onClick={() => setIsEditing(true)}
                          className={styles.editBtn}
                        >
                          <FaEdit />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoLabel}>
                    <FaEnvelope className={styles.infoIcon} />
                    Email Address
                  </div>
                  <div className={styles.infoValue}>
                    <span>{user?.email}</span>
                    {emailVerified ? (
                      <span className={styles.verifiedBadge}>
                        <FaCheckCircle /> Verified
                      </span>
                    ) : (
                      <button
                        onClick={handleSendVerification}
                        className={styles.verifyBtn}
                      >
                        Verify Email
                      </button>
                    )}
                  </div>
                </div>

                <div className={styles.profileActions}>
                  <button className={styles.logoutBtn} onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Orders Section */}
          <motion.div
            className={styles.ordersCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={styles.ordersHeader}>
              <div className={styles.ordersHeaderContent}>
                <h2>
                  <FaShoppingBag className={styles.headerIcon} />
                  Recent Orders
                </h2>
                {allOrders.length > 0 && (
                  <span className={styles.orderCount}>
                    {displayOrders.length} of {allOrders.length}{" "}
                    {allOrders.length === 1 ? "order" : "orders"}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.ordersContent}>
              {loadingOrders ? (
                <div className={styles.loadingState}>
                  <ClipLoader size={40} color="#4F46E5" />
                  <p>Loading your orders...</p>
                </div>
              ) : displayOrders.length === 0 ? (
                <div className={styles.emptyState}>
                  <FaShoppingBag className={styles.emptyIcon} />
                  <h3>No orders yet</h3>
                  <p>When you place your first order, it will appear here.</p>
                </div>
              ) : (
                <>
                  <div className={styles.ordersList}>
                    <AnimatePresence>
                      {displayOrders.map((order, index) => (
                        <motion.div
                          key={order.id}
                          className={styles.orderItem}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className={styles.orderHeader}>
                            <div className={styles.orderInfo}>
                              <h3 className={styles.orderId}>
                                Order #{order.id.slice(-8)}
                              </h3>
                              <div className={styles.orderMeta}>
                                <span className={styles.orderDate}>
                                  <FaCalendarAlt />
                                  {new Date(order.date).toLocaleDateString()}
                                </span>
                                <span className={styles.orderTotal}>
                                  <FaDollarSign />$
                                  {(order.amount_total / 100).toFixed(2)}
                                </span>
                              </div>
                            </div>
                            <div
                              className={styles.orderStatus}
                              style={{
                                backgroundColor: getStatusColor(order.status),
                              }}
                            >
                              {getStatusIcon(order.status)}
                              {order.status}
                            </div>
                          </div>

                          <div className={styles.orderDetails}>
                            <div className={styles.estimatedDelivery}>
                              <FaTruck className={styles.deliveryIcon} />
                              <span>
                                Estimated Delivery: {getEstimatedDate(order)}
                              </span>
                            </div>

                            <div className={styles.orderItems}>
                              {order.items.map((item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  className={styles.orderItemDetail}
                                >
                                  <span className={styles.itemName}>
                                    {item.name}
                                  </span>
                                  <span className={styles.itemQuantity}>
                                    ×{item.quantity}
                                  </span>
                                  <span className={styles.itemPrice}>
                                    ${(item.price / 100).toFixed(2)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  {allOrders.length > 3 && (
                    <div className={styles.viewAllOrders}>
                      <Link to="/orders" className={styles.viewAllOrdersLink}>
                        <span>View All Orders ({allOrders.length})</span>
                        <FaArrowRight />
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
