import { Link } from "react-router-dom";
import ConsecratedSacredHero from "@/components/ashram/ConsecratedSacredHero";
import ProseSection from "@/components/shared/ProseSection";
import { consecratedSpaceTempleImages } from "@/constants/consecratedSpaceHeroImages";
import { docPageImages } from "@/constants/docPageImages";
import { IMG } from "@/constants/images";
import { usePageImages } from "@/context/CmsContext";
import { sacredHeroCopy } from "@/lib/sacredAshramHero";
import { proseParas } from "@/lib/docContent";

const paragraphs = proseParas("bhairava", { skip: 1 });
const heroCopy = sacredHeroCopy("bhairava", { breadcrumbLabel: "Kaala Bhairava Trishula" });

export default function AshramBhairavaPage() {
  const img = usePageImages("/ashram/bhairava");
  const heroFigure = img("hero-figure", consecratedSpaceTempleImages.bhairava);
  const heroBg = img("hero-bg", IMG.manidweepa);

  return (
    <div className="temple-page">
      <ConsecratedSacredHero
        {...heroCopy}
        heroFigure={heroFigure}
        heroBg={heroBg}
        offerTestId="bhairava-offer-prayers"
        visitTestId="bhairava-plan-visit"
      />

      <ProseSection paragraphs={paragraphs} images={docPageImages.bhairava} />

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link to="/ashram/shiva" data-testid="bhairava-shiva-temple">
            Shiva temple →
          </Link>
        </div>
      </section>
    </div>
  );
}
