import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { SlimHead } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";
import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";

const programmes = [
  {
    id: "medical",
    to: "/seva/medical",
    title: docTitle("medical"),
    tag: "Medical camps",
    note: docExcerpt("medical", { skip: 2 }),
    image: IMG.medical,
  },
  {
    id: "food",
    to: "/seva/food",
    title: docTitle("food"),
    tag: "Food seva",
    note: docExcerpt("food", { skip: 2 }),
    image: IMG.serve,
  },
  {
    id: "volunteer",
    to: "/volunteering",
    title: docTitle("goshala_volunteer", { minLen: 20 }),
    tag: "Volunteering",
    note: docExcerpt("goshala_volunteer", { skip: 1 }),
    image: IMG.volunteer,
  },
];

export default function RuralUpliftmentHubPage() {
  const img = usePageImages("/rural-upliftment");
  const cards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <>
      <SlimHead
        title={docTitle("sacred_ashram", { minLen: 20 })}
        intro={proseParas("mother_home", { skip: 7, max: 1 })[0]}
      />

      <ProseSection paragraphs={proseParas("sacred_ashram", { skip: 8, max: 2 })} />

      <HubProgrammesSection
        eyebrow="Programmes"
        title="Community upliftment"
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
    </>
  );
}
