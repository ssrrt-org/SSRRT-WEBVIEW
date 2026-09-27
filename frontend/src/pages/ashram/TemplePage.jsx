import { Link, useParams } from "react-router-dom";
import { usePageImages } from "@/context/CmsContext";
import { templeCards } from "@/constants/templeData";
import NotFoundPage from "@/pages/NotFoundPage";
import { GraduationCap, ShieldCheck, Utensils } from "lucide-react";
import "@/styles/SanctumTemple.css";

const sharedVisitImage = "/Concentratedspace/Concentratedspace2.JPG";
const krishnaSevaIcons = [Utensils, GraduationCap, ShieldCheck];
const krishnaSevaLinks = ["/seva/narayana", "/rural-upliftment", "/goshala"];

function paragraphs(items) {
  return items.map((text, index) => <p key={`${index}-${text.slice(0, 24)}`}>{text}</p>);
}

export default function TemplePage() {
  const { templeId } = useParams();
  const temple = templeCards.find((item) => item.id === templeId);
  const images = usePageImages(temple?.path || `/ashram/${templeId}`);

  if (!temple) return <NotFoundPage />;

  const heroImage = images("hero-figure", temple.img);
  const visitImage = sharedVisitImage;
  const detailSections = temple.docSections.length
    ? temple.docSections
    : [{ heading: temple.tagLine || temple.tag, paragraphs: [temple.gift] }];
  const otherTemples = templeCards.filter((item) => item.id !== temple.id);
  const isKrishna = temple.id === "krishna";

  return (
    <div className="s-temple-page">
      <main>
        <section className={`s-hero${isKrishna ? " s-krishna-hero" : ""}`}>
          <div className="s-page-wrap s-hero-grid">
            <div>
              <nav className="s-breadcrumb" aria-label="Breadcrumb">
                <Link to="/">Home</Link><span>›</span><Link to="/ashram">Ashram &amp; Temples</Link><span>›</span>
                <span className="s-breadcrumb-current">{temple.name}</span>
              </nav>
              {temple.mantra ? <p className="s-mantra">{temple.mantra}</p> : null}
              <h1>{temple.name}</h1>
              <p className="s-tagline">{temple.tagLine || temple.tag}</p>
              <p className="s-intro">{temple.intro}</p>
              <div className="s-actions">
                <Link className="s-button s-button-primary" to="/contact" data-testid="temple-offer-prayers">Offer your prayers <span aria-hidden="true">↗</span></Link>
                <a className="s-button s-button-secondary" href="#plan-visit" data-testid="temple-plan-visit">Plan your visit</a>
              </div>
            </div>
            <figure className="s-hero-portrait">
              <img src={heroImage} alt={`${temple.name} in the Ashram sannidhi`} />
              <figcaption className="s-portrait-label">{temple.name} · Sacred Darshan</figcaption>
              <span className="s-portrait-badge">Pavitra Darshan</span>
            </figure>
          </div>
        </section>

        <section className={`s-section s-about s-temple-about${isKrishna ? " s-krishna-about" : ""}`}>
          <div className="s-page-wrap">
            <header className="s-krishna-about-head">
              <span className="s-eyebrow">About the temple</span>
              <h2>{temple.sevaTitle}</h2>
              <span className="s-krishna-divider" aria-hidden="true">✦ ❧ ✦</span>
            </header>
            {isKrishna ? (
              <>
                <div className="s-krishna-about-grid">
                  <div className="s-copy s-krishna-copy">{paragraphs(temple.sevaParagraphs)}</div>
                  <aside className="s-krishna-aside">
                    <article className="s-gita-card">
                      <div className="s-gita-card-head">
                        <strong>Bhagavad Gita · Chapter 18, Verse 65</strong>
                        <span>Krishna's teaching</span>
                      </div>
                      <p className="s-gita-verse" lang="sa">मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।<br />मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे ॥</p>
                      <p className="s-gita-translation">“Fix your mind on Me; be devoted to Me. Offer worship to Me and bow to Me. You shall come to Me—this is My promise, for you are dear to Me.”</p>
                    </article>
                    <article className="s-krishna-sanctuary-card">
                      <span>Cauvery Banks · Karekura Ashram</span>
                      <p>Krishna Sannidhi</p>
                      <small>A living expression of devotion, cow seva, and the wisdom of Govinda.</small>
                    </article>
                  </aside>
                </div>
                <div className="s-krishna-seva-grid">
                  {temple.highlights.map(({ title, note }, index) => {
                    const Icon = krishnaSevaIcons[index % krishnaSevaIcons.length];
                    return (
                      <article className="s-krishna-seva-card" key={title}>
                        <div className="s-krishna-seva-card-top">
                          <span className="s-krishna-seva-icon"><Icon size={17} aria-hidden="true" /></span>
                          <span className="s-krishna-seva-label">{["Narayana Seva", "Education Seva", "Gau Seva"][index]}</span>
                        </div>
                        <h3>{title}</h3>
                        <p>{note}</p>
                        <Link to={krishnaSevaLinks[index]} aria-label={`Learn about ${title}`} className="s-krishna-seva-link">Explore seva <span aria-hidden="true">→</span></Link>
                      </article>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="s-copy s-temple-about-copy">
                  {paragraphs(temple.sevaParagraphs)}
                  {temple.quote ? <blockquote className="s-quote">“{temple.quote}”<cite>— Srimad Sai Rajarajeshwari Ashram, Karekura</cite></blockquote> : null}
                </div>
                {temple.highlights.length ? (
                  <div className="s-highlight-grid">
                    {temple.highlights.map(({ title, note }) => <article className="s-card" key={title}><h3>{title}</h3><p>{note}</p></article>)}
                  </div>
                ) : null}
              </>
            )}
          </div>
        </section>

        {detailSections.map((section) => (
          <section className="s-section s-detail-section" key={section.heading}>
            <div className="s-page-wrap">
              <div className="s-section-head"><h2>{section.heading}</h2></div>
              <div className="s-copy s-detail-copy">{paragraphs(section.paragraphs || [])}</div>
            </div>
          </section>
        ))}

        <section className="s-section s-reasons">
          <div className="s-page-wrap">
            <div className="s-section-head">
              <span className="s-eyebrow">Grace for the path you are on</span>
              <h2>Why devotees visit {temple.name}</h2>
            </div>
            <div className="s-reason-grid">
              {temple.whySeek.map(({ title, note }) => <article className="s-card" key={title}><h3>{title}</h3><p>{note}</p></article>)}
            </div>
            <div className="s-gift">
              <div><span className="s-eyebrow">Spiritual blessing</span><p>{temple.gift}</p></div>
              <Link className="s-button s-button-secondary" to="/donate">Support the Ashram</Link>
            </div>
          </div>
        </section>

        <section className="s-section s-visit" id="plan-visit">
          <div className="s-page-wrap">
            <div className="s-section-head"><span className="s-eyebrow">Yatra &amp; darshan guide</span><h2>Plan your sacred visit</h2></div>
            <div className="s-visit-grid">
              <div className="s-visit-panel">
                <h3>A place for devotion</h3>
                <div className="s-visit-fact"><strong>Sanctum</strong><p>{temple.name}</p></div>
                <div className="s-visit-fact"><strong>Location</strong><p>{temple.visit.location}</p></div>
                <div className="s-visit-fact"><strong>Darshan</strong><p>{temple.visit.bestTime}</p></div>
                <div className="s-visit-fact"><strong>Offerings</strong><p>{temple.visit.offerings}</p></div>
              </div>
              <div className="s-visit-panel">
                <img className="s-visit-image" src={visitImage} alt="Devotees gathered for worship in the Ashram temple hall" loading="lazy" />
                <h3 className="s-visit-welcome">Come as you are</h3>
                <p className="s-copy">Visitors are welcome to offer a quiet prayer, spend a few moments in reflection, and experience the Ashram at their own pace.</p>
                <Link className="s-visit-cta" to="/contact">Contact the Ashram →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="s-section s-explore">
          <div className="s-page-wrap">
            <div className="s-explore-head">
              <div><span className="s-eyebrow">The sacred precinct</span><h2>Explore other sannidhis &amp; shrines</h2></div>
              <span>Consecrated spaces on the banks of River Cauvery</span>
            </div>
            <div className="s-explore-grid">
              {otherTemples.map((item) => <Link className="s-explore-card" to={item.path} key={item.id}><small>{item.tag}</small><strong>{item.name}</strong><p>{item.intro}</p></Link>)}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
