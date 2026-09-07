import { Link } from "react-router-dom";
import { Eyebrow } from "@/components/shared/PageSections";

export default function PrivacyPolicyPage() {
  return (
    <section className="legal-page">
      <div className="wrap legal-page-inner">
        <Eyebrow gold>Legal</Eyebrow>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: July 21, 2026</p>

        <p>
          Srimad Sai Rajarajeshwari Trust (&quot;SSRRT,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy.
          This Privacy Policy explains how we collect, use, and protect personal information when you visit{" "}
          <a href="https://ssrrt.org/">https://ssrrt.org/</a>, contact the Trust office, make a donation, volunteer, or use our
          online services.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect information you provide directly, such as your name, email address, phone number, postal address, donation
          details, and messages sent through our contact forms. We may also collect technical information such as browser type,
          device information, and pages visited when you consent to analytics or performance cookies.
        </p>

        <h2>How We Use Information</h2>
        <ul className="legal-list">
          <li>To respond to enquiries and provide Trust services</li>
          <li>To process donations and maintain records you request</li>
          <li>To improve our website and communications</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>Cookies</h2>
        <p>
          We use essential cookies to operate the Site and optional cookies only with your consent. Please see our{" "}
          <Link to="/cookie-policy">Cookie Policy</Link> for details and to manage your preferences.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have rights to access, correct, delete, or restrict use of your personal information,
          and to withdraw consent for optional cookies at any time. California residents may opt out of sale or sharing of personal
          information for cross-context behavioral advertising through our footer link.
        </p>

        <h2>Contact</h2>
        <p>
          Email: <a href="mailto:info@ssrrt.org">info@ssrrt.org</a>
          <br />
          Website: <a href="https://ssrrt.org/">https://ssrrt.org/</a>
          <br />
          <Link to="/contact">Contact the Trust office</Link>
        </p>
      </div>
    </section>
  );
}
