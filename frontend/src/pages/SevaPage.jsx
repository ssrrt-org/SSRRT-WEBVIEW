import { Link } from "react-router-dom";
import SevaScrollingHero from "@/components/seva/SevaScrollingHero";
import HashRedirect from "@/components/shared/HashRedirect";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { allSevaPrograms, sevaPillars } from "@/constants/sevaContent";
import { IMG } from "@/constants/images";

const sevaIds = allSevaPrograms.map((p) => p.id);

const programmeImages = {
  medical: sevaPillars.find((p) => p.id === "medical")?.image,
  food: sevaPillars.find((p) => p.id === "food")?.image,
  narayana: "/Seva images/sevas25.JPG",
};

export default function SevaPage() {
  const img = usePageImages("/seva");
  const programmes = allSevaPrograms.map((p) => ({
    id: p.id,
    to: p.path,
    title: p.navTitle,
    tag: p.id === "narayana" ? "Annual programme" : "Community seva",
    note: p.paragraphs?.[0]?.slice(0, 140) ? `${p.paragraphs[0].slice(0, 140)}…` : "",
    image: programmeImages[p.id] || IMG.serve,
    testid: `seva-link-${p.id}`,
  }));
  const cards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <div className="mother-page seva-programmes-page">
      <HashRedirect basePath="/seva" ids={sevaIds} />

      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Seva programmes</Eyebrow>
          <h1 className="mother-page-title">Practical service in Karekura and beyond.</h1>
          <p className="mother-page-lede">
            Medical care, food distribution, and Narayana Seva — pathways to support communities around the Trust.
          </p>
        </div>
      </header>

      <SevaScrollingHero />

      <section className="pillar-nav">
        <div className="wrap">
          {sevaPillars.map((p) => (
            <Link key={p.id} to={p.path} data-testid={`pillar-nav-${p.id}`}>
              <span>{p.navTitle}</span>
            </Link>
          ))}
          <Link to="/seva/narayana" data-testid="pillar-nav-narayana">
            <span>Narayana Seva</span>
          </Link>
          <Link to="/sevas" data-testid="pillar-nav-ashram-sevas">
            <span>Ashram sevas</span>
          </Link>
        </div>
      </section>

      <HubProgrammesSection
        hideHeader
        lede="Choose a programme to read its story and learn how the Trust serves medical needs, hunger, and annual Narayana Seva."
        programmes={cards}
        testIdPrefix="seva-hub"
        tint
      />
    </div>
  );
}
