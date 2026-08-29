import { useState } from "react";
import { Eyebrow, SlimHead } from "@/components/shared/PageSections";
import { ArrowUpRight, Check } from "lucide-react";
import { submitInboxMessage } from "@/lib/inbox";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    const form = e.target;
    const formData = new FormData(form);
    const contactName = String(formData.get("contact-name") || "");
    const contactEmail = String(formData.get("contact-email") || "");
    const contactPurpose = String(formData.get("contact-purpose") || "");
    const contactMessage = String(formData.get("contact-message") || "");

    try {
      await submitInboxMessage({
        type: "Contact",
        name: contactName,
        email: contactEmail,
        purpose: contactPurpose,
        message: contactMessage,
      });
      setName(contactName);
      setSubmitted(true);
      form.reset();
    } catch (submitError) {
      setError(submitError.message || "Unable to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SlimHead
        eyebrow="Contact"
        title="Write to the Trust office."
      />
      <section className="contact-section-v2">
        <div className="wrap contact-form-only">
          {submitted ? (
            <div className="contact-form contact-form-success" data-testid="contact-success">
              <div className="success-icon"><Check /></div>
              <Eyebrow>Message recorded</Eyebrow>
              <h3>Thank you{name ? `, ${name}` : ""}.</h3>
              <p>Your message has been sent to the Trust office. Someone will respond by email when they can.</p>
              <button type="button" className="btn-solid" data-testid="contact-new-message" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
              <Eyebrow>Your details</Eyebrow>
              <h3>Send a message.</h3>
              {error ? <p className="donation-error" role="alert">{error}</p> : null}
              <label><span>Name</span><input required type="text" name="contact-name" placeholder="Full name" data-testid="contact-name"/></label>
              <label><span>Email</span><input required type="email" name="contact-email" placeholder="you@example.com" data-testid="contact-email"/></label>
              <label><span>Regarding</span>
                <select data-testid="contact-purpose" name="contact-purpose" defaultValue="visit">
                  <option value="visit">Planning a visit</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="donate">Donation</option>
                  <option value="seva">Seva booking</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label><span>Message</span><textarea required rows="4" name="contact-message" placeholder="A few lines" data-testid="contact-message"/></label>
              <button className="btn-solid" type="submit" data-testid="contact-submit" disabled={submitting}>
                {submitting ? "Sending…" : <>Send <ArrowUpRight size={16}/></>}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
