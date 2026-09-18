import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SevaScrollingHero from "@/components/seva/SevaScrollingHero";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { SUPPORT_CAUSE_LABEL } from "@/constants/supportLabels";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";
import { docExcerpt, proseParas } from "@/lib/docContent";

const programmes = [
  {
    id: "medical",
    to: "/seva/medical",
    title: docExcerpt("medical", { maxLen: 60 }),
    tag: "Medical care",
    note: docExcerpt("medical", { skip: 1 }),
    image: IMG.medical,
  },
  {
    id: "medical-village",
    to: "/seva/medical-village",
    title: "Medical Support in the Village",
    tag: "Village care",
    note: "Medical support that reaches families in surrounding villages.",
    image: IMG.medical,
  },
  {
    id: "food",
    to: "/seva/food",
    title: docExcerpt("food", { maxLen: 60 }),
    tag: "Food seva",
    note: docExcerpt("food", { skip: 1 }),
    image: IMG.serve,
  },
  {
    id: "narayana",
    to: "/seva/narayana",
    title: "Narayana Seva",
    tag: "Annual programme",
    note: docExcerpt("food", { skip: 1 }),
    image: IMG.kitchen,
  },
];

export default function MotherForNeedyHubPage() {
  const img = usePageImages("/mother-for-needy");
  const cards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <>
      <SevaScrollingHero />

      <section className="mother-subhead">
        <div className="wrap">
          <Eyebrow gold>Mother for the Needy</Eyebrow>
          <h1>Care, food, and dignity across communities.</h1>
          <p className="mother-subhead-intro">
            Explore the Trust's work in medical care, food seva, village support, education, and service beyond
            Karekura. Each programme has its own page with further details.
          </p>
        </div>
      </section>

      <HubProgrammesSection
        eyebrow="Programmes"
        title="Ways the Trust serves"
        lede="Choose a programme to read its story, see how the work reaches communities, and find ways to support it."
        programmes={cards}
        testIdPrefix="mother-needy"
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
    </>
  );
}
