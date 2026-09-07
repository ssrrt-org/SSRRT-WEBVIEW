const STORAGE_KEY = "cookie_consent";
const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

export const DEFAULT_CONSENT = {
  essential: true,
  analytics: false,
  performance: false,
  marketing: false,
};

export const COOKIE_CATEGORIES = [
  {
    id: "essential",
    label: "Essential cookies",
    required: true,
    description:
      "Essential cookies are used to allow your request to access our Website, to move between pages, and to receive services you have requested. They cannot be turned off via our preferences. Without them, basic functions of the site may not work.",
  },
  {
    id: "analytics",
    label: "Analytics cookies",
    required: false,
    description:
      "Analytics cookies collect information about how visitors interact with our Website. They help us understand user behavior, preferences, and engagement patterns so we can improve our digital services.",
  },
  {
    id: "performance",
    label: "Performance cookies",
    required: false,
    description:
      "Performance cookies help measure and enhance site performance. They collect aggregated, anonymized information about navigation, time on pages, errors, and interactions such as clicks or scroll behavior.",
  },
  {
    id: "marketing",
    label: "Marketing cookies",
    required: false,
    description:
      "Marketing cookies deliver adverts more relevant to you and your interests. They may limit how often you see an advertisement and help measure advertising effectiveness. Information may be shared with marketing partners.",
  },
];

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function hasConsentDecision() {
  const stored = readStorage();
  return Boolean(stored?.decidedAt);
}

export function getStoredConsent() {
  const stored = readStorage();
  if (!stored?.preferences) {
    return { ...DEFAULT_CONSENT, decidedAt: null };
  }
  return {
    essential: true,
    analytics: Boolean(stored.preferences.analytics),
    performance: Boolean(stored.preferences.performance),
    marketing: Boolean(stored.preferences.marketing),
    decidedAt: stored.decidedAt || null,
  };
}

export function saveConsent(preferences) {
  const payload = {
    decidedAt: new Date().toISOString(),
    preferences: {
      essential: true,
      analytics: Boolean(preferences.analytics),
      performance: Boolean(preferences.performance),
      marketing: Boolean(preferences.marketing),
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  document.cookie = `cookie_consent=${encodeURIComponent(JSON.stringify(payload.preferences))};path=/;max-age=${Math.floor(CONSENT_MAX_AGE_MS / 1000)};SameSite=Lax`;
  return getStoredConsent();
}

export function acceptAllConsent() {
  return saveConsent({ analytics: true, performance: true, marketing: true });
}

export function rejectNonEssentialConsent() {
  return saveConsent({ analytics: false, performance: false, marketing: false });
}

export function isCategoryAllowed(category, consent = getStoredConsent()) {
  if (category === "essential") return true;
  return Boolean(consent?.[category]);
}
