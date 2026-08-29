import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { SlimHead } from "@/components/shared/PageSections";
import { formationParagraphs, formationTitle } from "@/constants/ashramContent";
import { docExcerpt } from "@/lib/docContent";
import { docPageImages } from "@/constants/docPageImages";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";

const pillars = [
  { id: "goshala", to: "/goshala", title: "Project Kaamadhenau", note: docExcerpt("goshala_adopt", { skip: 1 }), image: IMG.goshalaLocal },
  { id: "ashram", to: "/ashram", title: "The Ashram", note: docExcerpt("sacred_ashram", { skip: 4 }), image: IMG.templeSouth },
  { id: "medical", to: "/seva/medical", title: "Medical seva", note: docExcerpt("medical", { skip: 1 }), image: IMG.medical },
  { id: "food", to: "/seva/food", title: "Food for the needy", note: docExcerpt("food", { skip: 1 }), image: IMG.serve },
  { id: "volunteer", to: "/volunteering", title: "Volunteering", note: docExcerpt("goshala_volunteer", { skip: 1 }), image: IMG.serve },
  { id: "donate", to: "/donate", title: "Support the Trust", note: docExcerpt("goshala_support", { skip: 1 }), image: IMG.manidweepa },
];

export default function AboutPage() {
  const img = usePageImages("/about");
  const pillarCards = pillars.map((pillar) => ({
    ...pillar,
    tag: "SSRRT",
    image: img(`pillar-${pillar.id}`, pillar.image),
    testid: `about-link-${pillar.id}`,
  }));

  return (
    <>
      <SlimHead eyebrow="SSRRT" title={formationTitle || "Srimad Sai Rajarajeshwari Trust."} />

      <ProseSection paragraphs={formationParagraphs} images={docPageImages.formation} />

      <HubProgrammesSection
        eyebrow="Main areas"
        title="Where the Trust's work lives."
        programmes={pillarCards}
        testIdPrefix="about"
        tint
      />

      <section className="about-location">
        <div className="wrap about-location-grid">
          <div>
            <p>{docExcerpt("sacred_ashram", { skip: 7, maxLen: 320 })}</p>
            <Link className="btn-solid" to="/contact" style={{ marginTop: "1.25rem" }}>
              Contact the office <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="about-location-detail">
            <MapPin size={20} aria-hidden="true" />
            <div>
              <strong>Address</strong>
              <span>Karekura, Mysore, Karnataka, India</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
