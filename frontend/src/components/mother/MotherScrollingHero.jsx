import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { motherHeroImages } from "@/constants/motherHeroImages";

export default function MotherScrollingHero({ images = motherHeroImages }) {
  return (
    <section className="page-banner-carousel" aria-label="Glimpses of Amma">
      <TripleImageCarousel
        slides={images.map((img) => ({ img }))}
        autoPlayMs={2000}
        equalPanels
        className="page-hero-carousel"
        testIdPrefix="mother-hero"
      />
    </section>
  );
}
