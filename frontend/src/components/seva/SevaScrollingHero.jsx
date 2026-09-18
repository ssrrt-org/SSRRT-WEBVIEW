import TripleImageCarousel from "@/components/shared/TripleImageCarousel";

const sevaImages = [
  "/Seva images/27_Speaking.jpg",
  "/Seva images/Overseasservice2.jpg",
  "/Seva images/SevaatAmerica.jpg",
  "/Seva images/Sevafortheol.JPG",
  "/Seva images/medical2.JPG",
  "/Seva images/seva1.JPG",
  "/Seva images/vilIntProj.JPG",
  "/Seva images/vilIntProj2.JPG",
  "/Seva images/village.JPG",
  "/Seva images/village1.JPG",
];

export default function SevaScrollingHero({ caption }) {
  return (
    <TripleImageCarousel
      slides={sevaImages.map((img) => ({ img, caption }))}
      autoPlayMs={2000}
      testIdPrefix="seva-hero"
    />
  );
}
