import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronRight, Quote as QuoteIcon } from "lucide-react";
import ScrollHint from "@/components/shared/ScrollHint";
import { heroImageForPath } from "@/constants/heroImages";

export const Eyebrow = ({ children, gold, dark }) => (
  <div className={`eyebrow${gold ? " gold" : ""}${dark ? " dark" : ""}`}>{children}</div>
);

export const PageHead = ({ eyebrow, title, intro, image, imgAlt }) => (
  <section className="ph2">
    <div className="wrap ph2-grid">
      <div>
        <Eyebrow gold>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {image && <div className="ph2-img"><img src={image} alt={imgAlt || eyebrow}/><span/></div>}
    </div>
  </section>
);

export const SlimHead = ({ eyebrow, title, intro, image, noPhoto, wide = false, showScrollHint = true }) => {
  const sectionRef = useRef(null);
  const { pathname } = useLocation();
  const bg = !noPhoto ? (image || heroImageForPath(pathname)) : null;
  const photo = Boolean(bg);

  return (
    <section
      ref={sectionRef}
      className={`ph-slim${photo ? " ph-slim-photo" : ""}${wide ? " ph-slim-wide" : ""}`}
      style={photo ? { backgroundImage: `url(${bg})` } : undefined}
    >
      <div className="wrap">
        <div className="ph-slim-inner">
          <Eyebrow gold={photo} dark={!photo}>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
      </div>
      {showScrollHint && (
        <ScrollHint variant={photo ? "dark" : "light"} containerRef={sectionRef} />
      )}
    </section>
  );
};

export const Split = ({ eyebrow, title, image, imgAlt, reverse, tint, id, eager, children }) => (
  <section id={id} className={`split${reverse ? " rev" : ""}${tint ? " tint" : ""}`}>
    <div className="wrap split-grid">
      <figure>
        <img
          src={image}
          alt={imgAlt || title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      </figure>
      <div className="split-copy">
        {eyebrow && <Eyebrow gold>{eyebrow}</Eyebrow>}
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  </section>
);

export const Quote = ({ children, author }) => (
  <div className="quote-band">
    <div className="wrap">
      <QuoteIcon size={32}/>
      <blockquote>{children}</blockquote>
      {author && <cite>— {author}</cite>}
    </div>
  </div>
);

export const Stats = ({ items }) => (
  <div className="stat-strip">
    {items.map((it, i) => (
      <div key={i} data-testid={`stat-${it.label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>
        <strong>{it.value}</strong>
        <span>{it.label}</span>
      </div>
    ))}
  </div>
);

export const CtaBand = ({ eyebrow, title, note, primary, secondary }) => (
  <section className="cta-band">
    <div className="wrap cta-band-inner">
      <div>
        <Eyebrow gold>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        <p>{note}</p>
      </div>
      <div className="cta-band-actions">
        <Link className="btn-solid" data-testid={`cta-${primary.testid}`} to={primary.to}>{primary.label} <ArrowUpRight size={16}/></Link>
        {secondary && <Link className="btn-ghost" data-testid={`cta-${secondary.testid}`} to={secondary.to}>{secondary.label} <ChevronRight size={15}/></Link>}
      </div>
    </div>
  </section>
);

export const SectionHeading = ({ eyebrow, title, children }) => (
  <div className="section-heading">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2>{title}</h2>
    {children && <p>{children}</p>}
  </div>
);

export const PageHero = ({ eyebrow, title, intro, image }) => (
  <section className="page-hero">
    <div className="wrap page-hero-grid">
      <div>
        <Eyebrow gold>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{intro}</p>
      </div>
      {image && <img data-testid="page-hero-image" src={image} alt={eyebrow}/>}
    </div>
  </section>
);
