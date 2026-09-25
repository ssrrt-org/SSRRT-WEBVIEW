import { Link } from "react-router-dom";
import ConsecratedSacredHero from "@/components/ashram/ConsecratedSacredHero";
import ProseSection from "@/components/shared/ProseSection";
import { consecratedSpaceTempleImages } from "@/constants/consecratedSpaceHeroImages";
import { docPageImages } from "@/constants/docPageImages";
import { IMG } from "@/constants/images";
import { usePageImages } from "@/context/CmsContext";
import { sacredHeroCopy } from "@/lib/sacredAshramHero";
import { proseParas } from "@/lib/docContent";

const paragraphs = proseParas("harake_nandi", { skip: 1 });
const heroCopy = sacredHeroCopy("harake_nandi", { breadcrumbLabel: "Harake Nandi" });

export default function AshramHarakeNandiPage() {
  const img = usePageImages("/ashram/harake-nandi");
  const heroFigure = img("hero-figure", consecratedSpaceTempleImages["harake-nandi"]);
  const heroBg = img("hero-bg", IMG.manidweepa);

  return (
    <div className="temple-page">
      <ConsecratedSacredHero
        {...heroCopy}
        heroFigure={heroFigure}
        heroBg={heroBg}
        offerTestId="harake-offer-prayers"
        visitTestId="harake-plan-visit"
      />

      <ProseSection paragraphs={paragraphs} images={docPageImages.harake_nandi} />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link to="/sevas/nandi-abhisheka" data-testid="harake-nandi-abhisheka">
            Nandi Abhisheka →
          </Link>
        </div>
      </section>
    </div>
  );
}
