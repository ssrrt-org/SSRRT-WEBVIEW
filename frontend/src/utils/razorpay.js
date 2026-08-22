const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
const RAZORPAY_KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

let scriptPromise = null;

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
  const response = await fetch(`${API_URL}/api/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: "INR",
      receipt,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to create order");
  }

  return data;
}

export async function verifyPayment(paymentData) {
  const response = await fetch(`${API_URL}/api/verify-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Payment verification failed");
  }

  return data;
}

export function openRazorpayCheckout({ order, donor, purpose, amountInRupees, onSuccess, onFailure, onDismiss }) {
  if (!RAZORPAY_KEY_ID) {
    onFailure(new Error("Payment gateway is not configured"));
    return;
  }

  const options = {
    key: RAZORPAY_KEY_ID,
    amount: order.amount,
    currency: order.currency,
    name: "Srimad Sai Rajarajeshwari Trust",
    description: `Offering toward ${purpose}`,
    order_id: order.order_id,
    prefill: {
      name: donor.donor_name,
      email: donor.email,
      contact: donor.phone,
    },
    notes: {
      purpose,
      dedication: donor.dedication || "",
    },
    theme: {
      color: "#1a2744",
    },
    handler: onSuccess,
    modal: {
      ondismiss: onDismiss,
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.on("payment.failed", (response) => {
    onFailure(new Error(response.error?.description || "Payment failed"));
  });
  razorpay.open();
}

export function rupeesToPaise(rupees) {
  return Math.round(Number(rupees) * 100);
}
