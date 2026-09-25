import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { medicalHeroImages } from "@/constants/medicalHeroImages";

export default function MedicalScrollingHero({ images = medicalHeroImages }) {
  return (
    <section className="page-banner-carousel" aria-label="Medical seva">
      <TripleImageCarousel
        slides={images.map((img) => ({ img }))}
        autoPlayMs={2000}
        equalPanels
        className="page-hero-carousel"
        testIdPrefix="medical-hero"
      />
    </section>
  );
}
