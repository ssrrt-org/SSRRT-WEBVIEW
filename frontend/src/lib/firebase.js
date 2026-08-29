import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

export const firebaseConfig = {
  apiKey: "AIzaSyBYSzE43ZUi8O7ZaZJWz3ChhVyCkqTQgVU",
  authDomain: "ssrt-live.firebaseapp.com",
  projectId: "ssrt-live",
  storageBucket: "ssrt-live.firebasestorage.app",
  messagingSenderId: "641239718406",
  appId: "1:641239718406:web:88664cc7853b133a248187",
  measurementId: "G-P7XWK53CHD",
};

export function isFirebaseConfigured(config = firebaseConfig) {
  return Boolean(
    config.apiKey &&
    config.authDomain &&
    config.projectId &&
    config.storageBucket &&
    config.messagingSenderId &&
    config.appId
  );
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const functions = getFunctions(app, "asia-south1");

if (
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_USE_FUNCTIONS_EMULATOR === "true"
) {
  connectFunctionsEmulator(functions, "localhost", 5001);
}

let analyticsPromise;

async function getAnalyticsInstance() {
  if (typeof window === "undefined" || !isFirebaseConfigured()) {
    return null;
  }

  if (!analyticsPromise) {
    analyticsPromise = isSupported().then((supported) => {
      if (!supported) {
        return null;
      }
      return getAnalytics(app);
    });
  }

  return analyticsPromise;
}

export async function trackPageView(pathname, title = document.title) {
  const analytics = await getAnalyticsInstance();
  if (!analytics) {
    return;
  }

  logEvent(analytics, "page_view", {
    page_title: title,
    page_location: window.location.href,
    page_path: pathname,
  });
}

void getAnalyticsInstance();

export { app, auth, db, storage, functions };
