import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MedicalScrollingHero from "@/components/medical/MedicalScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";
import { docPageImages } from "@/constants/docPageImages";

export default function SevaMedicalVillagePage() {
  const title = docTitle("medical");
  const lede = docExcerpt("medical", { skip: 2, maxLen: 220 });

  return (
    <div className="mother-page medical-hub-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Medical support in the village</Eyebrow>
          <h1 className="mother-page-title">{title}</h1>
          <p className="mother-page-lede">{lede}</p>
        </div>
      </header>

      <MedicalScrollingHero />

      <ProseSection paragraphs={proseParas("medical", { skip: 3 })} images={docPageImages.medical_village} />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother-for-needy">Mother for the Needy <ChevronRight size={15} /></Link>
          <Link to="/seva/medical">Medical centre →</Link>
        </div>
      </section>
    </div>
  );
}
