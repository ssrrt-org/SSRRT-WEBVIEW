import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MotherNaadiBody from "@/components/mother/MotherNaadiBody";
import MotherDetailHeader from "@/components/mother/MotherDetailHeader";
import AvatarNarrative from "@/components/mother/AvatarNarrative";
import { Eyebrow, Split } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { motherSections } from "@/constants/motherContent";
import NotFoundPage from "@/pages/NotFoundPage";

export default function MotherSectionPage() {
  const { sectionId: paramId } = useParams();
  const { pathname } = useLocation();
  const sectionId = paramId || pathname.replace(/^\/mother\//, "");
  const section = motherSections.find((s) => s.id === sectionId);
  const img = usePageImages(section?.path || pathname);

  if (!section || section.published === false) return <NotFoundPage />;

  const listedSections = motherSections.filter((s) => s.published !== false);
  const index = listedSections.findIndex((s) => s.id === sectionId);
  const prev = listedSections[index - 1];
  const next = listedSections[index + 1];

  return (
    <>
      <MotherDetailHeader eyebrow={section.eyebrow} title={section.navTitle} intro={section.title} />

      {sectionId === "avatar" ? (
        <AvatarNarrative narrative={section.narrative} image={img("split", section.image)} />
      ) : section.type === "stories" ? (
        <section className="two-stories">
          <div className="wrap">
            {section.image ? (
              <figure className="pillar-fig two-stories-figure">
                <img
                  src={img("hero", section.image)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ) : null}
            <Eyebrow>{section.eyebrow}</Eyebrow>
            <h2>{section.title}</h2>
            <div className="two-stories-grid">
              {section.stories.map((story, i) => (
                <article key={story.title}>
                  <span className="story-num">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{story.title}</h3>
                  <p>{story.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : section.type === "naadi" ? (
        <MotherNaadiBody />
      ) : (
        <Split
          eyebrow={section.eyebrow}
          title={section.title}
          image={img("split", section.image)}
          reverse={section.reverse}
          tint={section.tint}
        >
          {section.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </Split>
      )}

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="mother-back" to="/mother">
            About Amma <ChevronRight size={15} />
          </Link>
          <div className="child-nav-links">
            {prev && (
              <Link data-testid="mother-prev" to={prev.path}>
                ← {prev.navTitle}
              </Link>
            )}
            {next && (
              <Link data-testid="mother-next" to={next.path}>
                {next.navTitle} →
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
