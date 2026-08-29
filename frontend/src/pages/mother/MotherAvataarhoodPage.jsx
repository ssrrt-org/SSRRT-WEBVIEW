import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { Quote, SlimHead } from "@/components/shared/PageSections";
import {
  motherAvataarhoodParagraphs,
  motherDeclarationNarrative,
  motherDeclarationQuote,
} from "@/constants/motherContent";
import { docPageImages } from "@/constants/docPageImages";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";

export default function MotherAvataarhoodPage() {
  const img = usePageImages("/mother/avataarhood");

  return (
    <>
      <SlimHead
        eyebrow="Amma"
        title="The Avataarhood."
        intro="The declaration of 29 March 1997 and the spiritual truth of Shiva's Shakti on earth."
      />

      <ProseSection
        eyebrow="Declaration · 29 March 1997"
        title="Goddess Rajarajeshwari proclaimed."
        paragraphs={motherDeclarationNarrative}
      />

      <Quote author="Amma · Avataric declaration">{motherDeclarationQuote}</Quote>

      <ProseSection
        eyebrow="Shiva & Shakti"
        title="The theology of the Avataarhood."
        paragraphs={motherAvataarhoodParagraphs}
        images={docPageImages.mother_avataarhood}
        image={img("split", IMG.manidweepa)}
        imageAlt="Srimad Sai Rajarajeshwari"
        tint
      />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother">Glimpses of the Mother <ChevronRight size={15} /></Link>
          <Link to="/mother/naadi">Naadi readings →</Link>
        </div>
      </section>
    </>
  );
}
