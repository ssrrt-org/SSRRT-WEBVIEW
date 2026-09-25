import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { sevaHeroImages } from "@/constants/sevaHeroImages";

export default function SevaScrollingHero({ images = sevaHeroImages }) {
  return (
    <section className="page-banner-carousel" aria-label="Seva programmes">
      <TripleImageCarousel
        slides={images.map((img) => ({ img }))}
        autoPlayMs={2000}
        equalPanels
        className="page-hero-carousel"
        testIdPrefix="seva-hero"
      />
    </section>
  );
}
