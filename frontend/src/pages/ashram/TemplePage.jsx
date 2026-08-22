import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, ChevronLeft } from "lucide-react";
import { Eyebrow } from "@/components/shared/PageSections";
import { templeCards } from "@/constants/templeData";
import { IMG } from "@/constants/images";
import NotFoundPage from "@/pages/NotFoundPage";

export default function TemplePage() {
  const { templeId } = useParams();
  const index = templeCards.findIndex((t) => t.id === templeId);
  const temple = templeCards[index];

  if (!temple) return <NotFoundPage />;

  return (
    <div className="temple-page">
      <section className="temple-hero">
        <div className="temple-hero-bg" style={{ backgroundImage: `url(${IMG.manidweepa})` }} aria-hidden="true" />
        <div className="wrap temple-hero-inner">
          <div className="temple-hero-grid">
            <div className="temple-hero-copy">
              <nav className="temple-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">›</span>
                <Link to="/ashram">Ashram &amp; Temples</Link>
                <span aria-hidden="true">›</span>
                <span>{temple.name}</span>
              </nav>
              {temple.mantra && <p className="temple-mantra">{temple.mantra}</p>}
              <h1 className="temple-hero-title">{temple.name}</h1>
              <p className="temple-hero-tag">{temple.tag}</p>
              <p className="temple-hero-intro">{temple.intro}</p>
              <div className="temple-hero-actions">
                <Link className="temple-hero-btn-primary" to="/contact" data-testid="temple-offer-prayers">
                  Offer your prayers <ArrowUpRight size={16} />
                </Link>
                <Link className="temple-hero-btn-outline" to="/contact" data-testid="temple-plan-visit">
                  Plan your visit
                </Link>
              </div>
            </div>
            <figure className="temple-hero-figure">
              <img src={temple.img} alt={temple.name} />
            </figure>
          </div>
        </div>
      </section>

      <section className="temple-seva">
        <div className="wrap temple-seva-grid">
          <figure>
            <img src={temple.gallery[1] || temple.img} alt={`${temple.name} at the Ashram`} loading="lazy" />
          </figure>
          <div>
            <div className="temple-divider" aria-hidden="true" />
            <Eyebrow gold>Ashram &amp; seva</Eyebrow>
            <h2>{temple.sevaTitle}</h2>
            {temple.sevaParagraphs.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <div className="temple-highlights">
              {temple.highlights.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="temple-why tint">
        <div className="wrap temple-why-grid">
          <div>
            <Eyebrow>Why devotees seek {temple.name.replace(/^The /, "").replace(/^Lord /, "")}</Eyebrow>
            <h2 className="section-h">Grace for the path you are on.</h2>
            <ul className="temple-why-list">
              {temple.whySeek.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="temple-gift-box">
            <Eyebrow gold>Spiritual gift</Eyebrow>
            <p className="temple-gift-lead">{temple.gift}</p>
            <p className="temple-gift-quote">{temple.quote}</p>
          </aside>
        </div>
      </section>

      <section className="temple-beginnings">
        <div className="wrap temple-beginnings-grid">
          <figure>
            <img src={temple.gallery[2] || IMG.child} alt={`Devotees at ${temple.name}`} loading="lazy" />
          </figure>
          <div>
            <Eyebrow gold>Visit &amp; pray</Eyebrow>
            <h2>{temple.beginningsTitle}</h2>
            <p>{temple.beginningsBody}</p>
            <div className="temple-audiences">
              {temple.audiences.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="temple-info-bar">
        <div className="wrap temple-info-grid">
          <div>
            <span className="temple-info-label">Temple</span>
            <strong>{temple.name}</strong>
          </div>
          <div>
            <span className="temple-info-label">Location</span>
            <strong>{temple.visit.location}</strong>
          </div>
          <div>
            <span className="temple-info-label">Best time to visit</span>
            <strong>{temple.visit.bestTime}</strong>
          </div>
          <div>
            <span className="temple-info-label">Offerings</span>
            <strong>{temple.visit.offerings}</strong>
          </div>
        </div>
      </section>

      <section className="temple-explore tint">
        <div className="wrap">
          <Eyebrow>Explore other temples</Eyebrow>
          <h2 className="section-h">Eight sannidhis on the Cauvery.</h2>
          <div className="temple-explore-grid">
            {templeCards.map((t) => (
              <Link
                key={t.id}
                to={t.path}
                className={`temple-explore-item${t.id === temple.id ? " is-active" : ""}`}
                data-testid={`temple-explore-${t.id}`}
                aria-current={t.id === temple.id ? "page" : undefined}
              >
                <figure className="temple-explore-thumb">
                  <img src={t.img} alt={t.name} loading="lazy" />
                </figure>
                <span className="temple-explore-name">{t.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="temple-footer-band">
        <div className="wrap temple-footer-band-inner">
          <Link className="temple-back-link" to="/ashram" data-testid="temple-back-ashram">
            <ChevronLeft size={16} /> Back to Ashram &amp; Temples
          </Link>
          <blockquote className="temple-footer-quote">{temple.quote}</blockquote>
        </div>
      </section>
    </div>
  );
}
