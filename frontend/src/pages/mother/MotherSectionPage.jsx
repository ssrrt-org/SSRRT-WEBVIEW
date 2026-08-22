import { Link, useLocation, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Eyebrow, SlimHead, Split } from "@/components/shared/PageSections";
import { motherSections } from "@/constants/motherContent";
import NotFoundPage from "@/pages/NotFoundPage";

export default function MotherSectionPage() {
  const { sectionId: paramId } = useParams();
  const { pathname } = useLocation();
  const sectionId = paramId || pathname.replace(/^\/mother\//, "");
  const index = motherSections.findIndex((s) => s.id === sectionId);
  const section = motherSections[index];

  if (!section) return <NotFoundPage />;

  const prev = motherSections[index - 1];
  const next = motherSections[index + 1];

  return (
    <>
      <SlimHead
        eyebrow="Glimpses of Amma"
        title={section.navTitle}
      />

      {section.type === "stories" ? (
        <section className="two-stories">
          <div className="wrap">
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
      ) : (
        <Split
          eyebrow={section.eyebrow}
          title={section.title}
          image={section.image}
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
