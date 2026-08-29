import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { Eyebrow, Quote, SlimHead, Split } from "@/components/shared/PageSections";
import HashRedirect from "@/components/shared/HashRedirect";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";
import { ashramRituals } from "@/constants/sevasRituals";
import { templeCards } from "@/constants/templeData";

const templeIds = templeCards.map((t) => t.id);

const sacredSpaces = [
  {
    id: "bhairava",
    path: "/ashram/bhairava",
    name: "Kaala Bhairava Trishula",
    tag: "Protection & courage",
    note: "A fierce aspect of Shiva worshipped for strength and removal of fear.",
    img: IMG.shiva,
  },
  {
    id: "harake-nandi",
    path: "/ashram/harake-nandi",
    name: "Harake Nandi",
    tag: "Sacred promise",
    note: "Nandi as witness to vows made with sincerity before the divine.",
    img: IMG.manidweepa,
  },
];

export default function AshramPage() {
  const img = usePageImages("/ashram");
  const temples = templeCards.map((t) => ({
    ...t,
    img: img(`temple-card-${t.id}`, t.img),
  }));
  const sacred = sacredSpaces.map((space) => ({
    ...space,
    img: img(`sacred-${space.id}`, space.img),
  }));

  return (
    <>
      <HashRedirect basePath="/ashram" ids={templeIds} />

      <SlimHead
        eyebrow="Consecrated Space · Karekura"
        title="On the banks of the Cauvery."
        intro="Eight temple sannidhis, Mani Dweepa, and sacred spaces — consecrated through decades of Amma's daily worship."
      />

      <Split eyebrow="The campus" title="Consecrated by Amma's footsteps." image={img("split-campus", IMG.manidweepa)} imgAlt="Mani Dweepa at the Ashram">
        <p>
          Each temple on this campus was built and worshipped in by Amma over many years. The Cauvery runs
          along the boundary — a natural synergy of river, prayer, and the Goshala's living Gau seva nearby.
        </p>
        <p>
          Visitors come for darshan, quiet, and festival gatherings. Many describe the Ashram as a place where
          the mind settles and the heart opens — spaces prayed in daily for decades.
        </p>
      </Split>

      <section className="temple-section-v2">
        <div className="wrap">
          <Eyebrow gold>Temples</Eyebrow>
          <h2 className="section-h">Eight sannidhis of worship.</h2>
          <p className="temple-section-lede">
            Each sannidhi carries its own deity, tradition, and grace. Select one to read more and plan your visit.
          </p>
          <div className="temple-grid-v2">
            {temples.map((t) => (
              <Link
                key={t.id}
                to={t.path}
                className="temple-card-link"
                data-testid={`ashram-link-${t.id}`}
              >
                <article>
                  <div className="temple-img">
                    <img src={t.img} alt={t.name} loading="lazy" />
                  </div>
                  <div className="temple-card-body">
                    <span className="temple-card-tag">{t.tag}</span>
                    <h3>{t.name}</h3>
                    <p>{t.intro}</p>
                    <span className="temple-card-more">
                      Enter sannidhi <ArrowUpRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ashram-sacred tint">
        <div className="wrap">
          <Eyebrow>Other sacred spaces</Eyebrow>
          <h2 className="section-h">Beyond the main sannidhis.</h2>
          <div className="ashram-sacred-grid">
            {sacred.map((space) => (
              <Link
                key={space.id}
                to={space.path}
                className="ashram-sacred-card"
                data-testid={`ashram-link-${space.id}`}
              >
                <div className="ashram-sacred-img">
                  <img src={space.img} alt={space.name} loading="lazy" />
                </div>
                <div className="ashram-sacred-body">
                  <Sparkles size={18} aria-hidden="true" />
                  <span className="temple-card-tag">{space.tag}</span>
                  <h3>{space.name}</h3>
                  <p>{space.note}</p>
                  <span className="temple-card-more">
                    About {space.name} <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sevas-band">
        <div className="wrap">
          <Eyebrow gold>Sevas at the Ashram</Eyebrow>
          <h2 className="section-h">Recurring offerings.</h2>
          <div className="sevas-grid sevas-grid-linked">
            {ashramRituals.map((ritual) => (
              <Link
                key={ritual.id}
                to={ritual.path}
                className="sevas-card-link"
                data-testid={`ashram-seva-${ritual.id}`}
              >
                <article>
                  <h3>{ritual.title}</h3>
                  <p>{ritual.intro}</p>
                  <span className="sevas-card-more">About {ritual.title} →</span>
                </article>
              </Link>
            ))}
            <Link to="/sevas" className="sevas-card-link sevas-card-all" data-testid="ashram-sevas-all">
              <article>
                <h3>All Ashram sevas</h3>
                <p>Abhishekas, alankaras, and seasonal programmes across the campus.</p>
                <span className="sevas-card-more">View all sevas →</span>
              </article>
            </Link>
          </div>
        </div>
      </section>

      <section className="ashram-visit">
        <div className="wrap ashram-visit-inner">
          <div>
            <Eyebrow gold>Plan your visit</Eyebrow>
            <h2>Darshan at Karekura.</h2>
            <p>
              Timings vary with the season and festival calendar. Contact the Trust office before you travel —
              especially during Narayana Seva and major temple programmes.
            </p>
          </div>
          <div className="ashram-visit-actions">
            <p className="ashram-visit-location">
              <MapPin size={16} aria-hidden="true" />
              <span>Karekura, Mysore, Karnataka · River Cauvery</span>
            </p>
            <Link className="btn-solid" to="/contact" data-testid="ashram-contact-link">
              Contact the office <ArrowUpRight size={16} />
            </Link>
            <Link className="btn-ghost-dark" to="/goshala" data-testid="ashram-goshala-link">
              Visit the Goshala
            </Link>
          </div>
        </div>
      </section>

      <Quote author="Ashram tradition">Come. Sit. Be still.</Quote>
    </>
  );
}
