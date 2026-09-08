import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useCookieConsent } from "@/context/CookieConsentContext";
import { trackPageView } from "@/lib/firebase";

export default function AnalyticsTracker() {
  const { pathname } = useLocation();
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (!consent.analytics) {
      return;
    }
    trackPageView(pathname);
  }, [pathname, consent.analytics]);

  return null;
}
