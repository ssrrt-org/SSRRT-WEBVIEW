import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { adminSeed, CMS_STORAGE_KEY } from "@/admin/adminSeed";
import { CMS_UPDATED_EVENT } from "@/lib/donations";

const AdminCmsContext = createContext(null);

function loadCms() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return structuredClone(adminSeed);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(adminSeed),
      ...parsed,
      donations: Array.isArray(parsed.donations) ? parsed.donations : [],
    };
  } catch {
    return structuredClone(adminSeed);
  }
}

export function AdminCmsProvider({ children }) {
  const [data, setData] = useState(loadCms);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const refresh = () => setData(loadCms());
    window.addEventListener(CMS_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CMS_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const persist = useCallback((next) => {
    setData(next);
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(next));
    setNotice("Saved locally. Firebase sync will replace this later.");
    window.setTimeout(() => setNotice(""), 2800);
  }, []);

  const patch = useCallback((partial) => {
    persist({ ...data, ...partial });
  }, [data, persist]);

  const value = useMemo(() => ({ data, persist, patch, notice, setNotice }), [data, persist, patch, notice]);

  return (
    <AdminCmsContext.Provider value={value}>
      {children}
    </AdminCmsContext.Provider>
  );
}

export function useAdminCms() {
  const ctx = useContext(AdminCmsContext);
  if (!ctx) throw new Error("useAdminCms must be used inside AdminCmsProvider");
  return ctx;
}
