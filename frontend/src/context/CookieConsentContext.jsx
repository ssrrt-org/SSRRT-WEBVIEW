import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  acceptAllConsent,
  getStoredConsent,
  hasConsentDecision,
  rejectNonEssentialConsent,
  saveConsent,
} from "@/lib/cookieConsent";

const CookieConsentContext = createContext(null);

export function CookieConsentProvider({ children }) {
  const [consent, setConsent] = useState(getStoredConsent);
  const [bannerOpen, setBannerOpen] = useState(() => !hasConsentDecision());
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const applyConsent = useCallback((preferences) => {
    const next = saveConsent(preferences);
    setConsent(next);
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    setConsent(acceptAllConsent());
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  const rejectNonEssential = useCallback(() => {
    setConsent(rejectNonEssentialConsent());
    setBannerOpen(false);
    setPreferencesOpen(false);
  }, []);

  const openCookieSettings = useCallback(() => {
    setPreferencesOpen(true);
  }, []);

  const closeCookieSettings = useCallback(() => {
    setPreferencesOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      consent,
      bannerOpen,
      preferencesOpen,
      acceptAll,
      rejectNonEssential,
      applyConsent,
      openCookieSettings,
      closeCookieSettings,
    }),
    [consent, bannerOpen, preferencesOpen, acceptAll, rejectNonEssential, applyConsent, openCookieSettings, closeCookieSettings],
  );

  return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
