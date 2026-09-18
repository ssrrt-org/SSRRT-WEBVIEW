import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { ashramRituals } from "@/constants/sevasRituals";
import NotFoundPage from "@/pages/NotFoundPage";

export default function AshramRitualPage() {
  const { ritualId } = useParams();
  const ritual = ashramRituals.find((r) => r.id === ritualId);
  if (!ritual) return <NotFoundPage />;

  const index = ashramRituals.findIndex((r) => r.id === ritualId);
  const prev = ashramRituals[index - 1];
  const next = ashramRituals[index + 1];
  const bookPath = ritual.bookPath || `/sevas/${ritual.id}/book`;

  return (
    <>
      <section className="seva-detail-head">
        <div className="wrap seva-detail-head-inner">
          <Eyebrow gold>{ritual.eyebrow}</Eyebrow>
          <div className="seva-detail-title-row">
            <h1>{ritual.title}</h1>
            <Link className="btn-solid seva-book-cta" to={bookPath} data-testid="ritual-book-seva">
              Book the Seva <ArrowUpRight size={16} />
            </Link>
          </div>
          <p className="mother-subhead-intro">{ritual.intro}</p>
        </div>
      </section>

      <ProseSection
        eyebrow="About this seva"
        paragraphs={ritual.paragraphs || (ritual.body ? [ritual.body] : [])}
      />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="ritual-back" to="/sevas">
            All Ashram sevas <ChevronRight size={15} />
          </Link>
          <div className="child-nav-links">
            {prev && <Link to={prev.path}>← {prev.title}</Link>}
            {next && <Link to={next.path}>{next.title} →</Link>}
          </div>
        </div>
      </section>
    </>
  );
}
