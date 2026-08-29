import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { ensureAdminAccess } from "@/lib/cms";

const AdminAuthContext = createContext(null);

function mapAuthError(error) {
  const code = error?.code || "";
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
    return "Invalid email or password.";
  }
  if (code === "auth/too-many-requests") {
    return "Too many attempts. Please wait a moment and try again.";
  }
  return error?.message || "Unable to sign in.";
}

function sessionFromUser(firebaseUser) {
  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    loggedInAt: Date.now(),
  };
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const verifiedUidRef = useRef(null);
  const authCheckRef = useRef(null);

  useEffect(() => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        verifiedUidRef.current = null;
        authCheckRef.current = null;
        setUser(null);
        setLoading(false);
        return;
      }

      // Already verified this session (e.g. login() just succeeded).
      if (verifiedUidRef.current === firebaseUser.uid) {
        setUser(sessionFromUser(firebaseUser));
        setLoading(false);
        return;
      }

      // Deduplicate concurrent checks (login + listener firing together).
      if (authCheckRef.current) {
        const access = await authCheckRef.current;
        if (access.ok) {
          verifiedUidRef.current = firebaseUser.uid;
          setUser(sessionFromUser(firebaseUser));
        } else {
          await signOut(auth);
          setUser(null);
        }
        setLoading(false);
        return;
      }

      const check = ensureAdminAccess(firebaseUser);
      authCheckRef.current = check;

      try {
        const access = await check;
        if (access.ok) {
          verifiedUidRef.current = firebaseUser.uid;
          setUser(sessionFromUser(firebaseUser));
        } else {
          await signOut(auth);
          setUser(null);
        }
      } catch {
        await signOut(auth);
        setUser(null);
      } finally {
        authCheckRef.current = null;
        setLoading(false);
      }
    });
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    async login(email, password) {
      try {
        const credential = await signInWithEmailAndPassword(auth, email.trim(), password);

        // Reuse in-flight check if onAuthStateChanged already started one.
        const check = authCheckRef.current || ensureAdminAccess(credential.user);
        authCheckRef.current = check;

        const access = await check;
        authCheckRef.current = null;

        if (!access.ok) {
          verifiedUidRef.current = null;
          await signOut(auth);
          setUser(null);
          return {
            ok: false,
            error: access.error,
            uid: access.uid,
            reason: access.reason,
          };
        }

        verifiedUidRef.current = credential.user.uid;
        setUser(sessionFromUser(credential.user));
        setLoading(false);
        return { ok: true };
      } catch (error) {
        authCheckRef.current = null;
        return { ok: false, error: mapAuthError(error) };
      }
    },
    logout() {
      verifiedUidRef.current = null;
      authCheckRef.current = null;
      setUser(null);
      return signOut(auth);
    },
  }), [user, loading]);

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}
