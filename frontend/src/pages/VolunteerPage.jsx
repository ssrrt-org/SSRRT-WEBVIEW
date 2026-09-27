import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import GoshalaScrollingHero from "@/components/goshala/GoshalaScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { docPageImages } from "@/constants/docPageImages";
import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";

const title = docTitle("goshala_volunteer", { minLen: 15 });
const lede = docExcerpt("goshala_volunteer", { skip: 1, maxLen: 220 });
const paragraphs = proseParas("goshala_volunteer", { skip: 1 });

export default function VolunteerPage() {
  return (
    <div className="mother-page goshala-volunteer-page volunteer-hub-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow gold>Volunteering</Eyebrow>
          <h1 className="mother-page-title">{title}</h1>
          <p className="mother-page-lede">{lede}</p>
        </div>
      </header>

      <GoshalaScrollingHero />

      <ProseSection paragraphs={paragraphs} images={docPageImages.goshala_volunteer} />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/goshala">
            Project Kaamadhenau <ChevronRight size={15} />
          </Link>
          <Link to="/contact">Contact the Trust office →</Link>
        </div>
      </section>
    </div>
  );
}
