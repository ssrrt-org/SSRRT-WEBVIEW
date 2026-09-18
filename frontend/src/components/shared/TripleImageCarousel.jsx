import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function normalizeSlides(slides) {
  return slides.map((slide) => {
    if (typeof slide === "string") {
      return { img: slide, label: "", caption: "" };
    }
    return {
      img: slide.img,
      label: slide.label || "",
      caption: slide.caption || "",
    };
  });
}

export default function TripleImageCarousel({
  slides: rawSlides,
  autoPlayMs = 0,
  className = "",
  testIdPrefix = "carousel",
}) {
  const slides = normalizeSlides(rawSlides);
  const [idx, setIdx] = useState(0);
  const n = slides.length;

  useEffect(() => {
    if (!autoPlayMs || n < 2) return undefined;
    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOk) return undefined;
    const id = window.setInterval(() => {
      setIdx((current) => (current + 1) % n);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, n]);

  if (!n) return null;

  const prev = () => setIdx((current) => (current - 1 + n) % n);
  const next = () => setIdx((current) => (current + 1) % n);
  const left = slides[(idx - 1 + n) % n];
  const mid = slides[idx];
  const right = slides[(idx + 1) % n];

  return (
    <div className={`hero-carousel${className ? ` ${className}` : ""}`} data-testid={`${testIdPrefix}-carousel`}>
      <button
        type="button"
        className="carousel-arrow left"
        data-testid={`${testIdPrefix}-prev`}
        onClick={prev}
        aria-label="Previous"
      >
        <ChevronLeft />
      </button>
      {[left, mid, right].map((s, i) => {
        const showCaption = Boolean(s.caption || s.label);
        return (
          <figure
            key={`${idx}-${i}-${s.img}`}
            className={`carousel-panel${i === 1 ? " main" : ""}`}
            data-testid={`${testIdPrefix}-panel-${i}`}
          >
            <img
              src={s.img}
              alt={s.label || "Banner image"}
              loading={i === 1 ? "eager" : "lazy"}
              fetchPriority={i === 1 ? "high" : "low"}
              decoding="async"
              width={i === 1 ? 1200 : 640}
              height={i === 1 ? 800 : 480}
              style={{ objectPosition: "center center" }}
            />
            {showCaption ? (
              <figcaption>
                {s.caption ? <small>{s.caption}</small> : null}
                {s.label ? <span>{s.label}</span> : null}
              </figcaption>
            ) : null}
          </figure>
        );
      })}
      <button
        type="button"
        className="carousel-arrow right"
        data-testid={`${testIdPrefix}-next`}
        onClick={next}
        aria-label="Next"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
