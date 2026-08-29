import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { SlimHead } from "@/components/shared/PageSections";
import { ashramRituals } from "@/constants/sevasRituals";
import NotFoundPage from "@/pages/NotFoundPage";

export default function AshramRitualPage() {
  const { ritualId } = useParams();
  const ritual = ashramRituals.find((r) => r.id === ritualId);
  if (!ritual) return <NotFoundPage />;

  const index = ashramRituals.findIndex((r) => r.id === ritualId);
  const prev = ashramRituals[index - 1];
  const next = ashramRituals[index + 1];

  return (
    <>
      <SlimHead eyebrow={ritual.eyebrow} title={ritual.title} intro={ritual.intro} />
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
