import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { SlimHead } from "@/components/shared/PageSections";
import {
  goshalaAdoptParagraphs,
  goshalaAdoptTitle,
  goshalaSupportParagraphs,
  goshalaSupportTitle,
} from "@/constants/goshalaContent";
import { docPageImages } from "@/constants/docPageImages";

export default function GoshalaAdoptPage() {
  return (
    <>
      <SlimHead eyebrow="Adopt a cow" title={goshalaAdoptTitle} />

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
          <Link className="btn-solid" data-testid="goshala-adopt-donate" to="/donate?purpose=goshala">
            Donate to the Goshala <ArrowUpRight size={16} />
          </Link>
          <Link className="btn-ghost-dark" data-testid="goshala-adopt-back" to="/goshala">
            Project Kaamadhenau <ChevronRight size={15} />
          </Link>
        </div>
      </section>
    </>
  );
}
