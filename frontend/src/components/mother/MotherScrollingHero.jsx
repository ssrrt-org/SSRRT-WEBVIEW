import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { motherHeroImages } from "@/constants/motherHeroImages";

export default function MotherScrollingHero({ images = motherHeroImages, caption }) {
  return (
    <TripleImageCarousel
      slides={images.map((img) => ({ img, caption }))}
      autoPlayMs={2000}
      testIdPrefix="mother-hero"
    />
  );
}
