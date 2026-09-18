import { Eyebrow } from "@/components/shared/PageSections";
import { Mail } from "lucide-react";

const TRUST_EMAIL = "admin@ssrt.com.org";

export default function ContactPage() {
  return (
    <section className="split-page contact-simple contact-email-only">
      <div className="wrap split-page-grid">
        <header className="split-page-intro">
          <Eyebrow>Contact</Eyebrow>
          <h1>Write to the Trust office</h1>
          <p>
            The office is staffed for email only. Please send your message in writing — we are not able to take
            phone calls at this time.
          </p>
        </header>

        <div className="split-page-panel contact-email-card">
          <Mail size={28} aria-hidden="true" />
          <p className="contact-email-label">Email</p>
          <a className="contact-email-link" href={`mailto:${TRUST_EMAIL}`} data-testid="contact-email-link">
            {TRUST_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
