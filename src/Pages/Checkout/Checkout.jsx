import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiCreditCard, FiCheck } from "react-icons/fi";
import { doc, updateDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { setCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import styles from "./Checkout.module.css";

// Initialize Stripe with a working test key for development
const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || "pk_test_TYooMQauvdEDq54NiTphI7jx" // This is a demo key from Stripe's documentation
);

// Debug Stripe loading
console.log(
  "Stripe public key:",
  process.env.REACT_APP_STRIPE_PUBLIC_KEY || "Using demo key"
);
console.log("Stripe promise initialized:", !!stripePromise);

const SHIPPING_OPTIONS = [
  { label: "Standard (3-5 days, Free)", value: "standard", cost: 0 },
  { label: "Express (1-2 days, $9.99)", value: "express", cost: 9.99 },
];

const PAYMENT_OPTIONS = [
  {
    label: "Credit/Debit Card",
    value: "card",
    icon: <FiCreditCard className={styles.optionIcon} />,
  },
  {
    label: "Cash on Delivery",
    value: "cod",
    icon: <FiShoppingBag className={styles.optionIcon} />,
  },
];

const CheckoutSteps = {
  SHIPPING: "shipping",
  PAYMENT: "payment",
  REVIEW: "review",
};

const fadeAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { key: CheckoutSteps.SHIPPING, label: "Shipping" },
    { key: CheckoutSteps.PAYMENT, label: "Payment" },
    { key: CheckoutSteps.REVIEW, label: "Review" },
  ];

  return (
    <div className={styles.progressBar}>
      {steps.map((step, index) => {
        const isCompleted =
          steps.findIndex((s) => s.key === currentStep) > index;
        const isActive = step.key === currentStep;

        return (
          <div
            key={step.key}
            className={`${styles.progressStep} ${
              isActive ? styles.active : ""
            } ${isCompleted ? styles.completed : ""}`}
          >
            {isCompleted ? <FiCheck /> : null}
            {step.label}
          </div>
        );
      })}
    </div>
  );
};

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "EG", name: "Egypt" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "IN", name: "India" },
  { code: "AU", name: "Australia" },
  { code: "JP", name: "Japan" },
  { code: "CN", name: "China" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "IT", name: "Italy" },
  { code: "ES", name: "Spain" },
  { code: "NL", name: "Netherlands" },
  { code: "SE", name: "Sweden" },
  { code: "NO", name: "Norway" },
  { code: "DK", name: "Denmark" },
];

