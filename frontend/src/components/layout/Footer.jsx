import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { templeCards } from "@/constants/templeData";
import { useBranding } from "@/context/CmsContext";

export default function Footer() {
  const branding = useBranding();
  const goshalaLinks = [
    ["Project Kaamadhenau", "/goshala"],
    ["History of Goshala", "/goshala#history"],
    ["Adopt a Cow", "/goshala/adopt"],
    ["A Day at Kaamadhenau", "/goshala/day"],
    ["Volunteer", "/volunteering"],
    ["Support & Donate", "/donate?purpose=goshala"],
  ];
  const sevaLinks = [
    ["Medical Centers", "/seva/medical"],
    ["Narayana Seva", "/seva/narayana"],
    ["Food for the Needy", "/seva/food"],
    ["Volunteering", "/volunteering"],
  ];
  const templeLinks = templeCards.slice(0, 6).map((t) => [t.name, t.path]);
  const connectLinks = [
    ["About Amma", "/mother"],
    ["About SSRRT", "/about"],
    ["Events", "/events"],
    ["Volunteering", "/volunteering"],
    ["Shoppe", "/shop"],
    ["Donate", "/donate"],
    ["Contact Us", "/contact"],
  ];
  const col = (title, items) => (
    <div className="ftr-col">
      <h4 data-testid={`footer-col-${title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>{title}</h4>
      <ul>
        {items.map(([label, path]) => (
          <li key={label}>
            <Link
              data-testid={`footer-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}-link`}
              to={path}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="site-footer">
      <div className="ftr-top">
        <div className="wrap ftr-grid">
          <div className="ftr-brand">
            <Link className="ftr-brand-head" to="/" data-testid="footer-home-link">
              <span className="ftr-logo-wrap" aria-hidden="true">
                <img src={branding.footerLogo || "/ssrrt/devi-logo.jpg"} alt="" className="ftr-logo" />
              </span>
              <div>
                <h3>Srimad Sai Rajarajeshwari Trust</h3>
                <span className="ftr-tagline">Goshala · Ashram · Seva · Karekura</span>
              </div>
            </Link>
            <p className="ftr-about">
              A rural trust devoted to the care of cows, the needy, and the consecrated spaces entrusted to it — sustained by seva and supported by devotees worldwide.
            </p>
            <p className="ftr-location">
              <MapPin size={14} aria-hidden="true" />
              <span>River Cauvery · Karekura, Mysore, Karnataka, India</span>
            </p>
            <Link className="ftr-offering" to="/donate" data-testid="footer-donate-link">
              Make an offering <ArrowUpRight size={14} />
            </Link>
          </div>
          {col("Goshala", goshalaLinks)}
          {col("Seva & Service", sevaLinks)}
          {col("Temples", templeLinks)}
          {col("Connect", connectLinks)}
        </div>
      </div>
      <div className="ftr-base">
        <div className="wrap ftr-base-inner">
          <p>© 2026 Srimad Sai Rajarajeshwari Trust, Karekura, Mysore. All rights reserved.</p>
          <p className="ftr-mantra">Om Namah Shivaya · Jai Amma · Jai Gaumata</p>
        </div>
      </div>
    </footer>
  );
}
