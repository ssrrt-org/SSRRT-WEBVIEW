import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { getStickyOffset } from "@/utils/scroll";

export default function ScrollHint({ variant = "light", containerRef }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 72);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollDown = () => {
    const section = containerRef?.current;
    const next = section?.nextElementSibling;

    if (next) {
      const y = next.getBoundingClientRect().top + window.scrollY - getStickyOffset();
      window.scrollTo({ top: y, behavior: "smooth" });
      return;
    }

    window.scrollBy({ top: window.innerHeight * 0.72, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      className={`scroll-hint scroll-hint-${variant}${hidden ? " is-hidden" : ""}`}
      onClick={scrollDown}
      aria-label="Scroll to content"
      data-testid="scroll-hint"
    >
      <span>Scroll</span>
      <ChevronDown size={18} className="scroll-hint-icon" aria-hidden="true" />
    </button>
  );
}