const ShippingForm = ({ onNext, formData, setFormData }) => {
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const isFieldValid = (field) => {
    if (!touched[field]) return true;
    return formData[field]?.trim().length > 0;
  };

  return (
    <motion.div className={styles.formContainer} {...fadeAnimation}>
      <h2>Shipping Information</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              onBlur={() => handleBlur("fullName")}
              className={!isFieldValid("fullName") ? styles.error : ""}
              required
            />
            {!isFieldValid("fullName") && (
              <span className={styles.errorText}>
                Please enter your full name
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onBlur={() => handleBlur("email")}
              className={!isFieldValid("email") ? styles.error : ""}
              required
            />
            {!isFieldValid("email") && (
              <span className={styles.errorText}>
                Please enter a valid email
              </span>
            )}
          </div>
        </div>

        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            onBlur={() => handleBlur("address")}
            className={!isFieldValid("address") ? styles.error : ""}
            required
          />
          {!isFieldValid("address") && (
            <span className={styles.errorText}>Please enter your address</span>
          )}
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              onBlur={() => handleBlur("city")}
              className={!isFieldValid("city") ? styles.error : ""}
              required
            />
            {!isFieldValid("city") && (
              <span className={styles.errorText}>Please enter your city</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={(e) =>
                setFormData({ ...formData, postalCode: e.target.value })
              }
              onBlur={() => handleBlur("postalCode")}
              className={!isFieldValid("postalCode") ? styles.error : ""}
              required
            />
            {!isFieldValid("postalCode") && (
              <span className={styles.errorText}>
                Please enter your postal code
              </span>
            )}
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <select
              value={formData.country}
              onChange={(e) =>
                setFormData({ ...formData, country: e.target.value })
              }
              onBlur={() => handleBlur("country")}
              className={!isFieldValid("country") ? styles.error : ""}
              required
            >
              <option value="">Select Country</option>
              {COUNTRIES.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            {!isFieldValid("country") && (
              <span className={styles.errorText}>
                Please select your country
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <select
              value={formData.shippingMethod}
              onChange={(e) =>
                setFormData({ ...formData, shippingMethod: e.target.value })
              }
              required
            >
              {SHIPPING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.nextButton}>
            Continue to Payment
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const CardInput = ({ onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  console.log(
    "CardInput rendered - Stripe:",
    !!stripe,
    "Elements:",
    !!elements
  );

  return (
    <div className={styles.cardElement}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
          hidePostalCode: false,
        }}
        onChange={(event) => {
          if (event.error) {
            onError(event.error.message);
          } else {
            onError(null);
          }
        }}
      />
    </div>
  );
};

const PaymentForm = ({
  onNext,
  onBack,
  paymentMethod,
  setPaymentMethod,
  formData,
}) => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  // Debug logs
  console.log("PaymentForm rendered, paymentMethod:", paymentMethod);
  console.log("Stripe loaded:", !!stripe);
  console.log("Elements loaded:", !!elements);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      if (!stripe || !elements) {
        setError(
          "Payment system is loading. Please wait a moment and try again."
        );
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("Card input not found. Please refresh the page.");
        return;
      }

      try {
        const { error, paymentMethod: stripePaymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
              address: {
                line1: formData.address,
                city: formData.city,
                postal_code: formData.postalCode,
                country: formData.country,
              },
            },
          });

        if (error) {
          setError(error.message);
        } else {
          setError(null);
          onNext(stripePaymentMethod);
        }
      } catch (err) {
        setError("An error occurred while processing your payment method.");
        console.error("Payment method creation error:", err);
      }
    } else {
      // Cash on delivery
      onNext("cod");
    }
  };

  return (
    <motion.div className={styles.formContainer} {...fadeAnimation}>
      <h2>Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.paymentOptions}>
            {PAYMENT_OPTIONS.map((option) => (
              <label key={option.value} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.value}
                  checked={paymentMethod === option.value}
                  onChange={(e) => {
                    console.log("Payment method changed to:", e.target.value);
                    setPaymentMethod(e.target.value);
                    setError(null);
                  }}
                  required
                />
                <span className={styles.radioContent}>
                  {option.icon}
                  <span className={styles.radioText}>{option.label}</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {paymentMethod === "card" && (
          <div className={styles.formGroup}>
            <CardInput onError={setError} />
          </div>
        )}

        {paymentMethod === "cod" && (
          <div className={styles.formGroup}>
            <div className={styles.codInfo}>
              <p>
                💰 You will pay cash when your order is delivered to your
                address.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className={styles.formGroup}>
            <div className={styles.error}>{error}</div>
          </div>
        )}

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.backButton} onClick={onBack}>
            Back to Shipping
          </button>
          <button
            type="submit"
            className={styles.nextButton}
            disabled={paymentMethod === "card" && (!stripe || !elements)}
          >
            {paymentMethod === "card" && (!stripe || !elements)
              ? "Loading..."
              : "Continue to Review"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

const ReviewOrder = ({
  onBack,
  formData,
  cartItems,
  paymentMethod,
  onConfirm,
}) => {
  const calculateTotal = () => {
    const itemsTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingCost =
      SHIPPING_OPTIONS.find((opt) => opt.value === formData.shippingMethod)
        ?.cost || 0;
    return (itemsTotal + shippingCost).toFixed(2);
  };

  const getShippingCost = () => {
    const shippingOption = SHIPPING_OPTIONS.find(
      (opt) => opt.value === formData.shippingMethod
    );
    return shippingOption?.cost || 0;
  };

  const getCountryName = () => {
    const country = COUNTRIES.find((c) => c.code === formData.country);
    return country?.name || formData.country;
  };

  return (
    <motion.div className={styles.formContainer} {...fadeAnimation}>
      <h2>Review Order</h2>

      <div className={styles.reviewGrid}>
        <div className={styles.reviewSection}>
          <h3>Shipping Address</h3>
          <div className={styles.addressInfo}>
            <p>
              <strong>{formData.fullName}</strong>
            </p>
            <p>{formData.address}</p>
            <p>
              {formData.city}, {formData.postalCode}
            </p>
            <p>{getCountryName()}</p>
            <p>{formData.email}</p>
          </div>
        </div>

        <div className={styles.reviewSection}>
          <h3>Order Summary</h3>
          <div className={styles.orderSummary}>
            <div className={styles.summaryRow}>
              <span>Items ({cartItems.length})</span>
              <span>
                $
                {cartItems
                  .reduce((sum, item) => sum + item.price * item.quantity, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>
                {getShippingCost() === 0
                  ? "FREE"
                  : `$${getShippingCost().toFixed(2)}`}
              </span>
            </div>
            <div className={styles.summaryRow}>
              <span>Payment</span>
              <span>
                {paymentMethod === "card" ? "Credit Card" : "Cash on Delivery"}
              </span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>
                <strong>Total</strong>
              </span>
              <span>
                <strong>${calculateTotal()}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.reviewSection}>
        <h3>Order Items</h3>
        <div className={styles.orderItems}>
          {cartItems.slice(0, 3).map((item) => (
            <div key={item.id} className={styles.orderItem}>
              <img
                src={item.thumbnail || item.image}
                alt={item.title || item.name}
              />
              <div className={styles.itemDetails}>
                <h4>{item.title || item.name}</h4>
                <p>
                  Qty: {item.quantity} × ${item.price.toFixed(2)}
                </p>
              </div>
              <div className={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          {cartItems.length > 3 && (
            <p className={styles.moreItems}>
              +{cartItems.length - 3} more items
            </p>
          )}
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="button" className={styles.backButton} onClick={onBack}>
          Back to Payment
        </button>
        <button
          type="button"
          className={styles.confirmButton}
          onClick={onConfirm}
        >
          Place Order
        </button>
      </div>
    </motion.div>
  );
};

const CheckoutContent = () => {
  const [currentStep, setCurrentStep] = useState(CheckoutSteps.SHIPPING);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    shippingMethod: "standard",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [stripePaymentMethod, setStripePaymentMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleShippingNext = () => setCurrentStep(CheckoutSteps.PAYMENT);
  const handlePaymentNext = (paymentMethodData) => {
    if (paymentMethod === "card") {
      setStripePaymentMethod(paymentMethodData);
    }
    setCurrentStep(CheckoutSteps.REVIEW);
  };

  const handleBack = () => {
    if (currentStep === CheckoutSteps.PAYMENT) {
      setCurrentStep(CheckoutSteps.SHIPPING);
    } else if (currentStep === CheckoutSteps.REVIEW) {
      setCurrentStep(CheckoutSteps.PAYMENT);
    }
  };

  const handleConfirmOrder = async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      // Calculate totals
      const itemsTotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const shippingCost =
        SHIPPING_OPTIONS.find((opt) => opt.value === formData.shippingMethod)
          ?.cost || 0;
      const total = itemsTotal + shippingCost;

      const orderId = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 7)
        .toUpperCase()}`;

      if (paymentMethod === "card") {
        // Process card payment
        if (!stripe || !stripePaymentMethod) {
          throw new Error("Payment method not available");
        }

        // Create payment intent on server
        const paymentIntentResponse = await fetch(
          "http://localhost:5000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: total,
              metadata: {
                orderId: orderId,
                userId: user.uid,
              },
            }),
          }
        );

        if (!paymentIntentResponse.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await paymentIntentResponse.json();

        // Confirm payment with Stripe
        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret, {
            payment_method: stripePaymentMethod.id,
          });

        if (confirmError) {
          throw new Error(confirmError.message);
        }

        if (paymentIntent.status !== "succeeded") {
          throw new Error(`Payment ${paymentIntent.status}. Please try again.`);
        }

        // Payment successful - create order
        const orderData = {
          orderId: orderId,
          userId: user.uid,
          userEmail: user.email,
          items: cartItems,
          shipping: formData,
          paymentMethod: paymentMethod,
          paymentDetails: {
            type: "card",
            last4: stripePaymentMethod?.card?.last4 || "****",
            brand: stripePaymentMethod?.card?.brand || "unknown",
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
          },
          pricing: {
            itemsTotal: itemsTotal,
            shippingCost: shippingCost,
            total: total,
          },
          status: "confirmed",
          createdAt: serverTimestamp(),
          estimatedDelivery: new Date(
            Date.now() +
              (formData.shippingMethod === "express" ? 2 : 5) *
                24 *
                60 *
                60 *
                1000
          ),
        };

        // Save order to Firestore
        const orderRef = doc(db, "orders", orderData.orderId);
        await setDoc(orderRef, orderData);

        toast.success(`🎉 Payment successful! Order ID: ${orderData.orderId}`);
      } else {
        // Cash on delivery - no payment processing needed
        const orderData = {
          orderId: orderId,
          userId: user.uid,
          userEmail: user.email,
          items: cartItems,
          shipping: formData,
          paymentMethod: paymentMethod,
          paymentDetails: {
            type: "cod",
          },
          pricing: {
            itemsTotal: itemsTotal,
            shippingCost: shippingCost,
            total: total,
          },
          status: "confirmed",
          createdAt: serverTimestamp(),
          estimatedDelivery: new Date(
            Date.now() +
              (formData.shippingMethod === "express" ? 2 : 5) *
                24 *
                60 *
                60 *
                1000
          ),
        };

        // Save order to Firestore
        const orderRef = doc(db, "orders", orderData.orderId);
        await setDoc(orderRef, orderData);

        toast.success(
          `🎉 Order placed successfully! Order ID: ${orderData.orderId}`
        );
      }

      // Clear the cart in Firestore
      const cartRef = doc(db, "carts", user.uid);
      await updateDoc(cartRef, {
        items: [],
        lastUpdated: serverTimestamp(),
      });

      // Update Redux state
      dispatch(setCart([]));

      // Navigate to success page or account page
      setTimeout(() => {
        navigate("/account", {
          state: {
            orderConfirmed: true,
            orderId: orderId,
          },
        });
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect if no items in cart
  useEffect(() => {
    if (cartItems.length === 0 && currentStep !== CheckoutSteps.SHIPPING) {
      toast.info("Your cart is empty. Redirecting to home page.");
      setTimeout(() => navigate("/"), 2000);
    }
  }, [cartItems.length, currentStep, navigate]);

  return (
    <div className={styles.checkout}>
      <ProgressBar currentStep={currentStep} />

      <AnimatePresence mode="wait">
        {currentStep === CheckoutSteps.SHIPPING && (
          <ShippingForm
            key="shipping"
            onNext={handleShippingNext}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {currentStep === CheckoutSteps.PAYMENT && (
          <PaymentForm
            key="payment"
            onNext={handlePaymentNext}
            onBack={handleBack}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            formData={formData}
          />
        )}

        {currentStep === CheckoutSteps.REVIEW && (
          <ReviewOrder
            key="review"
            onBack={handleBack}
            formData={formData}
            cartItems={cartItems}
            paymentMethod={paymentMethod}
            onConfirm={handleConfirmOrder}
          />
        )}
      </AnimatePresence>

      {isProcessing && (
        <div className={styles.processingOverlay}>
          <div className={styles.processingContent}>
            <div className={styles.spinner}></div>
            <p>Processing your order...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutContent />
    </Elements>
  );
};

export default Checkout;
