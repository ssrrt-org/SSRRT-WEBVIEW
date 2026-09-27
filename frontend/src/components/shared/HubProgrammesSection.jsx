import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow } from "@/components/shared/PageSections";

/** Visual programme card grid used on seva hub pages. */
export default function HubProgrammesSection({
  eyebrow = "Programmes",
  title,
  lede,
  programmes,
  testIdPrefix = "hub",
  tint = false,
  compact = false,
  hideHeader = false,
  className = "",
  eagerCount = 0,
}) {
  const showHeader = !hideHeader && (eyebrow || title);

  return (
    <section
      className={`hub-programmes${tint ? " tint" : ""}${compact ? " hub-programmes-compact" : ""}${hideHeader ? " hub-programmes-headless" : ""}${className ? ` ${className}` : ""}`}
    >
      <div className="wrap">
        {showHeader && eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        {showHeader && title ? <h2 className="section-h">{title}</h2> : null}
        {lede && <p className="hub-programmes-lede">{lede}</p>}
        <div className="hub-programme-grid">
          {programmes.map((program, index) => (
            <Link
              key={program.id}
              to={program.to}
              className="hub-programme-card"
              data-testid={program.testid || `${testIdPrefix}-link-${program.id}`}
            >
              <article>
                <div className="hub-programme-img">
                  <img
                    src={program.image}
                    alt={program.title}
                    loading={index < eagerCount ? "eager" : "lazy"}
                    fetchPriority={index < eagerCount ? "high" : undefined}
                    decoding="async"
                    width={800}
                    height={500}
                    style={
                      program.imagePosition
                        ? { objectPosition: program.imagePosition }
                        : undefined
                    }
                  />
                </div>
                <div className="hub-programme-body">
                  <span className="temple-card-tag">{program.tag}</span>
                  <h3>{program.title}</h3>
                  <p>{program.note}</p>
                  <span className="temple-card-more">
                    About {program.title} <ArrowUpRight size={14} />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
