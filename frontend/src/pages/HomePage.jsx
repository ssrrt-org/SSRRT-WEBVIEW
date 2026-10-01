import { Link } from "react-router-dom";
import { ArrowUpRight, Quote } from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { Eyebrow, SectionHeading } from "@/components/shared/PageSections";
import { motherExploreProgrammes } from "@/constants/motherContent";
import {
  homePillars,
  homeProgrammeTiles,
  motherHomeIntro,
  motherVirtues,
  trustHomeParagraphs,
} from "@/constants/homeContent";
import { homeHeroSlides } from "@/constants/homeHeroImages";
import { heroSlideSrc } from "@/lib/media";

export default function HomePage() {
  return (
    <>
      <section className="hero-v2" id="home">
        <HeroCarousel />
        <div className="wrap hero-v2-content">
          <div className="hero-ribbon" data-testid="hero-ribbon">
            Where <em>seva</em> becomes the quiet language of devotion.
          </div>
        </div>
      </section>

      <section className="home-mother">
        <div className="wrap home-mother-inner">
          <header className="home-mother-heading">
            <p className="home-mother-kicker">• Divine Guidance &amp; Mother&apos;s Grace •</p>
            <h2>Divine Mother — Srimad Sai RajaRajeshwari</h2>
            <p className="home-mother-tagline">
              Fondly revered as &ldquo;Amma&rdquo; of Mysuru — The Divine Manifest in Human Form
            </p>
            <p className="home-mother-mantra" aria-hidden="true">
              <span className="home-mother-mantra-line" />
              <span className="home-mother-mantra-text">✦ ॐ श्री मात्रे नमः ✦</span>
              <span className="home-mother-mantra-line" />
            </p>
          </header>

          <div className="home-mother-grid">
            <figure className="home-mother-figure home-mother-figure-portrait">
              <img
                src={heroSlideSrc("/ssrrt/Umother.jpg")}
                alt="Divine Mother Srimad Sai RajaRajeshwari with a child"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={1080}
                height={1620}
              />
            </figure>
            <article className="home-mother-quote">
              <Quote className="home-mother-quote-icon" size={34} aria-hidden="true" />
              <p className="home-mother-quote-label">Amma’s Sacred Vani</p>
              <blockquote>
                <p>“I have neither happiness nor sorrow,</p>
                <p>I have neither birth nor death, unlike living beings</p>
                <p>I have no karma</p>
                <p>I am unaffected by the presence or absence of people</p>
                <p>I am the eternally true living force</p>
                <p>This one attribute is natural to divinity.</p>
                <p>I am with attributes and beyond all attributes</p>
                <p>I am Shankara as well as Shankari</p>
                <p>The self is ever the same</p>
                <p>I am apparent and also non-apparent</p>
                <p>I am bound, yet I am the remover of bondage</p>
                <p>Though I appear to be in bondage, I am free</p>
                <p>GOD IS BEYOND EVERYTHING.”</p>
              </blockquote>
              <cite>— Srimad Sai RajaRajeshwari Amma</cite>
            </article>
          </div>

          <div className="home-mother-intro">
            <p>{motherHomeIntro}</p>
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
              About Amma <ArrowUpRight size={14} />
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
            <img
              src={heroSlideSrc(homeHeroSlides[5].img, { main: true })}
              alt="SSRRT Ashram on the banks of the Cauvery"
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
            />
          </figure>
        </div>
      </section>

      <HubProgrammesSection
        eyebrow="SSRRT programmes"
        title="Serve across Karekura and beyond."
        lede="Short paths into the Trust's ongoing work — each programme has its own page."
        programmes={homeProgrammeTiles}
        testIdPrefix="home-programme"
        compact
        eagerCount={4}
      />

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

      <HubProgrammesSection
        className="home-mother-explore"
        eyebrow="Divine Mother"
        title="More about Amma"
        lede="Stories, readings, and moments that reveal who Amma is — each with its own page."
        programmes={motherExploreProgrammes}
        testIdPrefix="home-mother"
        tint
        eagerCount={3}
      />

    </>
  );
}
