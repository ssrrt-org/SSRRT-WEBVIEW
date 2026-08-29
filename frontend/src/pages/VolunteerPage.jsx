import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { SlimHead } from "@/components/shared/PageSections";
import { docPageImages } from "@/constants/docPageImages";
import { docTitle, proseParas } from "@/lib/docContent";

const title = docTitle("goshala_volunteer", { minLen: 15 });
const paragraphs = proseParas("goshala_volunteer", { skip: 1 });

export default function VolunteerPage() {
  return (
    <>
      <SlimHead eyebrow="Volunteering" title={title} />

      <ProseSection
        paragraphs={paragraphs}
        images={docPageImages.goshala_volunteer}
      />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/goshala">
            Project Kaamadhenau <ChevronRight size={15} />
          </Link>
          <Link to="/contact">Contact the Trust office →</Link>
        </div>
      </section>
    </>
  );
}
