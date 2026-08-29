import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import { SlimHead } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { docPageImages } from "@/constants/docPageImages";
import { allSevaPrograms, narayanaProgram, sevaPillars } from "@/constants/sevaContent";
import NotFoundPage from "@/pages/NotFoundPage";

export default function SevaPillarPage() {
  const { pillarId } = useParams();
  const pillar = allSevaPrograms.find((p) => p.id === pillarId);
  const img = usePageImages(pillar?.path || `/seva/${pillarId}`);

  if (!pillar) return <NotFoundPage />;

  const isNarayana = pillarId === "narayana";
  const pillarIndex = sevaPillars.findIndex((p) => p.id === pillarId);
  const prev = isNarayana ? sevaPillars[sevaPillars.length - 1] : sevaPillars[pillarIndex - 1];
  const next = isNarayana ? null : pillarIndex < sevaPillars.length - 1 ? sevaPillars[pillarIndex + 1] : narayanaProgram;
  const mediaKey = isNarayana ? "food" : pillarId;

  return (
    <>
      <SlimHead title={pillar.title || pillar.navTitle} />

      {isNarayana ? (
        <ProseSection
          paragraphs={pillar.paragraphs}
          images={docPageImages.food}
          tint
        />
      ) : (
        <section className={`pillar-body${pillar.tint ? " tint" : ""}`}>
          <div className={`wrap pillar-body-grid pillar-body-wide${pillar.reverse ? " rev" : ""}`}>
            <figure className="pillar-fig">
              <img src={img("pillar-figure", pillar.image)} alt={pillar.imageAlt} />
            </figure>
            <ProseSection
              className="pillar-prose-embed"
              embedded
              wide
              paragraphs={pillar.paragraphs}
              images={docPageImages[mediaKey] || []}
            />
          </div>
        </section>
      )}

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
    </>
  );
}
