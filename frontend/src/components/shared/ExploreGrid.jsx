import { Link } from "react-router-dom";

/** Simple index of child pages — no card grid, no “Explore” CTAs. */
export default function ExploreGrid({ title, lede, items }) {
  return (
    <section className="subpage-links">
      <div className="wrap">
        {title && <h2 className="section-h">{title}</h2>}
        {lede && <p className="subpage-lede">{lede}</p>}
        <ul className="subpage-links-list">
          {items.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                data-testid={item.testid || `subpage-${item.to.replaceAll(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
              >
                <span className="subpage-links-title">{item.title}</span>
                {item.note && <span className="subpage-links-note">{item.note}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
