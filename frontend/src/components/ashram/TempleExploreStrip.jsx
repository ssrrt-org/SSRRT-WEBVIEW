import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function TempleExploreStrip({ temples, currentId, resolveImage }) {
  const trackRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const start = temples.findIndex((t) => t.id === currentId);
    setActiveIndex(start >= 0 ? start : 0);
  }, [currentId, temples]);

  useEffect(() => {
    if (paused || temples.length < 2) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % temples.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [paused, temples.length]);

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    const track = trackRef.current;
    if (!el || !track) return;
    const trackRect = track.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const offset = elRect.left - trackRect.left - (trackRect.width - elRect.width) / 2;
    track.scrollTo({ left: track.scrollLeft + offset, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <div
      className="temple-explore-strip"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="temple-explore-strip-track" ref={trackRef} role="list">
        {temples.map((t, i) => {
          const isCurrent = t.id === currentId;
          const isActive = i === activeIndex;
          return (
            <Link
              key={t.id}
              to={t.path}
              ref={(node) => {
                itemRefs.current[i] = node;
              }}
              role="listitem"
              className={`temple-explore-strip-item${isCurrent ? " is-current" : ""}${isActive ? " is-active" : ""}`}
              data-testid={`temple-explore-${t.id}`}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={t.name}
              onClick={() => setActiveIndex(i)}
            >
              <span className="temple-explore-strip-thumb">
                <img src={resolveImage(t)} alt="" loading="lazy" />
              </span>
              <span className="temple-explore-strip-name">{t.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
