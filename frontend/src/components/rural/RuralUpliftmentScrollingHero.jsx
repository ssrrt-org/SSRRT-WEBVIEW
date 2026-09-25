import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { ruralUpliftmentHeroImages } from "@/constants/ruralUpliftmentHeroImages";

export default function RuralUpliftmentScrollingHero({ images = ruralUpliftmentHeroImages }) {
  return (
    <section className="page-banner-carousel" aria-label="Rural upliftment">
      <TripleImageCarousel
        slides={images.map((img) => ({ img }))}
        autoPlayMs={2000}
        equalPanels
        className="page-hero-carousel"
        testIdPrefix="rural-hero"
      />
    </section>
  );
}
