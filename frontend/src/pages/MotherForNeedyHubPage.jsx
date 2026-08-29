import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { SlimHead } from "@/components/shared/PageSections";
import { docPageImages } from "@/constants/docPageImages";
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
      <SlimHead title={docExcerpt("medical", { maxLen: 80 })} intro={docExcerpt("medical", { skip: 1 })} />

      <ProseSection paragraphs={proseParas("medical", { skip: 1 })} images={docPageImages.medical} />

      <ProseSection paragraphs={proseParas("food", { skip: 1 })} images={docPageImages.food} tint />

      <HubProgrammesSection
        eyebrow="Programmes"
        title="Medical care and food seva"
        programmes={cards}
        testIdPrefix="mother-needy"
      />

      <section className="home-visit">
        <div className="wrap home-visit-inner">
          <p>{proseParas("mother_home", { skip: 7, max: 1 })[0]}</p>
          <div className="home-visit-actions">
            <Link className="btn-solid" to="/donate" data-testid="mother-needy-donate">
              Support the Trust <ArrowUpRight size={16} />
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
