import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import RuralUpliftmentScrollingHero from "@/components/rural/RuralUpliftmentScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { motherForNeedyProgrammeImages } from "@/constants/motherForNeedyImages";
import { medicalCentreTitle } from "@/constants/medicalContent";
import { narayanaCardExcerpt, narayanaTitle } from "@/constants/narayanaContent";
import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";

const programmes = [
  {
    id: "medical",
    to: "/seva/medical",
    title: medicalCentreTitle,
    tag: "Medical centres",
    note: docExcerpt("medical", { skip: 2 }),
    image: motherForNeedyProgrammeImages.medical,
  },
  {
    id: "food",
    to: "/seva/food",
    title: docTitle("food"),
    tag: "Food distribution",
    note: docExcerpt("food", { skip: 2 }),
    image: motherForNeedyProgrammeImages.food,
  },
  {
    id: "narayana",
    to: "/seva/narayana",
    title: narayanaTitle,
    tag: "Annual programme",
    note: narayanaCardExcerpt,
    image: motherForNeedyProgrammeImages.narayana,
  },
  {
    id: "volunteer",
    to: "/volunteering",
    title: docTitle("goshala_volunteer", { minLen: 20 }),
    tag: "Volunteering",
    note: docExcerpt("goshala_volunteer", { skip: 1 }),
    image: "/Goshala/Goshalaaa10.JPG",
  },
  {
    id: "goshala",
    to: "/goshala",
    title: "Goshala · village outreach",
    tag: "Gau seva",
    note: docExcerpt("goshala_adopt", { skip: 1 }),
    image: "/Goshala/Goshalaaa1.JPG",
  },
];

export default function RuralUpliftmentHubPage() {
  const img = usePageImages("/rural-upliftment");
  const cards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <div className="mother-page rural-hub-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Rural upliftment</Eyebrow>
          <h1 className="mother-page-title">Care, opportunity, and dignity in village communities.</h1>
          <p className="mother-page-lede">
            Medical support, education, water access, food seva, and volunteering that strengthen rural life around Karekura.
          </p>
        </div>
      </header>

      <RuralUpliftmentScrollingHero />

      <ProseSection
        paragraphs={[
          "The Trust works alongside rural communities to make essential care, nourishment, education, and practical support available where it is needed most.",
          "These programmes are built around dignity and continuity — meeting immediate needs while helping families and villages move toward greater stability.",
        ]}
      />

      <HubProgrammesSection
        hideHeader
        lede="Open each programme for full details — medical camps, food distribution, Narayan Seva, volunteering, and more."
        programmes={cards}
        testIdPrefix="rural"
        tint
      />

      <section className="home-visit">
        <div className="wrap home-visit-inner">
          <p>{proseParas("goshala_volunteer", { skip: 1, max: 1 })[0]}</p>
          <Link className="btn-solid" to="/contact" data-testid="rural-contact">
            Contact the office <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
