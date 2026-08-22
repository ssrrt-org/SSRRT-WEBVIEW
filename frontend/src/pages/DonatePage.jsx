import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpRight, Check, Heart } from "lucide-react";
import { Eyebrow, SlimHead } from "@/components/shared/PageSections";
import { donationPurposes, donatePurposeFromQuery } from "@/constants/nav";
import { recordDonationLocal } from "@/lib/donations";
import {
  createOrder,
  loadRazorpayScript,
  openRazorpayCheckout,
  rupeesToPaise,
  verifyPayment,
} from "@/utils/razorpay";

export default function DonatePage() {
  const [searchParams] = useSearchParams();
  const purposeKey = searchParams.get("purpose");
  const [form, setForm] = useState({ donor_name: "", email: "", phone: "", pan: "", address: "", dedication: "" });
  const [purpose, setPurpose] = useState(donationPurposes[0]);
  const [amount, setAmount] = useState("1101");
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
            recordDonationLocal({
              id: response.razorpay_payment_id,
              name: form.donor_name,
              email: form.email,
              phone: form.phone,
              pan: form.pan,
              address: form.address,
              dedication: form.dedication,
              purpose,
              amount: amountInRupees,
              recurring,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              date: new Date().toISOString(),
              status: "Received",
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
      setError(checkoutError.message || "Unable to start payment. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <SlimHead
        eyebrow="Donate"
        title="Make an offering."
      />
      <main className="inner-page donation-page">
        <div className="wrap donate-grid">
          <div className="donate-intro">
            <Eyebrow>Before you continue</Eyebrow>
            <h2>Offer with care and devotion.</h2>
            <p>Your offering supports the Goshala, ashram seva, and community upliftment at SSRRT. Payments are processed securely through Razorpay.</p>
            <div className="donate-note">
              <Heart size={18}/>
              <span>All offerings are received with gratitude. A receipt will be shared by the Trust office where applicable.</span>
            </div>
          </div>
          <div className="donate-form-wrap">
            {submitted ? (
              <div className="success-state" data-testid="donation-success-message">
                <div className="success-icon"><Check/></div>
                <Eyebrow>Offering received</Eyebrow>
                <h3>Thank you, {form.donor_name}.</h3>
                <p>Your offering of ₹{Number(amount).toLocaleString("en-IN")} toward {purpose} has been received.</p>
                <button className="btn btn-dark" data-testid="new-donation-button" onClick={() => setSubmitted(false)}>Make another offering</button>
              </div>
            ) : (
              <form data-testid="donation-form" onSubmit={submit}>
                <div className="form-label">Choose a purpose</div>
                <div className="purpose-grid">
                  {donationPurposes.map((item) => (
                    <button type="button" key={item} data-testid={`purpose-${item.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-button`} className={purpose === item ? "purpose active" : "purpose"} onClick={() => setPurpose(item)}>{item}</button>
                  ))}
                </div>
                <div className="form-label">Offering amount</div>
                <div className="amount-row">
                  {[501, 1101, 2100, 5000].map((value) => (
                    <button type="button" key={value} data-testid={`amount-${value}-button`} className={String(value) === amount ? "amount-chip active" : "amount-chip"} onClick={() => setAmount(String(value))}>₹{value.toLocaleString("en-IN")}</button>
                  ))}
                  <label className="custom-amount">
                    <span>₹</span>
                    <input data-testid="custom-amount-input" type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} aria-label="Custom offering amount"/>
                  </label>
                </div>
                <label className="recurring">
                  <input data-testid="recurring-toggle" type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)}/>
                  <span><strong>Make this a monthly offering</strong><small>Useful for ongoing Goshala care</small></span>
                </label>
                <div className="form-fields">
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
                        <textarea data-testid="donor-address-input" required={required} value={form[key]} onChange={update(key)} placeholder={placeholder} rows="2"/>
                      ) : (
                        <input data-testid={key === "donor_name" ? "donor-name-input" : `donor-${key}-input`} required={required} type={key === "email" ? "email" : "text"} value={form[key]} onChange={update(key)} placeholder={placeholder}/>
                      )}
                    </label>
                  ))}
                </div>
                {error ? (
                  <p className="donation-error" data-testid="donation-error-message" role="alert">{error}</p>
                ) : null}
                <button className="btn btn-primary form-submit" data-testid="donation-submit-button" disabled={loading}>
                  {loading ? "Opening payment..." : <>Continue with ₹{Number(amount || 0).toLocaleString("en-IN")} <ArrowUpRight size={16}/></>}
                </button>
                <p className="demo-disclaimer" data-testid="donation-payment-disclaimer">Secure payment via Razorpay</p>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
