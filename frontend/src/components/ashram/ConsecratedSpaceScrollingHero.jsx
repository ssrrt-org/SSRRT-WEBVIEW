import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { consecratedSpaceHeroImages } from "@/constants/consecratedSpaceHeroImages";

export default function ConsecratedSpaceScrollingHero({ images = consecratedSpaceHeroImages }) {
  return (
    <section className="page-banner-carousel" aria-label="Consecrated spaces at Karekura">
      <TripleImageCarousel
        slides={images.map((img) => ({ img }))}
        autoPlayMs={2000}
        equalPanels
        className="page-hero-carousel"
        testIdPrefix="ashram-hero"
      />
    </section>
  );
}
