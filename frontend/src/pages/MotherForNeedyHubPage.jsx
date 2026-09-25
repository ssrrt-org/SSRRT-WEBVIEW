import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import MotherForNeedyScrollingHero from "@/components/mother/MotherForNeedyScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { SUPPORT_CAUSE_LABEL } from "@/constants/supportLabels";
import { docPageImages } from "@/constants/docPageImages";
import { usePageImages } from "@/context/CmsContext";
import { motherForNeedyProgrammeImages } from "@/constants/motherForNeedyImages";
import { docExcerpt, proseParas } from "@/lib/docContent";

const programmes = [
  {
    id: "medical",
    to: "/seva/medical",
    title: docExcerpt("medical", { maxLen: 60 }),
    tag: "Medical care",
    note: docExcerpt("medical", { skip: 1 }),
    image: motherForNeedyProgrammeImages.medical,
  },
  {
    id: "medical-village",
    to: "/seva/medical-village",
    title: "Medical Support in the Village",
    tag: "Village care",
    note: "Medical support that reaches families in surrounding villages.",
    image: motherForNeedyProgrammeImages["medical-village"],
  },
  {
    id: "food",
    to: "/seva/food",
    title: docExcerpt("food", { maxLen: 60 }),
    tag: "Food seva",
    note: docExcerpt("food", { skip: 1 }),
    image: motherForNeedyProgrammeImages.food,
  },
  {
    id: "narayana",
    to: "/seva/narayana",
    title: "Narayana Seva",
    tag: "Annual programme",
    note: docExcerpt("food", { skip: 1 }),
    image: motherForNeedyProgrammeImages.narayana,
  },
];

const storySections = [
  {
    eyebrow: "Medical camps",
    title: "Free care across villages",
    paragraphs: proseParas("medical", { skip: 1, max: 2 }),
  },
  {
    eyebrow: "Food seva",
    title: "Narayana Seva and daily nourishment",
    paragraphs: proseParas("food", { skip: 1, max: 2 }),
    tint: true,
  },
];

export default function MotherForNeedyHubPage() {
  const img = usePageImages("/mother-for-needy");
  const cards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <div className="mother-page needy-hub-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Mother for the Needy</Eyebrow>
          <h1 className="mother-page-title">Care, food, and dignity across communities.</h1>
          <p className="mother-page-lede">
            Medical care, food seva, and village support through the Trust&apos;s Goshala, dispensary, and community programmes.
          </p>
        </div>
      </header>

      <MotherForNeedyScrollingHero />

      {storySections.map((section, index) => (
        <ProseSection
          key={section.title}
          eyebrow={section.eyebrow}
          title={section.title}
          paragraphs={section.paragraphs}
          images={docPageImages.mother_needy?.slice(index * 2, index * 2 + 2)}
          tint={section.tint}
        />
      ))}

      <HubProgrammesSection
        hideHeader
        lede="Open each programme for full details — medical camps, village support, food seva, and Narayan Seva."
        programmes={cards}
        testIdPrefix="mother-needy"
        tint
      />

      <section className="home-visit">
        <div className="wrap home-visit-inner">
          <p>{proseParas("mother_home", { skip: 7, max: 1 })[0]}</p>
          <div className="home-visit-actions">
            <Link className="btn-solid" to="/donate" data-testid="mother-needy-donate">
              {SUPPORT_CAUSE_LABEL} <ArrowUpRight size={16} />
            </Link>
            <Link className="btn-ghost-dark" to="/volunteering" data-testid="mother-needy-volunteer">
              Volunteer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
