import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import styles from "./Checkout.module.css";

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const CheckoutSteps = {
  SHIPPING: "shipping",
  PAYMENT: "payment",
  REVIEW: "review",
};

const ShippingForm = ({ onNext, formData, setFormData }) => (
  <div className={styles.formContainer}>
    <h2>Shipping Information</h2>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Address"
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          required
        />
      </div>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Postal Code"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            required
          />
        </div>
      </div>
      <div className={styles.formGroup}>
        <input
          type="text"
          placeholder="Country"
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          required
        />
      </div>
      <button type="submit" className={styles.nextButton}>
        Continue to Payment
      </button>
    </form>
  </div>
);

const PaymentForm = ({ onNext, onBack, formData }) => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
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
      onNext(paymentMethod);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.cardElement}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.buttonGroup}>
          <button type="button" onClick={onBack} className={styles.backButton}>
            Back
          </button>
          <button type="submit" className={styles.nextButton}>
            Review Order
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewOrder = ({ onBack, formData, cartItems, onConfirm }) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.formContainer}>
      <h2>Review Order</h2>
      <div className={styles.reviewSection}>
        <h3>Shipping Details</h3>
        <p>{formData.fullName}</p>
        <p>{formData.email}</p>
        <p>{formData.address}</p>
        <p>{`${formData.city}, ${formData.postalCode}`}</p>
        <p>{formData.country}</p>
      </div>
      <div className={styles.reviewSection}>
        <h3>Order Summary</h3>
        <div className={styles.orderItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.orderItem}>
              <img src={item.imageUrl} alt={item.name} />
              <div className={styles.itemDetails}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.orderTotal}>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button onClick={onBack} className={styles.backButton}>
          Back
        </button>
        <button onClick={onConfirm} className={styles.confirmButton}>
          Confirm Order
        </button>
      </div>
    </div>
  );
};

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [currentStep, setCurrentStep] = useState(CheckoutSteps.SHIPPING);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const handleShippingNext = () => {
    setCurrentStep(CheckoutSteps.PAYMENT);
  };

  const handlePaymentNext = (paymentMethod) => {
    setCurrentStep(CheckoutSteps.REVIEW);
  };

  const handleBack = () => {
    switch (currentStep) {
      case CheckoutSteps.PAYMENT:
        setCurrentStep(CheckoutSteps.SHIPPING);
        break;
      case CheckoutSteps.REVIEW:
        setCurrentStep(CheckoutSteps.PAYMENT);
        break;
      default:
        break;
    }
  };

  const handleConfirmOrder = async () => {
    // Handle order confirmation and payment processing
    try {
      // Call your backend API to process the payment and create the order
      // Navigate to success page or show confirmation
    } catch (error) {
      console.error("Error processing order:", error);
    }
  };

  return (
    <div className={styles.checkout}>
      <div className={styles.progressBar}>
        <div
          className={`${styles.progressStep} ${
            currentStep === CheckoutSteps.SHIPPING ? styles.active : ""
          } ${
            currentStep === CheckoutSteps.PAYMENT ||
            currentStep === CheckoutSteps.REVIEW
              ? styles.completed
              : ""
          }`}
        >
          Shipping
        </div>
        <div
          className={`${styles.progressStep} ${
            currentStep === CheckoutSteps.PAYMENT ? styles.active : ""
          } ${currentStep === CheckoutSteps.REVIEW ? styles.completed : ""}`}
        >
          Payment
        </div>
        <div
          className={`${styles.progressStep} ${
            currentStep === CheckoutSteps.REVIEW ? styles.active : ""
          }`}
        >
          Review
        </div>
      </div>

      <Elements stripe={stripePromise}>
        {currentStep === CheckoutSteps.SHIPPING && (
          <ShippingForm
            onNext={handleShippingNext}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {currentStep === CheckoutSteps.PAYMENT && (
          <PaymentForm
            onNext={handlePaymentNext}
            onBack={handleBack}
            formData={formData}
          />
        )}
        {currentStep === CheckoutSteps.REVIEW && (
          <ReviewOrder
            onBack={handleBack}
            formData={formData}
            cartItems={cartItems}
            onConfirm={handleConfirmOrder}
          />
        )}
      </Elements>
    </div>
  );
};

export default Checkout;
