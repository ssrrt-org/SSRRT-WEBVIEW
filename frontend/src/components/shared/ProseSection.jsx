import { Eyebrow } from "@/components/shared/PageSections";

function isSubheading(text) {
  const t = text.trim();
  return t.length < 90 && !/[.!?]$/.test(t) && /^[A-Z]/.test(t);
}

function ProseBlock({ text }) {
  if (isSubheading(text)) {
    return <h3 className="prose-subheading">{text}</h3>;
  }
  return <p>{text}</p>;
}

function ProseFigure({ src, alt, caption, layout = "full" }) {
  return (
    <figure className={`prose-section-figure prose-figure-${layout}`}>
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/**
 * Long-form doc content: ~90% width, justified body copy, optional images between paragraphs.
 * `images`: { after: paragraphIndex (0-based, counts only <p> blocks), src, alt, caption?, layout? }
 */
export default function ProseSection({
  eyebrow,
  title,
  paragraphs = [],
  className = "",
  tint = false,
  wide = true,
  justify = true,
  embedded = false,
  image,
  imageAlt = "",
  images = [],
}) {
  const blocks = paragraphs.filter(Boolean);
  if (!blocks.length && !image) return null;

  const imageByAfter = new Map(
    images.map((item) => [item.after, item]),
  );

  let paragraphIndex = 0;
  const content = [];

  blocks.forEach((p) => {
    const insert = imageByAfter.get(paragraphIndex);
    if (insert) {
      content.push(
        <ProseFigure
          key={`img-${insert.after}-${insert.src}`}
          src={insert.src}
          alt={insert.alt}
          caption={insert.caption}
          layout={insert.layout}
        />,
      );
    }

    if (isSubheading(p)) {
      content.push(<ProseBlock key={p.slice(0, 48)} text={p} />);
    } else {
      content.push(<ProseBlock key={p.slice(0, 48)} text={p} />);
      paragraphIndex += 1;
    }
  });

  const inner = (
    <>
      {image && (
        <figure className="prose-section-figure prose-figure-full">
          <img src={image} alt={imageAlt} loading="lazy" />
        </figure>
      )}
      {eyebrow && <Eyebrow gold={tint}>{eyebrow}</Eyebrow>}
      {title && <h2 className="section-h">{title}</h2>}
      {content.length > 0 && (
        <div className={`prose-block${justify ? " prose-justify" : ""}`}>
          {content}
        </div>
      )}
    </>
  );

  return embedded ? (
    <div className={`prose-section-inner ${className}`.trim()}>
      {inner}
    </div>
  ) : (
    <section className={`prose-section${tint ? " tint" : ""}${wide ? " prose-wide" : ""} ${className}`.trim()}>
      <div className="wrap prose-section-inner">
        {inner}
      </div>
    </section>
  );
}
