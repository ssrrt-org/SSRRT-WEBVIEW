import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { useCms } from "@/context/CmsContext";

const fallbackSlides = [
  { img: "/ssrrt/AmmaGanesha.jpg", label: "First Blessings", caption: "Ganesha Sannidhi" },
  { img: "/ssrrt/Umother.jpg", label: "Amma", caption: "The Divine Mother" },
  { img: "/ssrrt/ManiDweepa.jpg", label: "Mani Dweepa", caption: "The Sacred Ashram" },
  { img: "/ssrrt/ShirdiSai.jpg", label: "Shirdi Sai Baba", caption: "Temple Sannidhi" },
  { img: "/ssrrt/Cow1.jpeg", label: "Project Kaamadhenau", caption: "Gau Seva" },
  { img: "/ssrrt/IMG-20250923-WA0025.jpg", label: "Narayana Seva", caption: "Feeding the needy" },
];

export default function HeroCarousel() {
  const { data } = useCms();
  const slides = (data.homeCarousel?.length ? data.homeCarousel : fallbackSlides).map((slide) => ({
    img: slide.img,
    label: slide.label,
    caption: slide.caption,
  }));

  return <TripleImageCarousel slides={slides} testIdPrefix="hero" />;
}
