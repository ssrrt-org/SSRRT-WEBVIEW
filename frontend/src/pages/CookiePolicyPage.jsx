import { Link } from "react-router-dom";
import { Eyebrow } from "@/components/shared/PageSections";

const essentialCookies = [
  ["session_id", "ssrrt.org", "Maintains your login session", "Session"],
  ["csrf_token", "ssrrt.org", "Prevents cross-site request forgery", "Session"],
  ["cookie_consent", "ssrrt.org", "Stores your cookie consent preferences", "1 year"],
];

const performanceCookies = [
  ["__utmz", "Google", "Tracks traffic source and campaign data", "6 months"],
  ["_hj_id", "Hotjar", "Assigns a unique ID to track user sessions", "1 year"],
  ["_hj_session", "Hotjar", "Holds current session data", "30 minutes"],
  ["NID", "Google", "Stores user preferences for performance tuning", "6 months"],
  ["perf_dv", "ssrrt.org", "Records device type for performance optimization", "Session"],
];

const analyticsCookies = [
  ["_ga", "Google Analytics", "Distinguishes unique users", "2 years"],
  ["_ga_*", "Google Analytics", "Maintains session state", "2 years"],
  ["_gid", "Google Analytics", "Distinguishes users (24-hour window)", "24 hours"],
  ["_gat", "Google Analytics", "Throttles request rate", "1 minute"],
];

const marketingCookies = [
  ["_fbp", "Meta (Facebook)", "Delivers and measures Facebook ads", "3 months"],
  ["fr", "Meta (Facebook)", "Ad delivery and frequency capping", "3 months"],
  ["_gcl_au", "Google Ads", "Conversion tracking from Google Ads", "3 months"],
  ["IDE", "Google DoubleClick", "Personalized ad targeting", "1 year"],
  ["li_fat_id", "LinkedIn", "LinkedIn ad conversion tracking", "30 days"],
];

function CookieTable({ rows }) {
  return (
    <div className="legal-table-wrap">
      <table className="legal-table">
        <thead>
          <tr>
            <th>Cookie Name</th>
            <th>Provider</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, provider, purpose, duration]) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{provider}</td>
              <td>{purpose}</td>
              <td>{duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicyPage() {
  return (
    <section className="legal-page">
      <div className="wrap legal-page-inner">
        <Eyebrow gold>Legal</Eyebrow>
        <h1>Cookie Policy</h1>
        <p className="legal-updated">Last updated: July 21, 2026</p>

        <h2>1. Introduction</h2>
        <p>
          Srimad Sai Rajarajeshwari Trust (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website{" "}
          <a href="https://ssrrt.org/">https://ssrrt.org/</a> (the &quot;Site&quot;). This Cookie Policy explains what cookies are,
          how we use them, and the choices you have regarding their use. This policy should be read alongside our{" "}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>

        <h2>2. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They allow the website to recognize your
          device and remember information about your visit. Cookies may be first-party (set by us) or third-party (set by service
          providers). They may be session cookies (deleted when you close your browser) or persistent cookies (remain for a set
          period or until deleted).
        </p>

        <h2>3. How We Use Cookies</h2>

        <h3>3.1 Essential Cookies</h3>
        <p>
          These cookies are strictly necessary for the Site to function and cannot be disabled through our preferences. Without
          them, you may be unable to access basic functions of our Website.
        </p>
        <CookieTable rows={essentialCookies} />

        <h3>3.2 Performance Cookies</h3>
        <p>
          These cookies collect aggregated, anonymous information about how visitors use our Site. They are only placed with your
          consent.
        </p>
        <CookieTable rows={performanceCookies} />

        <h3>3.3 Analytics Cookies</h3>
        <p>
          These cookies help us understand how visitors interact with our Site. They are only placed with your consent.
        </p>
        <CookieTable rows={analyticsCookies} />

        <h3>3.4 Marketing &amp; Advertising Cookies</h3>
        <p>
          These cookies track browsing activity to deliver relevant advertising and measure campaign effectiveness. They are only
          placed with your consent.
        </p>
        <CookieTable rows={marketingCookies} />

        <h2>4. Your Cookie Choices</h2>
        <h3>4.1 Cookie Consent Banner</h3>
        <p>
          When you first visit the Site, you will see a cookie consent banner. You can accept all cookies, reject non-essential
          cookies, or customize preferences by category. You may change your preferences at any time via the &quot;Cookie Settings&quot;
          link in our website footer.
        </p>
        <h3>4.2 Browser Settings</h3>
        <p>
          Most browsers allow you to control cookies through their settings. Disabling certain cookies may affect Site functionality.
        </p>
        <ul className="legal-list">
          <li>Google Chrome: Settings &gt; Privacy and Security &gt; Cookies and other site data</li>
          <li>Mozilla Firefox: Options &gt; Privacy &amp; Security &gt; Cookies and Site Data</li>
          <li>Safari: Preferences &gt; Privacy &gt; Manage Website Data</li>
          <li>Microsoft Edge: Settings &gt; Cookies and site permissions</li>
        </ul>
        <h3>4.3 Opt-Out of Analytics &amp; Performance</h3>
        <p>
          To opt out of Google Analytics, install the{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" rel="noopener noreferrer" target="_blank">
            Google Analytics Opt-out Browser Add-on
          </a>
          . To opt out of Hotjar, visit{" "}
          <a href="https://www.hotjar.com/legal/compliance/opt-out" rel="noopener noreferrer" target="_blank">
            Hotjar&apos;s opt-out page
          </a>
          .
        </p>
        <h3>4.4 Opt-Out of Advertising Cookies</h3>
        <p>You can opt out of interest-based advertising through:</p>
        <ul className="legal-list">
          <li><a href="http://optout.aboutads.info/" rel="noopener noreferrer" target="_blank">Digital Advertising Alliance (DAA)</a></li>
          <li><a href="http://optout.networkadvertising.org/" rel="noopener noreferrer" target="_blank">Network Advertising Initiative (NAI)</a></li>
          <li><a href="http://www.youronlinechoices.eu/" rel="noopener noreferrer" target="_blank">European Interactive Digital Advertising Alliance (EDAA)</a></li>
        </ul>

        <h2>5. Your Rights Under GDPR</h2>
        <p>
          If you are in the EEA, UK, or Switzerland, you may have rights of access, rectification, erasure, restriction, portability,
          objection, and withdrawal of consent. Our lawful basis for non-essential cookies is your consent. Contact us using the
          details below to exercise these rights.
        </p>

        <h2>6. Your Rights Under CCPA</h2>
        <p>
          California residents may have rights to know, delete, correct, opt out of sale/sharing, and limit use of sensitive personal
          information. Use the &quot;Do Not Sell or Share My Personal Information&quot; link in our footer to manage marketing cookie
          preferences.
        </p>

        <h2>7. Third-Party Cookies &amp; Links</h2>
        <p>
          Third-party providers set cookies under their own policies. We recommend reviewing policies from Google, Hotjar, Meta, and
          LinkedIn when those services are enabled with your consent.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          Website: <a href="https://ssrrt.org/">https://ssrrt.org/</a>
          <br />
          Email: <a href="mailto:info@ssrrt.org">info@ssrrt.org</a>
        </p>

        <h2>9. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Material changes will be reflected in the &quot;Last updated&quot; date
          above and, where appropriate, through notice on the Site.
        </p>

        <p className="legal-footer-note">© 2026 Srimad Sai Rajarajeshwari Trust. All rights reserved.</p>
      </div>
    </section>
  );
}
