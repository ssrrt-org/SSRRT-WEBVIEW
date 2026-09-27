import TempleSanctuaryHero from "@/components/ashram/TempleSanctuaryHero";

/** Consecrated Space doc pages (Bhairava, Harake Nandi, etc.). */
export default function ConsecratedSacredHero({
  breadcrumbCurrent,
  mantra = "",
  title,
  tag = "",
  intro,
  quote = "",
  heroFigure,
  heroBg,
  offerTestId = "sacred-offer-prayers",
  visitTestId = "sacred-plan-visit",
}) {
  return (
    <TempleSanctuaryHero
      breadcrumbCurrent={breadcrumbCurrent}
      mantra={mantra}
      title={title}
      tag={tag}
      intro={intro}
      quote={quote}
      heroFigure={heroFigure}
      heroBg={heroBg}
      offerTestId={offerTestId}
      visitTestId={visitTestId}
    />
  );
}
