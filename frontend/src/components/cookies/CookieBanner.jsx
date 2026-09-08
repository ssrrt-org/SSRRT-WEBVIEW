import { Link } from "react-router-dom";
import { useCookieConsent } from "@/context/CookieConsentContext";
import CookiePreferencesPanel from "@/components/cookies/CookiePreferencesPanel";

export default function CookieBanner() {
  const {
    consent,
    bannerOpen,
    preferencesOpen,
    acceptAll,
    rejectNonEssential,
    applyConsent,
    openCookieSettings,
    closeCookieSettings,
  } = useCookieConsent();

  return (
    <>
      {bannerOpen ? (
        <div className="cookie-banner" role="dialog" aria-labelledby="cookie-banner-title" data-testid="cookie-banner">
          <div className="wrap cookie-banner-inner">
            <div className="cookie-banner-copy">
              <h2 id="cookie-banner-title">Cookie Preferences</h2>
              <p>
                https://SSRRT.org uses necessary cookies to operate this website. With your permission, we use optional
                analytics, advertising, attribution, marketing, and embedded-media technologies. Click &quot;Accept All&quot; to
                allow optional cookies or &quot;Reject Non-Essential&quot; to block optional cookies. See our{" "}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>
            <div className="cookie-banner-actions">
              <button type="button" className="btn-ghost-dark cookie-btn" onClick={openCookieSettings} data-testid="cookie-customize">
                Customize
              </button>
              <button type="button" className="btn-ghost-dark cookie-btn" onClick={rejectNonEssential} data-testid="cookie-reject-banner">
                Reject Non-Essential
              </button>
              <button type="button" className="btn-solid cookie-btn" onClick={acceptAll} data-testid="cookie-accept-banner">
                Accept All
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <CookiePreferencesPanel
        open={preferencesOpen}
        onClose={closeCookieSettings}
        initialPreferences={consent}
        onSave={applyConsent}
        onAcceptAll={acceptAll}
        onRejectNonEssential={rejectNonEssential}
      />
    </>
  );
}
