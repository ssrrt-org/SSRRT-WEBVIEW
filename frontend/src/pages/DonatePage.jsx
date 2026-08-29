import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Eyebrow } from "@/components/shared/PageSections";
import { donationPurposes, donatePurposeFromQuery } from "@/constants/nav";
import { useDonateConfig } from "@/context/CmsContext";
import {
  createOrder,
  isRazorpayConfigured,
  isTestMode,
  loadRazorpayScript,
  openRazorpayCheckout,
  rupeesToPaise,
  verifyPayment,
} from "@/utils/razorpay";

const purposeShortLabel = (label) => {
  const shortcuts = {
    "Ashram & Temple Maintenance": "Ashram Maintenance",
    "Goshala · Adopt-a-Cow": "Goshala · Adopt-a-Cow",
  };
  return shortcuts[label] || label;
};

export default function DonatePage() {
  const donateConfig = useDonateConfig();
  const purposeOptions = donateConfig.purposes?.map((item) => item.label) || donationPurposes;
  const [searchParams] = useSearchParams();
  const purposeKey = searchParams.get("purpose");
  const [form, setForm] = useState({ donor_name: "", email: "", phone: "", pan: "", address: "", dedication: "" });
  const [purpose, setPurpose] = useState(purposeOptions[0]);
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (purposeKey && donatePurposeFromQuery[purposeKey]) {
      setPurpose(donatePurposeFromQuery[purposeKey]);
      setSubmitted(false);
    }
  }, [purposeKey]);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const amountInRupees = Number(amount);
    if (!amountInRupees || amountInRupees < 1) {
      setError("Please enter a valid offering amount of at least ₹1.");
      return;
    }

    const amountInPaise = rupeesToPaise(amountInRupees);
    if (amountInPaise < 100) {
      setError("Minimum offering amount is ₹1.");
      return;
    }

    setLoading(true);

    if (!isRazorpayConfigured()) {
      setError("Payment gateway is not configured. Add REACT_APP_RAZORPAY_KEY_ID to frontend/.env and restart the dev server.");
      setLoading(false);
      return;
    }

    try {
      await loadRazorpayScript();
      const order = await createOrder(amountInPaise, `donation_${Date.now()}`);

      openRazorpayCheckout({
        order,
        donor: form,
        purpose,
        amountInRupees,
        onSuccess: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donor: form,
              purpose,
              amount: amountInRupees,
              recurring: false,
            });
            setSubmitted(true);
          } catch (verifyError) {
            setError(verifyError.message || "Payment verification failed. Please contact the Trust office.");
          } finally {
            setLoading(false);
          }
        },
        onFailure: (failureError) => {
          setError(failureError.message || "Payment failed. Please try again.");
          setLoading(false);
        },
        onDismiss: () => {
          setError("Payment cancelled.");
          setLoading(false);
        },
      });
    } catch (checkoutError) {
      setError(checkoutError.message || "Unable to start payment. Deploy Firebase Functions first.");
      setLoading(false);
    }
  };

  return (
    <section className="donate-page">
      <div className="wrap donate-page-inner">
        <div className="donate-card">
          {submitted ? (
            <div className="donate-success" data-testid="donation-success-message">
              <div className="success-icon"><Check /></div>
              <Eyebrow>Offering received</Eyebrow>
              <h3>Thank you, {form.donor_name}.</h3>
              <p>
                Your offering of ₹{Number(amount).toLocaleString("en-IN")} toward {purpose} has been received.
              </p>
              <button type="button" className="btn-solid donate-continue-btn" data-testid="new-donation-button" onClick={() => setSubmitted(false)}>
                Make another offering
              </button>
            </div>
          ) : (
            <form className="donate-card-form" data-testid="donation-form" onSubmit={submit}>
              <div className="donate-block">
                <h2 className="donate-block-label">Choose a purpose</h2>
                <div className="donate-purpose-grid">
                  {purposeOptions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      data-testid={`purpose-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-button`}
                      className={purpose === item ? "donate-purpose active" : "donate-purpose"}
                      onClick={() => setPurpose(item)}
                    >
                      {purposeShortLabel(item)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="donate-block donate-block-amount">
                <h2 className="donate-block-label">Offering amount</h2>
                <div className="donate-amount-input">
                  <span className="donate-amount-symbol">₹</span>
                  <input
                    data-testid="custom-amount-input"
                    type="number"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    aria-label="Offering amount"
                  />
                </div>
              </div>

              <div className="donate-block">
                <h2 className="donate-block-label">Devotee details</h2>
                <div className="donate-details-grid donate-details-inline">
                  <label>
                    <span>Name</span>
                    <input data-testid="donor-name-input" required type="text" value={form.donor_name} onChange={update("donor_name")} placeholder="Your full name" />
                  </label>
                  <label>
                    <span>Email</span>
                    <input data-testid="donor-email-input" required type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input data-testid="donor-phone-input" required type="text" value={form.phone} onChange={update("phone")} placeholder="+91" />
                  </label>
                  <label>
                    <span>PAN</span>
                    <input data-testid="donor-pan-input" type="text" value={form.pan} onChange={update("pan")} placeholder="ABCDE1234F" />
                  </label>
                  <label>
                    <span>Address</span>
                    <input data-testid="donor-address-input" required type="text" value={form.address} onChange={update("address")} placeholder="Address for your records" />
                  </label>
                  <label>
                    <span>In memory of / on behalf of <em>(Optional)</em></span>
                    <input data-testid="donor-dedication-input" type="text" value={form.dedication} onChange={update("dedication")} placeholder="A loved one, family, or occasion" />
                  </label>
                </div>
              </div>

              {error ? (
                <p className="donation-error" data-testid="donation-error-message" role="alert">
                  {error}
                </p>
              ) : null}

              <button className="btn-solid donate-continue-btn" type="submit" data-testid="donation-submit-button" disabled={loading}>
                {loading ? "Opening payment…" : <>Continue <ArrowRight size={16} /></>}
              </button>

              <p className="donate-trust-note" data-testid="donation-payment-disclaimer">
                <Lock size={13} aria-hidden="true" />
                Secure payment processing. 80G Tax Exemption available for Indian donors.
                {isTestMode() ? <> Test card: <strong>4111 1111 1111 1111</strong>.</> : null}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
