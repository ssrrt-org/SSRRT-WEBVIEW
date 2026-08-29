import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

let scriptPromise = null;

const createOrderFn = httpsCallable(functions, "createRazorpayOrder");
const verifyPaymentFn = httpsCallable(functions, "verifyRazorpayPayment");

function formatCallableError(error, action) {
  const code = error?.code || "";
  const message = error?.message || "";

  if (
    code === "functions/not-found" ||
    code === "functions/unavailable" ||
    message.includes("CORS") ||
    message.includes("Failed to fetch") ||
    message.includes("network")
  ) {
    return new Error(
      `Payment service is not reachable. Deploy Cloud Functions (npm run deploy:functions) or run the local emulator (npm run dev:functions) with REACT_APP_USE_FUNCTIONS_EMULATOR=true in frontend/.env.`,
    );
  }

  return new Error(error?.message || `Unable to ${action}.`);
}

export function isRazorpayConfigured() {
  return Boolean(RAZORPAY_KEY_ID);
}

export function isTestMode() {
  return RAZORPAY_KEY_ID?.startsWith("rzp_test_");
}

export function loadRazorpayScript() {
  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error("Failed to load Razorpay checkout script"));
      document.body.appendChild(script);
    });
  }

  return scriptPromise;
}

export async function createOrder(amountInPaise, receipt) {
  try {
    const result = await createOrderFn({
      amount: amountInPaise,
      currency: "INR",
      receipt,
    });
    return result.data;
  } catch (error) {
    throw formatCallableError(error, "create payment order");
  }
}

export async function verifyPayment(paymentData) {
  try {
    const result = await verifyPaymentFn(paymentData);
    return result.data;
  } catch (error) {
    throw formatCallableError(error, "verify payment");
  }
}

function cleanPhone(phone) {
  const digits = String(phone || "").replace(/\D/g, "");
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  return digits || undefined;
}

export function openRazorpayCheckout({
  order,
  donor,
  purpose,
  amountInRupees,
  onSuccess,
  onFailure,
  onDismiss,
}) {
  if (!RAZORPAY_KEY_ID) {
    onFailure(new Error("Payment gateway is not configured."));
    return;
  }

  const purposeLabel = typeof purpose === "string" ? purpose : purpose?.label || "General Fund";

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Srimad Sai Rajarajeshwari Trust",
    description: `Offering toward ${purposeLabel}`,
    order_id: order.order_id,
    prefill: {
      name: donor.donor_name || undefined,
      email: donor.email || undefined,
      contact: cleanPhone(donor.phone),
    },
    notes: {
      purpose: purposeLabel,
      dedication: donor.dedication || "",
    },
    theme: { color: "#1a2744" },
    handler: onSuccess,
    modal: { ondismiss: onDismiss, confirm_close: true },
  };

  try {
    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      const err = response?.error;
      onFailure(new Error(err?.description || err?.reason || "Payment failed"));
    });
    razorpay.open();
  } catch (error) {
    onFailure(new Error(error?.message || "Could not open Razorpay checkout."));
  }
}

export function rupeesToPaise(rupees) {
  return Math.round(Number(rupees) * 100);
}
