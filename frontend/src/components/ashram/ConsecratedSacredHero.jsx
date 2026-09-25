import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/constants/images";
import { cssBackgroundImage } from "@/lib/utils";

/** Same dark split hero as temple sannidhi pages (Mani Dweepa, etc.). */
export default function ConsecratedSacredHero({
  breadcrumbCurrent,
  mantra = "",
  title,
  tag = "",
  intro,
  heroFigure,
  heroBg = IMG.manidweepa,
  offerTestId = "sacred-offer-prayers",
  visitTestId = "sacred-plan-visit",
}) {
  const backgroundImage = cssBackgroundImage(heroBg);

  return (
    <section className="temple-hero">
      <div
        className="temple-hero-bg"
        style={backgroundImage ? { backgroundImage } : undefined}
        aria-hidden="true"
      />
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
          </div>
          <figure className="temple-hero-figure">
            <img src={heroFigure} alt={title} />
          </figure>
        </div>
      </div>
    </section>
  );
}
