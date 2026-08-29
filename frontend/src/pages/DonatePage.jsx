import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { Eyebrow } from "@/components/shared/PageSections";
import { goshalaSupportTitle } from "@/constants/goshalaContent";
import { donationPurposes, donatePurposeFromQuery } from "@/constants/nav";
import { useDonateConfig } from "@/context/CmsContext";
import { docExcerpt } from "@/lib/docContent";
import {
  createOrder,
  isRazorpayConfigured,
  isTestMode,
  loadRazorpayScript,
  openRazorpayCheckout,
  rupeesToPaise,
  verifyPayment,
} from "@/utils/razorpay";

const donateIntro = docExcerpt("goshala_support", { skip: 1, maxLen: 220 });

export default function DonatePage() {
  const donateConfig = useDonateConfig();
  const purposeOptions = donateConfig.purposes?.map((item) => item.label) || donationPurposes;
  const [searchParams] = useSearchParams();
  const purposeKey = searchParams.get("purpose");
  const [form, setForm] = useState({ donor_name: "", email: "", phone: "", pan: "", address: "", dedication: "" });
  const [purpose, setPurpose] = useState(purposeOptions[0]);
  const [amount, setAmount] = useState("");
  const [recurring, setRecurring] = useState(false);
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
              recurring,
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
    <section className="split-page donate-simple">
      <div className="wrap split-page-grid">
        <header className="split-page-intro">
          <Eyebrow gold>Donate</Eyebrow>
          <h1>{goshalaSupportTitle || "Make an offering"}</h1>
          {donateIntro ? <p>{donateIntro}</p> : null}
        </header>

        <div className="split-page-panel donate-form-card">
          {submitted ? (
            <div className="donate-success" data-testid="donation-success-message">
              <div className="success-icon"><Check /></div>
              <Eyebrow>Offering received</Eyebrow>
              <h3>Thank you, {form.donor_name}.</h3>
              <p>
                Your offering of ₹{Number(amount).toLocaleString("en-IN")} toward {purpose} has been received.
              </p>
              <button type="button" className="btn-solid" data-testid="new-donation-button" onClick={() => setSubmitted(false)}>
                Make another offering
              </button>
            </div>
          ) : (
            <form className="donate-form donate-form-compact" data-testid="donation-form" onSubmit={submit}>
              <div className="form-label">Choose a purpose</div>
              <div className="purpose-grid purpose-grid-compact">
                {purposeOptions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    data-testid={`purpose-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-button`}
                    className={purpose === item ? "purpose active" : "purpose"}
                    onClick={() => setPurpose(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <label className="donate-amount-field">
                <span className="form-label">Offering amount</span>
                <div className="custom-amount custom-amount-full">
                  <span>₹</span>
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
              </label>

              <label className="recurring recurring-compact">
                <input data-testid="recurring-toggle" type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
                <span>
                  <strong>Monthly offering</strong>
                  <small>Ongoing Goshala care</small>
                </span>
              </label>

              <div className="form-fields form-fields-compact">
                {[
                  ["donor_name", "Name", "Your full name", true],
                  ["email", "Email", "you@example.com", true],
                  ["phone", "Phone", "+91", true],
                  ["pan", "PAN", "ABCDE1234F", false],
                  ["address", "Address", "Address for your records", true],
                  ["dedication", "In memory of / on behalf of", "A loved one, family, or occasion", false],
                ].map(([key, label, placeholder, required], index) => (
                  <label className={index > 3 ? "full" : ""} key={key}>
                    <span>{label}</span>
                    {key === "address" ? (
                      <textarea
                        data-testid="donor-address-input"
                        required={required}
                        value={form[key]}
                        onChange={update(key)}
                        placeholder={placeholder}
                        rows="2"
                      />
                    ) : (
                      <input
                        data-testid={key === "donor_name" ? "donor-name-input" : `donor-${key}-input`}
                        required={required}
                        type={key === "email" ? "email" : "text"}
                        value={form[key]}
                        onChange={update(key)}
                        placeholder={placeholder}
                      />
                    )}
                  </label>
                ))}
              </div>

              {error ? (
                <p className="donation-error" data-testid="donation-error-message" role="alert">
                  {error}
                </p>
              ) : null}

              <button className="btn-solid donate-submit" type="submit" data-testid="donation-submit-button" disabled={loading}>
                {loading ? "Opening payment…" : <>Continue with ₹{Number(amount || 0).toLocaleString("en-IN")} <ArrowUpRight size={16} /></>}
              </button>

              <p className="demo-disclaimer" data-testid="donation-payment-disclaimer">
                Secure payment via Razorpay
                {isTestMode() ? (
                  <> · Test card <strong>4111 1111 1111 1111</strong></>
                ) : null}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
