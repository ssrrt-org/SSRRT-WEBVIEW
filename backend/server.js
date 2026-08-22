const crypto = require("crypto");
const path = require("path");
const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const { addDonation, donationSummary } = require("./donationsStore");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5001;

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

if (!keyId || !keySecret) {
  console.error("Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET in .env");
  process.exit(1);
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    message: "SSRRT Razorpay API is running",
    endpoints: ["POST /api/create-order", "POST /api/verify-payment", "GET /api/donations"],
    frontend: "http://localhost:3000/donate",
  });
});

app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;

    if (!amount || Number(amount) < 100) {
      return res.status(400).json({ error: "Amount must be at least 100 paise (₹1)" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount)),
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
    });

    return res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    const statusCode = error.statusCode || error.status;
    if (statusCode === 401) {
      return res.status(401).json({ error: "Razorpay authentication failed" });
    }
    console.error("Create order error:", error);
    return res.status(500).json({ error: "Failed to create order" });
  }
});

app.post("/api/verify-payment", (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    donor,
    purpose,
    amount,
    recurring,
  } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ error: "Missing payment verification fields" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, error: "Invalid payment signature" });
  }

  const record = addDonation({
    id: razorpay_payment_id,
    name: donor?.donor_name || donor?.name || "Anonymous",
    email: donor?.email || "",
    phone: donor?.phone || "",
    pan: donor?.pan || "",
    address: donor?.address || "",
    dedication: donor?.dedication || "",
    purpose: purpose || "General Fund",
    amount: Number(amount) || 0,
    recurring: Boolean(recurring),
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    date: new Date().toISOString(),
    status: "Received",
  });

  return res.json({
    success: true,
    order_id: razorpay_order_id,
    payment_id: razorpay_payment_id,
    donation: record,
  });
});

app.get("/api/donations", (_req, res) => {
  return res.json(donationSummary());
});

app.listen(PORT, () => {
  console.log(`Razorpay API server running on http://localhost:${PORT}`);
});
