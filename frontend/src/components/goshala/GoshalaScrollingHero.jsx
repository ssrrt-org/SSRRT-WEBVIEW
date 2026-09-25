import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { goshalaHeroImages } from "@/constants/goshalaHeroImages";

export default function GoshalaScrollingHero({ images = goshalaHeroImages }) {
  return (
    <section className="page-banner-carousel" aria-label="Goshala at Karekura">
      <TripleImageCarousel
        slides={images.map((img) => ({ img }))}
        autoPlayMs={2000}
        equalPanels
        className="page-hero-carousel"
        testIdPrefix="goshala-hero"
      />
    </section>
  );
}
