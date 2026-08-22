import { createContext, useContext, useMemo, useState } from "react";
import { ADMIN_SESSION_KEY, HARDCODED_ADMIN } from "@/admin/adminAuth";

const AdminAuthContext = createContext(null);

function readSession() {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const value = useMemo(() => ({
    user,
    login(email, password) {
      const match =
        email.trim().toLowerCase() === HARDCODED_ADMIN.email &&
        password === HARDCODED_ADMIN.password;
      if (!match) return { ok: false, error: "Invalid email or password." };
      const session = { email: HARDCODED_ADMIN.email, loggedInAt: Date.now() };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return { ok: true };
    },
    logout() {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      setUser(null);
    },
  }), [user]);

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
