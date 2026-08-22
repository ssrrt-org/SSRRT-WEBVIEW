import { Link } from "react-router-dom";
import { Eyebrow, SlimHead, Quote } from "@/components/shared/PageSections";
import HashRedirect from "@/components/shared/HashRedirect";
import { allSevaPrograms, sevaPillars } from "@/constants/sevaContent";
import { Droplet, GraduationCap, ShieldCheck, Sparkles, Stethoscope, Utensils } from "lucide-react";

const iconMap = {
  medical: Stethoscope,
  education: GraduationCap,
  water: Droplet,
  relief: ShieldCheck,
  food: Utensils,
  narayana: Sparkles,
};

const sevaIds = allSevaPrograms.map((p) => p.id);

export default function SevaPage() {
  return (
    <>
      <HashRedirect basePath="/seva" ids={sevaIds} />

      <SlimHead
        eyebrow="Seva"
        title="Medical care, education, water, relief, and food."
      />

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
          <h2 className="section-h">All programmes</h2>
          <ul className="subpage-links-list">
            {allSevaPrograms.map((p) => (
              <li key={p.id}>
                <Link to={p.path} data-testid={`seva-link-${p.id}`}>
                  <span className="subpage-links-title">{p.navTitle}</span>
                  {p.eyebrow && <span className="subpage-links-note">{p.eyebrow}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Quote author="Taittiriya Upanishad">Annam Brahma — Food is God.</Quote>
    </>
  );
}
