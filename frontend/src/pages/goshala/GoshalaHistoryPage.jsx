import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import GoshalaScrollingHero from "@/components/goshala/GoshalaScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { docPageImages } from "@/constants/docPageImages";
import {
  kaamadhenuCalloutBody,
  kaamadhenuCalloutQuote,
  kaamadhenuEyebrow,
  kaamadhenuHeadLede,
  kaamadhenuHeadTitle,
  kaamadhenuOpeningQuote,
  kaamadhenuParagraphsAfter,
  kaamadhenuParagraphsBeforeBody,
  kaamadhenuStats,
  kaamadhenuVisionHeading,
  kaamadhenuVisionLead,
  kaamadhenuStatsTitle,
} from "@/constants/kaamadhenuContent";

export default function GoshalaHistoryPage() {
  return (
    <div className="mother-page goshala-kaamadhenu-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow gold>{kaamadhenuEyebrow}</Eyebrow>
          <h1 className="mother-page-title hub-head-title-single">{kaamadhenuHeadTitle}</h1>
          <p className="mother-page-lede">{kaamadhenuHeadLede}</p>
        </div>
      </header>

      <GoshalaScrollingHero />

      <section className="kaamadhenu-hero-quote" aria-label="Opening quote">
        <div className="wrap">
          <blockquote className="hub-header-quote kaamadhenu-head-quote">
            {kaamadhenuOpeningQuote}
          </blockquote>
        </div>
      </section>

      <section className="prose-section prose-wide goshala-kaamadhenu-vision-lead">
        <div className="wrap prose-section-inner">
          <h3 className="prose-subheading">{kaamadhenuVisionHeading}</h3>
          <hr className="kaamadhenu-content-rule" />
          <div className="prose-block prose-justify">
            <p>{kaamadhenuVisionLead}</p>
          </div>
        </div>
      </section>

      <ProseSection
        className="goshala-kaamadhenu-prose-continued"
        paragraphs={kaamadhenuParagraphsBeforeBody}
        images={docPageImages.goshala_adopt?.slice(0, 2)}
      />

      <section className="kaamadhenu-callout tint">
        <div className="wrap kaamadhenu-callout-inner">
          <blockquote className="kaamadhenu-callout-quote">{kaamadhenuCalloutQuote}</blockquote>
          <p>{kaamadhenuCalloutBody}</p>
        </div>
      </section>

      <ProseSection
        paragraphs={kaamadhenuParagraphsAfter}
        images={docPageImages.goshala_adopt?.slice(1, 3)}
        tint
      />

      <section className="kaamadhenu-stats">
        <div className="wrap">
          <h2 className="kaamadhenu-stats-title">{kaamadhenuStatsTitle}</h2>
          <ul className="kaamadhenu-stats-grid">
            {kaamadhenuStats.map((item) => (
              <li key={item.label}>
                <span className="kaamadhenu-stat-value">{item.value}</span>
                <span className="kaamadhenu-stat-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="goshala-history-back" to="/goshala">
            Project Kaamadhenau <ChevronRight size={15} />
          </Link>
          <div className="child-nav-links">
            <Link data-testid="goshala-history-adopt" to="/goshala/adopt">Adopt a cow →</Link>
            <Link data-testid="goshala-history-day" to="/goshala/day">A day at the Goshala →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
