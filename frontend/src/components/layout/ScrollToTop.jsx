import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getStickyOffset } from "@/utils/scroll";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      let tries = 0;
      const scroll = () => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          const y = el.getBoundingClientRect().top + window.pageYOffset - getStickyOffset();
          window.scrollTo({ top: y, behavior: "smooth" });
        } else if (tries < 20) {
          tries += 1;
          setTimeout(scroll, 80);
        }
      };
      setTimeout(scroll, 80);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, hash]);
  return null;
}
