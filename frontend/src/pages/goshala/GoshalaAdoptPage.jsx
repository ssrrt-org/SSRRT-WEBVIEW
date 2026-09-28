import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import GoshalaScrollingHero from "@/components/goshala/GoshalaScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import {
  goshalaAdoptLede,
  goshalaAdoptParagraphs,
  goshalaAdoptTitle,
  goshalaSupportParagraphs,
  goshalaSupportTitle,
} from "@/constants/goshalaContent";
import { docPageImages } from "@/constants/docPageImages";

export default function GoshalaAdoptPage() {
  return (
    <div className="mother-page goshala-adopt-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow gold>Adopt a cow</Eyebrow>
          <h1 className="mother-page-title">{goshalaAdoptTitle}</h1>
          <p className="mother-page-lede">{goshalaAdoptLede}</p>
        </div>
      </header>

      <GoshalaScrollingHero />

      <ProseSection
        paragraphs={goshalaAdoptParagraphs}
        images={docPageImages.goshala_adopt}
      />

      <ProseSection
        eyebrow={goshalaSupportTitle}
        paragraphs={goshalaSupportParagraphs}
        images={docPageImages.goshala_support}
        tint
      />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-solid" data-testid="goshala-adopt-seva" to="/sevas/adopt-a-cow">
            Sponsor a cow — annual seva <ArrowUpRight size={16} />
          </Link>
          <Link className="btn-ghost-dark" data-testid="goshala-adopt-donate" to="/donate?purpose=goshala">
            General Goshala offering
          </Link>
          <Link className="btn-ghost-dark" data-testid="goshala-adopt-back" to="/goshala">
            Project Kaamadhenau <ChevronRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
