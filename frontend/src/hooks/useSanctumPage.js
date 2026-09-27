import { useEffect } from "react";

/** Enables Sacred Sanctum (Stitch) chrome tokens on global header/topbar while on temple pages. */
export default function useSanctumPage(active = true) {
  useEffect(() => {
    if (!active) return undefined;
    document.body.classList.add("sanctum-page");
    return () => document.body.classList.remove("sanctum-page");
  }, [active]);
}
