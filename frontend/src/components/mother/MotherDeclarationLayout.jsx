import { Eyebrow } from "@/components/shared/PageSections";
import {
  declarationAftermath,
  declarationAttributes,
  declarationClosing,
  declarationDiscourse,
  declarationMilestones,
  declarationNadiClosing,
  declarationNadiGloss,
  declarationNadiIntro,
  declarationNadiSlokas,
  declarationProclamation,
  declarationPrologue,
  declarationSlokaSection,
} from "@/constants/motherDeclarationContent";
import { IMG } from "@/constants/images";

const isQuoted = (text) => /^["“]/.test(String(text).trim());

function DiscourseBlock({ text, index }) {
  if (isQuoted(text)) {
    return (
      <blockquote className="decl-discourse-quote" key={`q-${index}`}>
        {text}
      </blockquote>
    );
  }
  return <p key={`p-${index}`}>{text}</p>;
}

export default function MotherDeclarationLayout() {
  return (
    <div className="decl-page">
      <section className="decl-milestones" aria-label="Declaration at a glance">
        <div className="wrap decl-milestones-grid">
          {declarationMilestones.map((item) => (
            <div className="decl-milestone" key={item.label}>
              <span className="decl-milestone-label">{item.label}</span>
              <strong className="decl-milestone-value">{item.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="decl-prologue">
        <div className="wrap decl-prologue-inner">
          <Eyebrow gold>Before the proclamation</Eyebrow>
          <h2 className="decl-section-title">Goddess Rajarajeshwari proclaimed.</h2>
          {declarationPrologue.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="decl-attributes tint">
        <div className="wrap">
          <Eyebrow>Primordial principle</Eyebrow>
          <h2 className="decl-section-title">Amma affirmed with these words</h2>
          <ul className="decl-attributes-grid">
            {declarationAttributes.map((line) => (
              <li key={line}>
                <span className="decl-attribute-mark" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="decl-sloka">
        <div className="wrap decl-sloka-card">
          <Eyebrow gold>Avataric declaration · 29 March 1997</Eyebrow>
          <p className="decl-sloka-intro">{declarationSlokaSection.intro}</p>
          <div className="decl-sloka-text" lang="sa">
            {declarationSlokaSection.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          {declarationSlokaSection.meaning && (
            <p className="decl-sloka-meaning">{declarationSlokaSection.meaning}</p>
          )}
        </div>
      </section>

      <section className="decl-discourse">
        <div className="wrap decl-discourse-inner">
          <Eyebrow>Verbatim address</Eyebrow>
          <h2 className="decl-section-title">Words spoken on that day</h2>
          <div className="decl-discourse-body">
            {declarationDiscourse.map((paragraph, index) => (
              <DiscourseBlock text={paragraph} index={index} key={`${index}-${paragraph.slice(0, 32)}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="decl-proclamation" aria-label="The proclamation">
        <div className="wrap decl-proclamation-inner">
          <figure className="decl-proclamation-figure">
            <img src={IMG.amma} alt="Srimad Sai Rajarajeshwari" loading="lazy" decoding="async" width={480} height={600} />
          </figure>
          <div className="decl-proclamation-copy">
            <Eyebrow gold>The announcement</Eyebrow>
            <blockquote className="decl-proclamation-quote">
              <p>{declarationProclamation}</p>
            </blockquote>
            {declarationClosing && <p className="decl-proclamation-closing">{declarationClosing}</p>}
          </div>
        </div>
      </section>

      <section className="decl-aftermath tint">
        <div className="wrap decl-aftermath-inner">
          <Eyebrow>After the declaration</Eyebrow>
          {declarationAftermath.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {declarationNadiIntro && <p className="decl-nadi-intro">{declarationNadiIntro}</p>}
          {declarationNadiSlokas.map((group, index) => (
            <pre key={`nadi-${index}`} className="sloka-block decl-nadi-sloka" lang="sa">
              {group.filter(Boolean).join("\n")}
            </pre>
          ))}
          {declarationNadiGloss && <p className="decl-nadi-gloss">{declarationNadiGloss}</p>}
          {declarationNadiClosing.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
