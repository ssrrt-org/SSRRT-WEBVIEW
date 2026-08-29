import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Eyebrow, SlimHead } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { allSevaPrograms, narayanaProgram, sevaPillars } from "@/constants/sevaContent";
import NotFoundPage from "@/pages/NotFoundPage";

export default function SevaPillarPage() {
  const { pillarId } = useParams();
  const isNarayana = pillarId === "narayana";
  const pillar = allSevaPrograms.find((p) => p.id === pillarId);
  const img = usePageImages(pillar?.path || `/seva/${pillarId}`);

  if (!pillar) return <NotFoundPage />;
  const pillarIndex = sevaPillars.findIndex((p) => p.id === pillarId);
  const prev = isNarayana ? sevaPillars[sevaPillars.length - 1] : sevaPillars[pillarIndex - 1];
  const next = isNarayana ? null : pillarIndex < sevaPillars.length - 1 ? sevaPillars[pillarIndex + 1] : narayanaProgram;

  return (
    <>
      <SlimHead
        eyebrow={isNarayana ? "Narayana Seva" : pillar.eyebrow.split(" · ")[0]}
        title={pillar.navTitle}
      />

      {isNarayana ? (
        <section className="narayana-v2">
          <div className="wrap narayana-v2-grid">
            <div>
              <Eyebrow gold>{narayanaProgram.eyebrow}</Eyebrow>
              <h2>Food is God. <em>To offer food is to offer the Divine.</em></h2>
              {narayanaProgram.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
              <div className="narayana-actions">
                <Link className="btn-solid" data-testid="seva-narayana-donate" to="/donate?purpose=narayana">
                  Support Narayana Seva <ArrowUpRight size={16} />
                </Link>
                <Link className="btn-ghost" data-testid="seva-narayana-volunteer" to="/volunteering">
                  Volunteer <ChevronRight size={15} />
                </Link>
              </div>
            </div>
            <ul className="beneficiaries">
              {narayanaProgram.beneficiaries.map(([t, d]) => (
                <li key={t}>
                  <div><strong>{t}</strong><span>{d}</span></div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className={`pillar-body${pillar.tint ? " tint" : ""}`}>
          <div className={`wrap pillar-body-grid${pillar.reverse ? " rev" : ""}`}>
            <figure className="pillar-fig"><img src={img("pillar-figure", pillar.image)} alt={pillar.imageAlt} /></figure>
            <div>
              <Eyebrow gold>{pillar.eyebrow}</Eyebrow>
              <h2>{pillar.title}</h2>
              {pillar.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
            </div>
          </div>
        </section>
      )}

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="seva-back" to="/seva">
            All seva programmes <ChevronRight size={15} />
          </Link>
          <div className="child-nav-links">
            {prev && (
              <Link data-testid="seva-prev" to={prev.path}>
                ← {prev.navTitle}
              </Link>
            )}
            {next && (
              <Link data-testid="seva-next" to={next.path}>
                {next.navTitle} →
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
