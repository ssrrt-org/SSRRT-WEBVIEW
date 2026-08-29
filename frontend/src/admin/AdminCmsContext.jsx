import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { adminSeed } from "@/admin/adminSeed";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { ensureCmsSeeded, mergeCmsData, saveCmsSite, subscribeCms } from "@/lib/cms";
import { archiveInboxMessage } from "@/lib/inbox";

const AdminCmsContext = createContext(null);
const DEBOUNCE_MS = 900;

function mergePartial(current, partial) {
  const next = { ...current, ...partial };
  if (partial.branding) next.branding = { ...current.branding, ...partial.branding };
  if (partial.formation) next.formation = { ...current.formation, ...partial.formation };
  if (partial.donate) {
    next.donate = { ...current.donate, ...partial.donate };
    if (partial.donate.purposes) next.donate.purposes = partial.donate.purposes;
    if (partial.donate.suggestedAmounts) next.donate.suggestedAmounts = partial.donate.suggestedAmounts;
  }
  if (partial.homeCarousel) next.homeCarousel = partial.homeCarousel;
  if (partial.heroes) {
    next.heroes = { ...current.heroes };
    for (const [path, hero] of Object.entries(partial.heroes)) {
      next.heroes[path] = { ...(current.heroes[path] || {}), ...hero };
    }
  }
  if (partial.pageImages) {
    next.pageImages = { ...(current.pageImages || {}) };
    for (const [path, slots] of Object.entries(partial.pageImages)) {
      next.pageImages[path] = { ...(current.pageImages?.[path] || {}), ...slots };
      if (slots.hero !== undefined) {
        next.heroes = next.heroes || { ...current.heroes };
        next.heroes[path] = { ...(next.heroes[path] || {}), image: slots.hero };
      }
    }
  }
  return next;
}

export function AdminCmsProvider({ children }) {
  const { user } = useAdminAuth();
  const [data, setData] = useState(() => structuredClone(adminSeed));
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [syncError, setSyncError] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle");
  const dataRef = useRef(data);
  const debounceRef = useRef(null);
  const savedTimerRef = useRef(null);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    return () => {
      window.clearTimeout(debounceRef.current);
      window.clearTimeout(savedTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return undefined;
    }

    let alive = true;
    setLoading(true);

    ensureCmsSeeded().catch(() => {});

    const unsubscribe = subscribeCms(
      (next) => {
        if (!alive) return;
        setData(next);
        dataRef.current = next;
        setLoading(false);
        setSyncError("");
      },
      (error) => {
        if (!alive) return;
        setSyncError(error.message || "Unable to sync with Firebase.");
        setLoading(false);
      },
    );

    return () => {
      alive = false;
      unsubscribe();
    };
  }, [user]);

  const markSaved = useCallback(() => {
    setSaveStatus("saved");
    setNotice("Saved to Firebase.");
    window.clearTimeout(savedTimerRef.current);
    savedTimerRef.current = window.setTimeout(() => {
      setSaveStatus("idle");
      setNotice("");
    }, 2800);
  }, []);

  const persist = useCallback(async (next) => {
    setSaveStatus("saving");
    setData(next);
    try {
      await saveCmsSite(next);
      setSyncError("");
      markSaved();
    } catch (error) {
      setSaveStatus("error");
      setSyncError(error.message || "Save failed.");
      setNotice("");
      throw error;
    }
  }, [markSaved]);

  const patch = useCallback(async (partial, options = {}) => {
    const { debounce = false } = options;

    if (partial.inbox) {
      const previous = dataRef.current.inbox || [];
      const nextInbox = partial.inbox;
      const removed = previous.filter((item) => !nextInbox.some((entry) => entry.id === item.id));
      await Promise.all(removed.map((item) => archiveInboxMessage(item.id)));
      setData((current) => mergeCmsData({ ...current, inbox: nextInbox }));
      setNotice("Inbox updated.");
      window.setTimeout(() => setNotice(""), 2800);
      return;
    }

    const next = mergePartial(dataRef.current, partial);
    setData(next);
    dataRef.current = next;

    if (debounce) {
      window.clearTimeout(debounceRef.current);
      setSaveStatus("saving");
      debounceRef.current = window.setTimeout(() => {
        persist(next).catch(() => {});
      }, DEBOUNCE_MS);
      return;
    }

    window.clearTimeout(debounceRef.current);
    await persist(next);
  }, [persist]);

  const patchDebounced = useCallback((partial) => patch(partial, { debounce: true }), [patch]);

  const value = useMemo(
    () => ({
      data,
      persist,
      patch,
      patchDebounced,
      notice,
      setNotice,
      loading,
      syncError,
      saveStatus,
    }),
    [data, persist, patch, patchDebounced, notice, loading, syncError, saveStatus],
  );

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
