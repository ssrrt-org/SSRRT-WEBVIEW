import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { DEFAULT_ADMIN_EMAIL } from "@/admin/adminAuth";
import { adminSeed } from "@/admin/adminSeed";
import { buildPageImageDefaults } from "@/constants/pageImageCatalog";
import { heroImageForPath } from "@/constants/heroImages";
import { db } from "@/lib/firebase";
import { isUsableImageUrl } from "@/lib/utils";

export const CMS_SITE_DOC = ["cms", "site"];
export const DONATIONS_COLLECTION = "donations";
export const INBOX_COLLECTION = "inbox";
export const ADMINS_COLLECTION = "admins";

const SITE_FIELDS = [
  "branding",
  "homeCarousel",
  "heroes",
  "pageImages",
  "products",
  "events",
  "formation",
  "donate",
  "orders",
  "devoteeStories",
];

export function mergeCmsData(remote = {}) {
  const merged = structuredClone(adminSeed);
  for (const key of SITE_FIELDS) {
    if (remote[key] !== undefined) {
      merged[key] = remote[key];
    }
  }
  if (Array.isArray(remote.donations)) {
    merged.donations = remote.donations;
  }
  if (Array.isArray(remote.inbox)) {
    merged.inbox = remote.inbox;
  }
  merged.heroes = normalizeAshramHeroes(merged.heroes || {});
  merged.pageImages = normalizePageImages(merged.pageImages, merged.heroes);
  return merged;
}

/** Firebase may still store the old Concentratedspace1–10 temple mapping; prefer catalog defaults. */
function isStaleBundledAshramAsset(url) {
  if (!url || typeof url !== "string") return false;
  return /\/Concentratedspace\/Concentratedspace\d+\.(jpg|jpeg|JPG)$/i.test(url.trim());
}

function resolveAshramSlotImage(remoteVal, defaultVal) {
  const remote = remoteVal && isUsableImageUrl(remoteVal) ? remoteVal.trim() : "";
  const fallback = defaultVal && isUsableImageUrl(defaultVal) ? defaultVal.trim() : defaultVal || "";
  if (!remote) return fallback;
  if (isStaleBundledAshramAsset(remote) && fallback) return fallback;
  // CMS may still point at legacy /ssrrt or stock photos; catalog now uses /god per sannidhi.
  if (fallback.includes("/god/") && remote !== fallback && !remote.includes("/god/")) {
    return fallback;
  }
  return remote;
}

function normalizeAshramHeroes(heroes = {}) {
  const next = { ...heroes };
  for (const [path, hero] of Object.entries(heroes)) {
    if (!path.startsWith("/ashram") || !hero?.image) continue;
    const image = hero.image.trim();
    const replacement = heroImageForPath(path);
    const useReplacement =
      replacement &&
      isUsableImageUrl(replacement) &&
      (isStaleBundledAshramAsset(image) ||
        (replacement.includes("/god/") && image !== replacement && !image.includes("/god/")));
    if (useReplacement) {
      next[path] = { ...hero, image: replacement.trim() };
    }
  }
  return next;
}

function normalizePageImages(pageImages = {}, heroes = {}) {
  const defaults = buildPageImageDefaults();
  const next = {};

  for (const [path, defaultSlots] of Object.entries(defaults)) {
    const remoteSlots = pageImages[path] || {};
    const merged = {};
    const slotIds = new Set([...Object.keys(defaultSlots), ...Object.keys(remoteSlots)]);

    for (const slotId of slotIds) {
      const defaultVal = defaultSlots[slotId] ?? "";
      const remoteVal = remoteSlots[slotId];
      if (path.startsWith("/ashram")) {
        merged[slotId] = resolveAshramSlotImage(remoteVal, defaultVal);
      } else if (remoteVal && isUsableImageUrl(remoteVal)) {
        merged[slotId] = remoteVal.trim();
      } else {
        merged[slotId] = defaultVal;
      }
    }
    next[path] = merged;
  }

  for (const [path, hero] of Object.entries(heroes)) {
    if (!next[path]) next[path] = {};
    const heroImage = hero?.image && isUsableImageUrl(hero.image) ? hero.image.trim() : "";
    if (heroImage && !next[path].hero) {
      next[path].hero = path.startsWith("/ashram")
        ? resolveAshramSlotImage(heroImage, next[path].hero || defaults[path]?.hero || heroImageForPath(path))
        : heroImage;
    }
  }

  return next;
}

export function sitePayloadFromCms(data) {
  const payload = {};
  for (const key of SITE_FIELDS) {
    if (data[key] !== undefined) {
      payload[key] = data[key];
    }
  }
  return payload;
}

