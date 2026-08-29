import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { SlimHead } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { docPageImages } from "@/constants/docPageImages";
import { proseParas } from "@/lib/docContent";
import { IMG } from "@/constants/images";

const paragraphs = proseParas("harake_nandi", { skip: 1 });

export default function AshramHarakeNandiPage() {
  const img = usePageImages("/ashram/harake-nandi");

  return (
    <>
      <SlimHead eyebrow="Ashram" title="Harake Nandi." />
      <ProseSection
        paragraphs={paragraphs}
        images={docPageImages.harake_nandi}
        image={img("inline-figure", IMG.shiva)}
        imageAlt="Harake Nandi"
      />
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/ashram">The Sacred Ashram <ChevronRight size={15} /></Link>
          <Link to="/sevas/nandi-abhisheka">Nandi Abhisheka →</Link>
        </div>
      </section>
    </>
  );
}
