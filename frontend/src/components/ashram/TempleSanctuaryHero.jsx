import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cssBackgroundImage } from "@/lib/utils";

/**
 * Consecrated Space hero — dark band, copy left, deity portrait right (matches temple pages).
 */
export default function TempleSanctuaryHero({
  breadcrumbCurrent,
  mantra = "",
  title,
  tag = "",
  intro = "",
  quote = "",
  heroFigure,
  heroBg,
  offerTestId = "temple-offer-prayers",
  visitTestId = "temple-plan-visit",
}) {
  const bgStyle = heroBg ? { backgroundImage: cssBackgroundImage(heroBg) } : undefined;

  return (
    <section className="temple-hero" aria-label={title}>
      <div className="temple-hero-bg" style={bgStyle} aria-hidden="true" />
      <div className="wrap temple-hero-inner">
        <div className="temple-hero-grid">
          <div className="temple-hero-copy">
            <nav className="temple-breadcrumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span aria-hidden="true">›</span>
              <Link to="/ashram">Ashram &amp; Temples</Link>
              <span aria-hidden="true">›</span>
              <span>{breadcrumbCurrent}</span>
            </nav>
            {mantra ? <p className="temple-mantra">{mantra}</p> : null}
            <h1 className="temple-hero-title">{title}</h1>
            {tag ? <p className="temple-hero-tag">{tag}</p> : null}
            {intro ? <p className="temple-hero-intro">{intro}</p> : null}
            <div className="temple-hero-actions">
              <Link className="temple-hero-btn-primary" to="/contact" data-testid={offerTestId}>
                Offer your prayers <ArrowUpRight size={16} />
              </Link>
              <Link className="temple-hero-btn-outline" to="/contact" data-testid={visitTestId}>
                Plan your visit
              </Link>
            </div>
            {quote ? <p className="temple-hero-quote">{quote}</p> : null}
          </div>
          {heroFigure ? (
            <figure className="temple-hero-figure">
              <img src={heroFigure} alt={title} />
            </figure>
          ) : null}
        </div>
      </div>
    </section>
  );
}
