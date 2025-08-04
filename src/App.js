import React from "react";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./redux/store";
import AuthLoader from "./Components/AuthLoader/AuthLoader";
import "react-toastify/dist/ReactToastify.css";
import "./i18n";
import AppWithLanguage from "./AppWithLanguage";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Elements stripe={stripePromise}>
          <AuthLoader>
            <AppWithLanguage />
            <ToastContainer position="top-right" autoClose={3000} />
          </AuthLoader>
        </Elements>
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
