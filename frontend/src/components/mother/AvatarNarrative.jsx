import { Eyebrow } from "@/components/shared/PageSections";
import { IMG } from "@/constants/images";

/* Paragraphs that start with a quote mark render as a proper blockquote. */
const isQuote = (text) => /^["“]/.test(text.trim());

function Copy({ paragraphs, idPrefix }) {
  return (
    <>
      {paragraphs.map((paragraph, index) => {
        const key = `${idPrefix}-${index}`;
        return isQuote(paragraph) ? (
          <blockquote key={key} className="an-quote">
            {paragraph}
          </blockquote>
        ) : (
          <p key={key}>{paragraph}</p>
        );
      })}
    </>
  );
}

function Chapter({ id, label, image, paragraphs, reverse }) {
  return (
    <section className={`an-chapter${reverse ? " reverse" : ""}`}>
      <div className="wrap an-grid">
        <figure className={`an-figure an-figure-${id}`}>
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        </figure>
        <div className="an-copy">
          <Eyebrow gold>{label}</Eyebrow>
          <Copy idPrefix={id} paragraphs={paragraphs} />
        </div>
      </div>
    </section>
  );
}

export default function AvatarNarrative({ narrative, image }) {
  const chapterImages = {
    "life-in-world": { src: image, alt: "The sacred Ashram at Karekura" },
    "presence-within": {
      src: IMG.ammaGanesha,
      alt: "Srimad Sai Rajarajeshwari at the Ashram",
    },
    avataarhood: { src: IMG.boss, alt: "A devotional portrait from the Ashram" },
  };

  return (
    <div className="avatar-narrative">
      <section className="an-opening">
        <div className="wrap">
          <div className="an-opening-head">
            <Eyebrow gold>Divine Mother</Eyebrow>
            <h2>One life, held in two worlds.</h2>
          </div>
          <div className="an-opening-copy">
            <Copy idPrefix="opening" paragraphs={narrative.opening} />
          </div>
        </div>
      </section>

      {narrative.chapters.map((chapter, index) => (
        <Chapter
          key={chapter.id}
          {...chapter}
          image={chapterImages[chapter.id]}
          reverse={index % 2 === 1}
        />
      ))}
    </div>
  );
}