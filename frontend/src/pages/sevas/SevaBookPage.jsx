import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, Check, Lock } from "lucide-react";
import { Eyebrow } from "@/components/shared/PageSections";
import { ashramRituals } from "@/constants/sevasRituals";
import { submitSevaBooking } from "@/lib/sevaBooking";
import NotFoundPage from "@/pages/NotFoundPage";
import {
  createOrder,
  isRazorpayConfigured,
  isTestMode,
  loadRazorpayScript,
  openRazorpayCheckout,
  rupeesToPaise,
  verifyPayment,
} from "@/utils/razorpay";

const DEFAULT_AMOUNT_INR = 501;

export default function SevaBookPage() {
  const { ritualId } = useParams();
  const ritual = ashramRituals.find((r) => r.id === ritualId);
  const [form, setForm] = useState({
    name: "",
    email: "",
    seva_date: "",
    gotra: "",
    nakshatra: "",
    headcount: "1",
    additional_names: "",
    comments: "",
  });
  const [amount, setAmount] = useState(String(DEFAULT_AMOUNT_INR));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!ritual) return <NotFoundPage />;

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
    setLoading(true);

    if (!isRazorpayConfigured()) {
      setError("Payment gateway is not configured. Add REACT_APP_RAZORPAY_KEY_ID to frontend/.env.");
      setLoading(false);
      return;
    }

    const purpose = `Seva · ${ritual.title}`;

    try {
      await loadRazorpayScript();
      const order = await createOrder(amountInPaise, `seva_${ritual.id}_${Date.now()}`);

      openRazorpayCheckout({
        order,
        donor: { donor_name: form.name, email: form.email, phone: "", pan: "", address: "", dedication: "" },
        purpose,
        amountInRupees,
        onSuccess: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              donor: { donor_name: form.name, email: form.email },
              purpose,
              amount: amountInRupees,
              recurring: false,
            });
            try {
              await submitSevaBooking({
                ritualId: ritual.id,
                ritualTitle: ritual.title,
                paymentId: response.razorpay_payment_id,
                ...form,
                amount: amountInRupees,
              });
            } catch (bookingError) {
              console.warn("Seva booking log failed after payment", bookingError);
            }
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
      setError(checkoutError.message || "Unable to start payment.");
      setLoading(false);
    }
  };

  return (
    <>
      <section className="mother-subhead">
        <div className="wrap">
          <Eyebrow gold>Book the Seva</Eyebrow>
          <h1>{ritual.title}</h1>
          <p className="mother-subhead-intro">{ritual.intro}</p>
        </div>
      </section>

      <section className="donate-page seva-book-page">
        <div className="wrap donate-page-inner">
          <div className="donate-card">
            {submitted ? (
              <div className="donate-success" data-testid="seva-booking-success">
                <div className="success-icon"><Check /></div>
                <Eyebrow>Seva booked</Eyebrow>
                <h3>Thank you, {form.name}.</h3>
                <p>
                  Your booking for <strong>{ritual.title}</strong> on{" "}
                  <strong>{form.seva_date}</strong> is confirmed. A confirmation email will be sent to you and the
                  Trust office. Prasadam will be shared after the seva is performed.
                </p>
                <Link className="btn-solid donate-continue-btn" to="/sevas">
                  Back to Ashram sevas
                </Link>
              </div>
            ) : (
              <form className="donate-card-form" data-testid="seva-booking-form" onSubmit={submit}>
                <div className="donate-block">
                  <h2 className="donate-block-label">Seva details</h2>
                  <div className="donate-details-grid donate-details-inline">
                    <label>
                      <span>Name</span>
                      <input required type="text" value={form.name} onChange={update("name")} placeholder="Full name" />
                    </label>
                    <label>
                      <span>Preferred seva date</span>
                      <input required type="date" value={form.seva_date} onChange={update("seva_date")} />
                    </label>
                    <label>
                      <span>Email</span>
                      <input required type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" />
                    </label>
                    <label>
                      <span>Gotra <em>(optional)</em></span>
                      <input type="text" value={form.gotra} onChange={update("gotra")} placeholder="Family gotra" />
                    </label>
                    <label>
                      <span>Nakshatra <em>(optional)</em></span>
                      <input type="text" value={form.nakshatra} onChange={update("nakshatra")} placeholder="Birth star" />
                    </label>
                    <label>
                      <span>Number of people</span>
                      <input required type="number" min="1" value={form.headcount} onChange={update("headcount")} />
                    </label>
                    <label className="full">
                      <span>Additional names <em>(families sharing one gotra)</em></span>
                      <textarea
                        rows={3}
                        value={form.additional_names}
                        onChange={update("additional_names")}
                        placeholder="List other devotees included in this booking"
                      />
                    </label>
                    <label className="full">
                      <span>Comments</span>
                      <textarea rows={3} value={form.comments} onChange={update("comments")} placeholder="Any notes for the office" />
                    </label>
                  </div>
                </div>

                <div className="donate-block donate-block-amount">
                  <h2 className="donate-block-label">Offering amount</h2>
                  <div className="donate-amount-input">
                    <span className="donate-amount-symbol">₹</span>
                    <input
                      type="number"
                      min="1"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      aria-label="Offering amount"
                    />
                  </div>
                </div>

                {error ? <p className="donation-error" role="alert">{error}</p> : null}

                <button className="btn-solid donate-continue-btn" type="submit" disabled={loading}>
                  {loading ? "Opening payment…" : <>Continue to payment <ArrowRight size={16} /></>}
                </button>

                <p className="donate-trust-note">
                  <Lock size={13} aria-hidden="true" />
                  Secure payment processing. Confirmation emails go to admin@ssrt.com.org and your address.
                  {isTestMode() ? <> Test card: <strong>4111 1111 1111 1111</strong>.</> : null}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