export async function ensureCmsSeeded() {
  const siteRef = doc(db, ...CMS_SITE_DOC);
  const snap = await getDoc(siteRef);
  if (snap.exists()) {
    return false;
  }
  await setDoc(siteRef, {
    ...sitePayloadFromCms(adminSeed),
    updatedAt: serverTimestamp(),
  });
  return true;
}

export function subscribeCms(onData, onError, { includePrivate = true } = {}) {
  let siteData = sitePayloadFromCms(adminSeed);
  let donations = [];
  let inbox = [];

  const emit = () => {
    onData(mergeCmsData({ ...siteData, donations, inbox }));
  };

  const unsubSite = onSnapshot(
    doc(db, ...CMS_SITE_DOC),
    (snap) => {
      siteData = snap.exists() ? snap.data() : sitePayloadFromCms(adminSeed);
      emit();
    },
    onError,
  );

  if (!includePrivate) {
    emit();
    return unsubSite;
  }

  const unsubDonations = onSnapshot(
    query(collection(db, DONATIONS_COLLECTION), orderBy("date", "desc")),
    (snap) => {
      donations = snap.docs.map((item) => item.data());
      emit();
    },
    onError,
  );

  const unsubInbox = onSnapshot(
    query(collection(db, INBOX_COLLECTION), orderBy("createdAt", "desc")),
    (snap) => {
      inbox = snap.docs
        .map((item) => ({ id: item.id, ...item.data() }))
        .filter((item) => !item.archived);
      emit();
    },
    onError,
  );

  return () => {
    unsubSite();
    unsubDonations();
    unsubInbox();
  };
}

export async function saveCmsSite(data) {
  const siteRef = doc(db, ...CMS_SITE_DOC);
  await setDoc(
    siteRef,
    {
      ...sitePayloadFromCms(data),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

export async function checkAdminUser(uid) {
  if (!uid) {
    return { authorized: false, reason: "no-uid" };
  }
  try {
    const snap = await withTimeout(
      getDoc(doc(db, ADMINS_COLLECTION, uid)),
      8000,
      "Admin check timed out. Deploy Firestore rules and confirm the database exists.",
    );
    if (snap.exists()) {
      return { authorized: true, uid };
    }
    return { authorized: false, reason: "no-doc", uid };
  } catch (error) {
    if (error?.code === "permission-denied") {
      return { authorized: false, reason: "rules", uid };
    }
    if (error?.message?.includes("timed out")) {
      return { authorized: false, reason: "timeout", uid, message: error.message };
    }
    return { authorized: false, reason: "error", uid, message: error?.message };
  }
}

export async function isAdminUser(uid) {
  const result = await checkAdminUser(uid);
  return result.authorized;
}

/** First-time bootstrap for the default admin email (rules must allow this). */
export async function bootstrapAdminUser(user) {
  if (!user?.uid || !user?.email) {
    return { ok: false, error: "Missing user." };
  }
  if (user.email.toLowerCase() !== DEFAULT_ADMIN_EMAIL.toLowerCase()) {
    return { ok: false, error: "This email cannot self-bootstrap." };
  }
  try {
    await withTimeout(
      setDoc(doc(db, ADMINS_COLLECTION, user.uid), {
        email: user.email,
        role: "admin",
        createdAt: serverTimestamp(),
      }),
      8000,
      "Bootstrap timed out. Deploy Firestore rules first.",
    );
    return { ok: true };
  } catch (error) {
    return { ok: false, error: error?.message || "Bootstrap failed." };
  }
}

export async function ensureAdminAccess(user) {
  const check = await checkAdminUser(user.uid);
  if (check.authorized) {
    return { ok: true };
  }

  if (user.email?.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase()) {
    const boot = await bootstrapAdminUser(user);
    if (boot.ok) {
      return { ok: true };
    }
    return {
      ok: false,
      uid: user.uid,
      reason: boot.error?.includes("timed out") ? "timeout" : "rules",
      error: boot.error || adminAccessError(check),
    };
  }

  return {
    ok: false,
    uid: user.uid,
    reason: check.reason,
    error: adminAccessError(check),
  };
}

function withTimeout(promise, ms, message) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      window.setTimeout(() => reject(new Error(message)), ms);
    }),
  ]);
}

function adminAccessError(check) {
  if (check.reason === "rules") {
    return "Firestore rules are blocking admin access. Deploy firestore.rules (firebase deploy --only firestore:rules).";
  }
  if (check.reason === "timeout") {
    return check.message || "Connection to Firestore timed out. Check that Firestore is enabled in Firebase Console.";
  }
  if (check.reason === "no-doc") {
    return `No admins/${check.uid} document found. Create it in Firestore or sign in as ${DEFAULT_ADMIN_EMAIL} to auto-bootstrap.`;
  }
  return "This account is not authorised for admin access.";
}
