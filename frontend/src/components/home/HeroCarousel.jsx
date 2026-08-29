import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCms } from "@/context/CmsContext";

const fallbackSlides = [
  { img: "/ssrrt/AmmaGanesha.jpg", label: "First Blessings", caption: "Ganesha Sannidhi" },
  { img: "/ssrrt/Umother.jpg", label: "Amma", caption: "The Divine Mother" },
  { img: "/ssrrt/ManiDweepa.jpg", label: "Mani Dweepa", caption: "The Sacred Ashram" },
  { img: "/ssrrt/ShirdiSai.jpg", label: "Shirdi Sai Baba", caption: "Temple Sannidhi" },
  { img: "/ssrrt/Cow1.jpeg", label: "Project Kaamadhenau", caption: "Gau Seva" },
  { img: "/ssrrt/IMG-20250923-WA0025.jpg", label: "Narayana Seva", caption: "Feeding the needy" },
];

export default function HeroCarousel() {
  const { data } = useCms();
  const slides = (data.homeCarousel?.length ? data.homeCarousel : fallbackSlides).map((slide) => ({
    img: slide.img,
    label: slide.label,
    caption: slide.caption,
  }));
  const [idx, setIdx] = useState(1);
  const n = slides.length;
  const prev = () => setIdx((current) => (current - 1 + n) % n);
  const next = () => setIdx((current) => (current + 1) % n);
  const left = slides[(idx - 1 + n) % n];
  const mid = slides[idx];
  const right = slides[(idx + 1) % n];
  return (
    <div className="hero-carousel" data-testid="hero-carousel">
      <button className="carousel-arrow left" data-testid="hero-carousel-prev" onClick={prev} aria-label="Previous"><ChevronLeft/></button>
      {[left, mid, right].map((s, i) => (
        <figure key={`${i}-${s.img}`} className={`carousel-panel${i === 1 ? " main" : ""}`} data-testid={`hero-carousel-panel-${i}`}>
          <img
            src={s.img}
            alt={s.label}
            loading={i === 1 ? "eager" : "lazy"}
            fetchPriority={i === 1 ? "high" : "low"}
            decoding="async"
            width={i === 1 ? 1200 : 640}
            height={i === 1 ? 800 : 480}
          />
          <figcaption><small>{s.caption}</small><span>{s.label}</span></figcaption>
        </figure>
      ))}
      <button className="carousel-arrow right" data-testid="hero-carousel-next" onClick={next} aria-label="Next"><ChevronRight/></button>
    </div>
  );
}
