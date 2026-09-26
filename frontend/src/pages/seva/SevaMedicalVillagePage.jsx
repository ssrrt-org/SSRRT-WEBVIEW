import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MedicalScrollingHero from "@/components/medical/MedicalScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import {
  medicalVillageLede,
  medicalVillageParagraphs,
  medicalVillageTitle,
} from "@/constants/medicalContent";
import { docPageImages } from "@/constants/docPageImages";

export default function SevaMedicalVillagePage() {

  return (
    <div className="mother-page medical-hub-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Village outreach</Eyebrow>
          <h1 className="mother-page-title">{medicalVillageTitle}</h1>
          <p className="mother-page-lede">{medicalVillageLede}</p>
        </div>
      </header>

      <MedicalScrollingHero />

      <ProseSection paragraphs={medicalVillageParagraphs} images={docPageImages.medical_village} />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother-for-needy">Mother for the Needy <ChevronRight size={15} /></Link>
          <Link to="/seva/medical">Medical centre →</Link>
        </div>
      </section>
    </div>
  );
}
