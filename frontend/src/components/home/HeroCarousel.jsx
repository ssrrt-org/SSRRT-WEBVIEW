import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { homeHeroSlides } from "@/constants/homeHeroImages";
import { useCms } from "@/context/CmsContext";

const HOME_HERO_PATH = "/home_hero/";

function resolveHomeSlides(cmsSlides) {
  if (!cmsSlides?.length) return homeHeroSlides;
  const usesHomeHero = cmsSlides.every((slide) => String(slide.img || "").includes(HOME_HERO_PATH));
  if (usesHomeHero) {
    return cmsSlides.map((slide) => ({
      img: slide.img,
      label: slide.label,
      caption: slide.caption,
    }));
  }
  return homeHeroSlides;
}

export default function HeroCarousel() {
  const { data } = useCms();
  const slides = resolveHomeSlides(data.homeCarousel);

  return (
    <TripleImageCarousel slides={slides} testIdPrefix="hero" className="hero-carousel-home" />
  );
}
