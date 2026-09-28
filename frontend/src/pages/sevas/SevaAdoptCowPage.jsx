import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import CowAdoptionSection from "@/components/goshala/CowAdoptionSection";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { cowAdoptionSeva } from "@/constants/sevasRituals";

export default function SevaAdoptCowPage() {
  return (
    <div className="mother-page sevas-detail-page seva-adopt-cow-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>{cowAdoptionSeva.eyebrow}</Eyebrow>
          <h1 className="mother-page-title">{cowAdoptionSeva.title}</h1>
          <p className="mother-page-lede">{cowAdoptionSeva.intro}</p>
        </div>
      </header>

      <CowAdoptionSection variant="seva" />

      {cowAdoptionSeva.paragraphs?.length ? (
        <ProseSection eyebrow="About this seva" paragraphs={cowAdoptionSeva.paragraphs} tint />
      ) : null}

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="seva-adopt-back" to="/sevas">
            All Ashram sevas <ChevronRight size={15} />
          </Link>
          <Link
            className="btn-ghost-dark"
            data-testid="seva-adopt-goshala-program"
            to="/goshala/adopt"
          >
            Read about the Goshala programme <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
