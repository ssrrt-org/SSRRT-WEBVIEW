import TripleImageCarousel from "@/components/shared/TripleImageCarousel";
import { volunteerHeroImages } from "@/constants/volunteerHeroImages";

const PLACEHOLDER_PANELS = 3;

export default function VolunteerScrollingHero({ images = volunteerHeroImages }) {
  const slides = (images || []).filter(Boolean);

  if (slides.length > 0) {
    return (
      <section className="page-banner-carousel" aria-label="Volunteering">
        <TripleImageCarousel
          slides={slides.map((img) => ({ img }))}
          autoPlayMs={slides.length > 1 ? 2000 : 0}
          equalPanels
          className="page-hero-carousel"
          testIdPrefix="volunteer-hero"
        />
      </section>
    );
  }

  return (
    <section className="page-banner-carousel" aria-label="Volunteering">
      <div
        className="hero-carousel hero-carousel-equal page-hero-carousel hero-carousel-placeholder"
        data-testid="volunteer-hero-carousel"
      >
        {Array.from({ length: PLACEHOLDER_PANELS }, (_, i) => (
          <figure
            key={i}
            className="carousel-panel"
            data-testid={`volunteer-hero-panel-${i}`}
          >
            <div className="carousel-panel-placeholder" aria-hidden="true" />
          </figure>
        ))}
      </div>
    </section>
  );
}
