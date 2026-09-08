import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { COOKIE_CATEGORIES } from "@/lib/cookieConsent";

export default function CookiePreferencesPanel({ open, onClose, initialPreferences, onSave, onAcceptAll, onRejectNonEssential }) {
  const [prefs, setPrefs] = useState(initialPreferences);

  useEffect(() => {
    if (open) {
      setPrefs(initialPreferences);
    }
  }, [open, initialPreferences]);

  if (!open) return null;

  const toggle = (id) => {
    setPrefs((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <div className="cookie-modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preferences-title"
        onClick={(e) => e.stopPropagation()}
        data-testid="cookie-preferences-modal"
      >
        <div className="cookie-modal-head">
          <h2 id="cookie-preferences-title">Cookie Preferences</h2>
          <button type="button" className="cookie-modal-close" onClick={onClose} aria-label="Close cookie preferences">
            <X size={18} />
          </button>
        </div>

        <p className="cookie-modal-intro">
          https://SSRRT.org uses necessary cookies to operate this website. With your permission, we use optional analytics,
          advertising, attribution, marketing, and embedded-media technologies. See our{" "}
          <Link to="/cookie-policy">Cookie Policy</Link> and <Link to="/privacy">Privacy Policy</Link>.
        </p>

        <div className="cookie-category-list">
          {COOKIE_CATEGORIES.map((category) => (
            <div className="cookie-category" key={category.id}>
              <div className="cookie-category-head">
                <h3>{category.label}</h3>
                {category.required ? (
                  <span className="cookie-always-on">Always active</span>
                ) : (
                  <label className="cookie-toggle">
                    <input
                      type="checkbox"
                      checked={Boolean(prefs[category.id])}
                      onChange={() => toggle(category.id)}
                      data-testid={`cookie-toggle-${category.id}`}
                    />
                    <span className="cookie-toggle-ui" aria-hidden="true" />
                    <span className="sr-only">{category.label}</span>
                  </label>
                )}
              </div>
              <p>{category.description}</p>
            </div>
          ))}
        </div>

        <div className="cookie-modal-actions">
          <button type="button" className="btn-ghost-dark cookie-btn" onClick={onRejectNonEssential} data-testid="cookie-reject">
            Reject Non-Essential
          </button>
          <button type="button" className="btn-ghost-dark cookie-btn" onClick={() => onSave(prefs)} data-testid="cookie-save">
            Save Preferences
          </button>
          <button type="button" className="btn-solid cookie-btn" onClick={onAcceptAll} data-testid="cookie-accept-all">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
