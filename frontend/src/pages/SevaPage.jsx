import { Link } from "react-router-dom";
import { SlimHead } from "@/components/shared/PageSections";
import HashRedirect from "@/components/shared/HashRedirect";
import { allSevaPrograms, sevaPillars } from "@/constants/sevaContent";
import { Stethoscope, Utensils, Sparkles } from "lucide-react";
import { docTitle } from "@/lib/docContent";

const iconMap = {
  medical: Stethoscope,
  food: Utensils,
  narayana: Sparkles,
};

const sevaIds = allSevaPrograms.map((p) => p.id);

export default function SevaPage() {
  return (
    <>
      <HashRedirect basePath="/seva" ids={sevaIds} />

      <SlimHead title={docTitle("medical", { minLen: 15 })} intro={docTitle("food", { minLen: 15 })} />

      <section className="pillar-nav">
        <div className="wrap">
          {sevaPillars.map((p) => {
            const Icon = iconMap[p.id];
            return (
              <Link key={p.id} to={p.path} data-testid={`pillar-nav-${p.id}`}>
                <Icon size={17} aria-hidden="true" /><span>{p.navTitle}</span>
              </Link>
            );
          })}
          <Link to="/seva/narayana" data-testid="pillar-nav-narayana">
            <Sparkles size={17} aria-hidden="true" /><span>Narayana Seva</span>
          </Link>
        </div>
      </section>

      <section className="subpage-links">
        <div className="wrap">
          <ul className="subpage-links-list">
            {allSevaPrograms.map((p) => (
              <li key={p.id}>
                <Link to={p.path} data-testid={`seva-link-${p.id}`}>
                  <span className="subpage-links-title">{p.navTitle}</span>
                  <span className="subpage-links-note">{p.paragraphs?.[0]?.slice(0, 120)}…</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
