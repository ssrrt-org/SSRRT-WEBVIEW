import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import GoshalaScrollingHero from "@/components/goshala/GoshalaScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { docPageImages } from "@/constants/docPageImages";
import {
  kaamadhenuDayEyebrow,
  kaamadhenuDayHeadLede,
  kaamadhenuDayHeadTitle,
  kaamadhenuDayClosing,
  kaamadhenuDayParagraphsAfterEvening,
  kaamadhenuDayParagraphsBeforeMorning,
  kaamadhenuDayParagraphsEvening,
  kaamadhenuDayParagraphsMorningThroughMidday,
} from "@/constants/kaamadhenuDayContent";

export default function GoshalaDayPage() {
  return (
    <div className="mother-page goshala-day-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow gold>{kaamadhenuDayEyebrow}</Eyebrow>
          <h1 className="mother-page-title hub-head-title-single">{kaamadhenuDayHeadTitle}</h1>
          <p className="mother-page-lede">{kaamadhenuDayHeadLede}</p>
        </div>
      </header>

      <GoshalaScrollingHero />

      <ProseSection
        className="goshala-day-prose-before-morning"
        paragraphs={kaamadhenuDayParagraphsBeforeMorning}
      />

      {kaamadhenuDayParagraphsMorningThroughMidday.length > 0 ? (
        <>
          <div className="wrap">
            <div className="goshala-day-section-rule">
              <hr className="goshala-content-rule" />
            </div>
          </div>
          <ProseSection
            className="goshala-day-prose-midday"
            paragraphs={kaamadhenuDayParagraphsMorningThroughMidday}
            images={docPageImages.goshala_day}
          />
        </>
      ) : null}

      {kaamadhenuDayParagraphsEvening.length > 0 ? (
        <>
          <div className="wrap">
            <div className="goshala-day-section-rule">
              <hr className="goshala-content-rule" />
            </div>
          </div>
          <ProseSection
            className="goshala-day-prose-evening"
            paragraphs={kaamadhenuDayParagraphsEvening}
          />
        </>
      ) : null}

      {kaamadhenuDayParagraphsAfterEvening.length > 0 ? (
        <ProseSection
          className="goshala-day-prose-rest"
          paragraphs={kaamadhenuDayParagraphsAfterEvening}
        />
      ) : null}

      <section className="goshala-day-closing" aria-label="Closing">
        <div className="wrap">
          <p className="goshala-day-closing-text">{kaamadhenuDayClosing}</p>
        </div>
      </section>

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="goshala-day-back" to="/goshala/history">
            Project Kaamadhenu <ChevronRight size={15} />
          </Link>
          <div className="child-nav-links">
            <Link data-testid="goshala-day-adopt" to="/goshala/adopt">Adopt a cow →</Link>
            <Link data-testid="goshala-day-main" to="/goshala">Goshala home →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
