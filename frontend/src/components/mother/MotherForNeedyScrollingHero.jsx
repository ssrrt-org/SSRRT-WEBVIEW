import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { motherForNeedyCarouselImages } from "@/constants/motherForNeedyImages";

export default function MotherForNeedyScrollingHero({ images = motherForNeedyCarouselImages }) {
  return (
    <section className="page-banner-carousel" aria-label="Mother for the Needy programmes">
      <TripleImageCarousel
        slides={images.map((img) => ({ img }))}
        autoPlayMs={2000}
        equalPanels
        className="page-hero-carousel"
        testIdPrefix="mother-needy-hero"
      />
    </section>
  );
}
