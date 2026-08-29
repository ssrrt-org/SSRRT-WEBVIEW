const crypto = require("crypto");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const Razorpay = require("razorpay");

initializeApp();

const db = getFirestore();

const razorpayKeyId = defineSecret("RAZORPAY_KEY_ID");
const razorpayKeySecret = defineSecret("RAZORPAY_KEY_SECRET");

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://ssrt-live.firebaseapp.com",
  "https://ssrt-live.web.app",
];

const callableOptions = {
  region: "asia-south1",
  cors: ALLOWED_ORIGINS,
  invoker: "public",
};

function createRazorpayClient() {
  const keyId = razorpayKeyId.value();
  const keySecret = razorpayKeySecret.value();

  if (!keyId || !keySecret) {
    throw new HttpsError(
      "failed-precondition",
      "Razorpay keys are not configured. Run: firebase functions:secrets:set RAZORPAY_KEY_ID && firebase functions:secrets:set RAZORPAY_KEY_SECRET",
    );
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}

exports.createRazorpayOrder = onCall(
  {
    ...callableOptions,
    secrets: [razorpayKeyId, razorpayKeySecret],
  },
  async (request) => {
    const { amount, currency = "INR", receipt } = request.data || {};

    if (!amount || Number(amount) < 100) {
      throw new HttpsError("invalid-argument", "Amount must be at least 100 paise (₹1).");
    }

    try {
      const razorpay = createRazorpayClient();
      const order = await razorpay.orders.create({
        amount: Math.round(Number(amount)),
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
      });

      return {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
      };
    } catch (error) {
      if (error instanceof HttpsError) {
        throw error;
      }

      const status = error.statusCode || error.status;
      if (status === 401) {
        throw new HttpsError("unauthenticated", "Razorpay authentication failed. Check your API keys.");
      }

      throw new HttpsError("internal", error.error?.description || "Failed to create order.");
    }
  },
);

exports.verifyRazorpayPayment = onCall(
  {
    ...callableOptions,
    secrets: [razorpayKeySecret],
  },
  async (request) => {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      donor,
      purpose,
      amount,
      recurring,
    } = request.data || {};

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new HttpsError("invalid-argument", "Missing payment verification fields.");
    }

    const keySecret = razorpayKeySecret.value();
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throw new HttpsError("invalid-argument", "Invalid payment signature.");
    }

    const record = {
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
      createdAt: FieldValue.serverTimestamp(),
    };

    await db.collection("donations").doc(razorpay_payment_id).set(record, { merge: true });

    return { success: true, donation: record };
  },
);
