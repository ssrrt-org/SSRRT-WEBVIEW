import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { SlimHead } from "@/components/shared/PageSections";
import { docTitle, proseParas } from "@/lib/docContent";
import { docPageImages } from "@/constants/docPageImages";

export default function SevaMedicalVillagePage() {
  return (
    <>
      <SlimHead title={docTitle("medical")} />
      <ProseSection paragraphs={proseParas("medical", { skip: 3 })} images={docPageImages.medical} />
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother-for-needy">Mother for the Needy <ChevronRight size={15} /></Link>
          <Link to="/seva/medical">Medical centre →</Link>
        </div>
      </section>
    </>
  );
}
