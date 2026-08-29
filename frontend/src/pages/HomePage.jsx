import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";
import ExploreGrid from "@/components/shared/ExploreGrid";
import ProseSection from "@/components/shared/ProseSection";
import { Eyebrow, SectionHeading } from "@/components/shared/PageSections";
import { motherSections } from "@/constants/motherContent";
import {
  homeNarayanaParagraphs,
  homePillars,
  motherHomeIntro,
  motherHomeNarrative,
  motherVirtues,
  trustHomeParagraphs,
} from "@/constants/homeContent";
import { docTitle } from "@/lib/docContent";
import { docPageImages } from "@/constants/docPageImages";

const motherExplore = motherSections.map((s) => {
  const text = s.paragraphs?.[0] || s.stories?.[0]?.text || "";
  return {
    to: s.path,
    title: s.navTitle,
    note: text.length > 100 ? `${text.slice(0, 100)}…` : text,
  };
});

export default function HomePage() {
  return (
    <>
      <section className="hero-v2" id="home">
        <HeroCarousel />
        <div className="wrap hero-v2-content">
          <div className="hero-ribbon" data-testid="hero-ribbon">
            Where <em>seva</em> becomes the quiet language of devotion.
          </div>
          <p className="hero-lede" data-testid="hero-lede">
            Nestled on the tranquil banks of the River Cauvery, the Ashram is a living spiritual ecosystem —<br className="hero-lede-break" />
            caring for cows, rural communities, and consecrated temple spaces, guided by the grace of Amma.
          </p>
          <div className="hero-cta-strip">
            <Link className="hero-cta-chip" data-testid="hero-donate-button" to="/donate">
              Support the Trust
            </Link>
            <Link className="hero-cta-chip hero-cta-chip-accent" data-testid="hero-volunteer-button" to="/volunteering">
              Volunteer
            </Link>
          </div>
        </div>
      </section>

      <section className="home-mother">
        <div className="wrap home-mother-grid">
          <figure className="home-mother-figure">
            <img src="/ssrrt/DivineMotherHome.png" alt="Divine Mother Srimad Sai Rajarajeshwari" loading="eager" />
          </figure>
          <div className="home-mother-copy">
            <Eyebrow gold>Divine Mother</Eyebrow>
            <h2>Divine Mother, Srimad Sai Rajarajeshwari</h2>
            <p>{motherHomeIntro}</p>
            {motherHomeNarrative && <p>{motherHomeNarrative}</p>}
          </div>
        </div>
      </section>

      <section className="home-virtues tint">
        <div className="wrap">
          <Eyebrow>Five qualities of daily life</Eyebrow>
          <h2 className="section-h">Embody these, and draw nearer to the Divine.</h2>
          <div className="home-virtues-grid">
            {motherVirtues.map((virtue) => (
              <article key={virtue.name}>
                <h3>{virtue.name}</h3>
                <p>{virtue.text}</p>
              </article>
            ))}
          </div>
          <div className="home-inline-links">
            <Link data-testid="home-amma-link" to="/mother">
              Glimpses of Amma <ArrowUpRight size={14} />
            </Link>
            <Link data-testid="home-avataarhood-link" to="/mother/avataarhood">
              The Avataarhood <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-trust tint">
        <div className="wrap home-trust-grid">
          <div className="home-trust-copy">
            <Eyebrow gold>SSRRT · Karekura</Eyebrow>
            {trustHomeParagraphs.map((p) => (
              <p key={p.slice(0, 48)}>{p}</p>
            ))}
            <div className="home-inline-links">
              <Link data-testid="home-about-trust" to="/about">
                About the Trust <ArrowUpRight size={14} />
              </Link>
              <Link data-testid="home-ashram-link" to="/ashram">
                Ashram &amp; Temples <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
          <figure className="home-mother-figure home-trust-figure">
            <img src="/ssrrt/DivineMotherHome.png" alt="Srimad Sai Rajarajeshwari Trust, Karekura" loading="lazy" />
          </figure>
        </div>
      </section>

      <section className="pillar-section">
        <div className="wrap">
          <SectionHeading eyebrow="The work of the Trust" title="Paths into seva" />
          <div className="pillar-grid pillar-grid-4 pillar-grid-equal">
            {homePillars.map(({ n, title, text, path, linkLabel }) => (
              <article className="pillar-card" key={path}>
                <div className="pillar-number">{n}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link data-testid={`home-${path.replaceAll(/[^a-z0-9]+/g, "-")}-link`} to={path}>
                  {linkLabel} <ArrowUpRight size={15} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ExploreGrid title="More about Amma" items={motherExplore} />

      <ProseSection
        eyebrow={docTitle("food", { minLen: 15 })}
        paragraphs={homeNarayanaParagraphs}
        images={docPageImages.food}
        tint
      />
    </>
  );
}
