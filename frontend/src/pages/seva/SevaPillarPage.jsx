import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MedicalScrollingHero from "@/components/medical/MedicalScrollingHero";
import SevaScrollingHero from "@/components/seva/SevaScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow } from "@/components/shared/PageSections";
import { docPageImages } from "@/constants/docPageImages";
import { docExcerpt } from "@/lib/docContent";
import { allSevaPrograms, narayanaProgram, sevaPillars } from "@/constants/sevaContent";
import NotFoundPage from "@/pages/NotFoundPage";

function CommunitySevaLayout({ eyebrow, title, lede, paragraphs, images, tint, childNav }) {
  return (
    <div className="mother-page seva-community-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mother-page-title">{title}</h1>
          {lede ? <p className="mother-page-lede">{lede}</p> : null}
        </div>
      </header>

      <SevaScrollingHero />

      <ProseSection paragraphs={paragraphs} images={images} tint={tint} />

      {childNav}
    </div>
  );
}

export default function SevaPillarPage() {
  const { pillarId } = useParams();
  const pillar = allSevaPrograms.find((p) => p.id === pillarId);

  if (!pillar) return <NotFoundPage />;

  const isNarayana = pillarId === "narayana";
  const isMedical = pillarId === "medical";
  const isFood = pillarId === "food";
  const pillarIndex = sevaPillars.findIndex((p) => p.id === pillarId);
  const prev = isNarayana ? sevaPillars[sevaPillars.length - 1] : sevaPillars[pillarIndex - 1];
  const next = isNarayana ? null : pillarIndex < sevaPillars.length - 1 ? sevaPillars[pillarIndex + 1] : narayanaProgram;

  const childNav = (
    <section className="child-nav tint">
      <div className="wrap child-nav-inner">
        <Link className="btn-ghost-dark" data-testid="seva-back" to="/seva">
          All seva programmes <ChevronRight size={15} />
        </Link>
        <div className="child-nav-links">
          {prev && <Link data-testid="seva-prev" to={prev.path}>← {prev.navTitle}</Link>}
          {next && <Link data-testid="seva-next" to={next.path}>{next.navTitle} →</Link>}
        </div>
      </div>
    </section>
  );

  if (isMedical) {
    const title = pillar.title || pillar.navTitle;
    const lede = docExcerpt("medical", { skip: 1, maxLen: 240 });

    return (
      <div className="mother-page medical-hub-page">
        <header className="mother-page-head">
          <div className="wrap mother-page-head-inner">
            <Eyebrow>Medical service</Eyebrow>
            <h1 className="mother-page-title">{title}</h1>
            <p className="mother-page-lede">{lede}</p>
          </div>
        </header>

        <MedicalScrollingHero />

        <ProseSection paragraphs={pillar.paragraphs} images={docPageImages.medical} />

        {childNav}
      </div>
    );
  }

  if (isFood || isNarayana) {
    const eyebrow = isNarayana ? "Narayana Seva" : "Food seva";
    const lede = docExcerpt(isNarayana ? "food" : "food", { skip: 1, maxLen: 240 });

    return (
      <CommunitySevaLayout
        eyebrow={eyebrow}
        title={pillar.title || pillar.navTitle}
        lede={lede}
        paragraphs={pillar.paragraphs}
        images={docPageImages.food}
        tint={isNarayana}
        childNav={childNav}
      />
    );
  }

  return null;
}
