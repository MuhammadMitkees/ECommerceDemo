import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaBox,
  FaClock,
  FaShoppingBag,
  FaCalendarAlt,
  FaDollarSign,
  FaTruck,
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Orders.module.css";
import DummyOrders from "../../Mockups/dummyOrder";

function Orders() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // Fetch orders from Firestore (same logic as AccountPage)
  useEffect(() => {
    if (!user?.uid) return;

    setLoadingOrders(true);
    console.log("Fetching orders for user:", user.uid);

    const ordersRef = collection(db, "orders");
    const queryToUse = query(ordersRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(
      queryToUse,
      (querySnapshot) => {
        console.log("Query snapshot size:", querySnapshot.size);
        const firestoreOrders = [];
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
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
          firestoreOrders.push(transformedOrder);
        });

        // Sort orders by date (newest first)
        firestoreOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(firestoreOrders);
        setLoadingOrders(false);
      },
      (error) => {
        console.error("Error fetching orders:", error);
        if (
          error.code === "failed-precondition" ||
          error.message.includes("index")
        ) {
          const simpleQuery = query(ordersRef, where("userId", "==", user.uid));
          onSnapshot(simpleQuery, (snapshot) => {
            const orders = [];
            snapshot.forEach((doc) => {
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

  // Use real orders if available, otherwise fallback to mock data
  const displayOrders = orders.length > 0 ? orders : DummyOrders;

  // Calculate pagination
  const totalPages = Math.ceil(displayOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const currentOrders = displayOrders.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${styles.pageButton} ${
            currentPage === i ? styles.activePageButton : ""
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className={styles.pagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageNavButton}
        >
          <FaChevronLeft />
        </button>
        {pages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageNavButton}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  };

  return (
    <div className={styles.ordersPage}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.headerContent}>
            <button
              onClick={() => navigate(-1)}
              className={styles.backButton}
              aria-label="Go back"
            >
              <FaArrowLeft />
            </button>
            <h1 className={styles.pageTitle}>
              <FaShoppingBag className={styles.titleIcon} />
              My Orders
            </h1>
          </div>
          {displayOrders.length > 0 && (
            <div className={styles.orderStats}>
              <span className={styles.totalOrders}>
                {displayOrders.length}{" "}
                {displayOrders.length === 1 ? "order" : "orders"} total
              </span>
              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}
        </motion.div>

        {/* Orders Content */}
        <motion.div
          className={styles.ordersCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
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
                <button
                  onClick={() => navigate("/")}
                  className={styles.shopNowButton}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className={styles.ordersList}>
                  <AnimatePresence mode="wait">
                    {currentOrders.map((order, index) => (
                      <motion.div
                        key={`${order.id}-${currentPage}`}
                        className={styles.orderItem}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
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
                {renderPagination()}
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Orders;
