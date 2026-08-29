import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { adminSeed } from "@/admin/adminSeed";
import { heroImageForPath } from "@/constants/heroImages";
import { mergeCmsData, subscribeCms } from "@/lib/cms";
import { isUsableImageUrl } from "@/lib/utils";

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [data, setData] = useState(() => structuredClone(adminSeed));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeCms(
      (next) => {
        setData(next);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
      { includePrivate: false },
    );
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ data, loading }), [data, loading]);
  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used inside CmsProvider");
  return ctx;
}

export function useHeroForPath(pathname) {
  const { data } = useCms();
  const fromPage = data.pageImages?.[pathname]?.hero;
  if (fromPage && isUsableImageUrl(fromPage)) {
    return fromPage.trim();
  }
  const hero = data.heroes?.[pathname];
  if (hero?.image && isUsableImageUrl(hero.image)) {
    return hero.image.trim();
  }
  return heroImageForPath(pathname);
}

/** Resolve one image slot for a page path, with catalog/default fallback. */
export function usePageImage(pagePath, slotId, fallback = "") {
  const { data } = useCms();
  const value = data.pageImages?.[pagePath]?.[slotId];
  if (value && isUsableImageUrl(value)) {
    return value.trim();
  }
  return fallback;
}

/** Returns a resolver: img("slot-id", fallbackUrl) */
export function usePageImages(pagePath) {
  const { data } = useCms();
  return useMemo(() => {
    const slots = data.pageImages?.[pagePath] || {};
    return (slotId, fallback = "") => {
      const value = slots[slotId];
      if (value && isUsableImageUrl(value)) {
        return value.trim();
      }
      return fallback;
    };
  }, [data.pageImages, pagePath]);
}

export function useBranding() {
  const { data } = useCms();
  return data.branding;
}

export function usePublishedEvents() {
  const { data } = useCms();
  return (data.events || []).filter((event) => event.published !== false);
}

export function useShopProducts() {
  const { data } = useCms();
  return data.products || [];
}

export function useDonateConfig() {
  const { data } = useCms();
  return data.donate || adminSeed.donate;
}

export function useFormation() {
  const { data } = useCms();
  return data.formation || adminSeed.formation;
}
