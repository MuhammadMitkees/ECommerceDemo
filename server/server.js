import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";

dotenv.config();
const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // convert to cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/cart",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating Stripe session:", err);
    res.status(500).json({ error: "Failed to create session" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
