import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { SlimHead } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { docPageImages } from "@/constants/docPageImages";
import { proseParas } from "@/lib/docContent";
import { IMG } from "@/constants/images";

const paragraphs = proseParas("bhairava", { skip: 1 });

export default function AshramBhairavaPage() {
  const img = usePageImages("/ashram/bhairava");

  return (
    <>
      <SlimHead eyebrow="Ashram" title="The Trishula of Kāla Bhairava." />
      <ProseSection
        paragraphs={paragraphs}
        images={docPageImages.bhairava}
        image={img("inline-figure", IMG.shiva)}
        imageAlt="Kaala Bhairava Trishula"
      />
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/ashram">The Sacred Ashram <ChevronRight size={15} /></Link>
          <Link to="/ashram/shiva">Shiva temple →</Link>
        </div>
      </section>
    </>
  );
}
