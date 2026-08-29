import { useState } from "react";
import { Eyebrow, SlimHead } from "@/components/shared/PageSections";
import { ArrowUpRight, CalendarDays, Check, Mail, MapPin, Phone } from "lucide-react";
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
    const contactPhone = String(formData.get("contact-phone") || "");
    const contactPurpose = String(formData.get("contact-purpose") || "");
    const contactMessage = String(formData.get("contact-message") || "");

    try {
      await submitInboxMessage({
        type: "Contact",
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
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
        title="Trust office · Karekura."
      />
      <section className="contact-section-v2">
        <div className="wrap contact-grid-v2">
          <div className="contact-info">
            <Eyebrow gold>Details</Eyebrow>
            <h2>How to reach us.</h2>
            <p>Visit timings change with the season. The office will tell you what is open on the day you plan to come.</p>
            <ul>
              <li><MapPin/><div><strong>Address</strong><span>Karekura, Mysore, Karnataka, India</span></div></li>
              <li><Phone/><div><strong>Phone</strong><span>Ask the office for the current number</span></div></li>
              <li><Mail/><div><strong>Enquiries</strong><span>Volunteering, seva, donations</span></div></li>
              <li><CalendarDays/><div><strong>Timings</strong><span>Confirmed by the office</span></div></li>
            </ul>
          </div>
          {submitted ? (
            <div className="contact-form contact-form-success" data-testid="contact-success">
              <div className="success-icon"><Check /></div>
              <Eyebrow>Message recorded</Eyebrow>
              <h3>Thank you{name ? `, ${name}` : ""}.</h3>
              <p>Your message has been sent to the Trust office. Someone will respond by email when they can.</p>
              <p className="contact-success-note">For urgent matters, please call the Ashram office when the number is published on this page.</p>
              <button type="button" className="btn-solid" data-testid="contact-new-message" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
              <Eyebrow>Write to us</Eyebrow>
              <h3>Your message.</h3>
              {error ? <p className="donation-error" role="alert">{error}</p> : null}
              <label><span>Name</span><input required type="text" name="contact-name" placeholder="Full name" data-testid="contact-name"/></label>
              <label><span>Email</span><input required type="email" name="contact-email" placeholder="you@example.com" data-testid="contact-email"/></label>
              <label><span>Phone</span><input type="tel" name="contact-phone" placeholder="+91" data-testid="contact-phone"/></label>
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
