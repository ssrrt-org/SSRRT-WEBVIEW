import { useState } from "react";
import { Eyebrow, SlimHead } from "@/components/shared/PageSections";
import { ArrowUpRight, CalendarDays, Check, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const nameInput = form.elements.namedItem("contact-name");
    if (nameInput instanceof HTMLInputElement) setName(nameInput.value);
    setSubmitted(true);
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
              <p>Your message has been saved in this demo. When the Trust connects its inbox, enquiries will go to the office directly.</p>
              <p className="contact-success-note">For urgent matters, please call the Ashram office when the number is published on this page.</p>
              <button type="button" className="btn-solid" data-testid="contact-new-message" onClick={() => setSubmitted(false)}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} data-testid="contact-form">
              <Eyebrow>Write to us</Eyebrow>
              <h3>Your message.</h3>
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
              <label><span>Message</span><textarea rows="4" name="contact-message" placeholder="A few lines" data-testid="contact-message"/></label>
              <button className="btn-solid" type="submit" data-testid="contact-submit">Send <ArrowUpRight size={16}/></button>
              <small>Demo form for now — messages are not sent yet.</small>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
