import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Heart,
  Users,
} from "lucide-react";
import HeroCarousel from "@/components/home/HeroCarousel";
import ExploreGrid from "@/components/shared/ExploreGrid";
import { Eyebrow, Quote, SectionHeading, Split, Stats } from "@/components/shared/PageSections";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";

const discoverCards = [
  {
    title: "Sacred Ashram",
    note: "Eight temple sannidhis on the banks of the Cauvery — darshan, quiet, and daily worship.",
    to: "/ashram",
    testid: "home-discover-ashram",
    linkLabel: "Visit the Ashram",
  },
  {
    title: "Events & gatherings",
    note: "Narayana Seva, abhishekas, and seasonal programmes at the Ashram.",
    to: "/events",
    testid: "home-discover-events",
    linkLabel: "See Ashram events",
  },
  {
    title: "Plan your visit",
    note: "Karekura, Mysore — call the office for timings before you travel.",
    to: "/contact",
    testid: "home-discover-visit",
    linkLabel: "Plan a visit to Karekura",
  },
  {
    title: "The Shoppe",
    note: "Books, audio, padukas, and sacred items from the Ashram.",
    to: "/shop",
    testid: "home-discover-shop",
    linkLabel: "Browse the Shoppe",
  },
];

export default function HomePage() {
  const img = usePageImages("/");

  return (
    <>
      <section className="hero-v2" id="home">
        <HeroCarousel/>
        <div className="wrap hero-v2-content">
          <div className="hero-ribbon" data-testid="hero-ribbon">
            Where <em>seva</em> becomes the quiet language of devotion.
          </div>
          <p className="hero-lede" data-testid="hero-lede">
            Nestled on the tranquil banks of the River Cauvery, the Ashram is a living spiritual ecosystem —<br className="hero-lede-break" />
            caring for cows, rural communities, and consecrated temple spaces, guided by the grace of Amma.
          </p>
          <div className="hero-cta-row">
            <Link className="cta cta-primary" data-testid="hero-donate-button" to="/donate">
              <Heart size={18} aria-hidden="true"/>
              <span><strong>Support the Trust</strong><small>Make an offering</small></span>
              <ArrowUpRight size={16} aria-hidden="true"/>
            </Link>
            <Link className="cta cta-accent" data-testid="hero-volunteer-button" to="/volunteering">
              <Users size={18} aria-hidden="true"/>
              <span><strong>Volunteer</strong><small>Offer your time</small></span>
              <ArrowUpRight size={16} aria-hidden="true"/>
            </Link>
          </div>
        </div>
      </section>

      <Stats
        items={[
          { value: "300+", label: "Cows, bulls & calves" },
          { value: "4–5", label: "Villages with free clinics" },
          { value: "8", label: "Temple sannidhis" },
          { value: "20+ yrs", label: "Unbroken Gau seva" },
        ]}
      />

      <Split eager eyebrow="SSRRT · Karekura" title="A rural trust devoted to seva." image={img("split-trust", IMG.manidweepa)} imgAlt="Mani Dweepa at the Ashram">
        <p>
          Srimad Sai Rajarajeshwari Trust sits on the tranquil banks of the River Cauvery — a living campus where
          Gau seva, medical camps, rural upliftment, and consecrated worship unfold side by side, every day.
        </p>
        <p>
          Project Kaamadhenau shelters more than 300 cows. Free clinics reach surrounding villages. Students receive
          school support. Tankers run when wells dry up. Once a year, Narayana Seva feeds 10,000–15,000 people.
          Volunteers join in the Goshala, kitchens, and temple care.
        </p>
        <Link className="text-link" data-testid="home-about-trust" to="/about">
          About the Trust <ArrowUpRight size={15}/>
        </Link>
      </Split>

      <Split
        eyebrow="Glimpses of Amma"
        title="A human life, lived with divine purpose."
        image={img("split-amma", IMG.amma)}
        imgAlt="Amma at the Ashram"
        reverse
        tint
      >
        <p>
          Srimad Sai Rajarajeshwari — affectionately called Amma — is a wife, a mother, a guide, and a perfect
          renunciant. In daily life she was a bank officer and householder; in spiritual life devotees describe her
          assuming many forms — comforter, warrior, mother — to awaken those who come to her sincerely.
        </p>
        <p>
          Born into a family that prayed for the Divine Mother, she was named Lalitha by the saint Ramdas of Kanhangad.
          Ancient Naadi readings place her among the highest expressions of the Divine Feminine — yet she always speaks
          of herself at the feet of Bhagawan Sri Sathya Sai Baba.
        </p>
        <div className="home-inline-links">
          <Link data-testid="home-amma-link" to="/mother">
            Glimpses of Amma <ArrowUpRight size={14}/>
          </Link>
          <Link data-testid="home-avataarhood-link" to="/mother/avataarhood">
            The Avataarhood <ArrowUpRight size={14}/>
          </Link>
        </div>
      </Split>

      <Quote author="Amma">One need not be divine to be a good, perfect human being.</Quote>

      <section className="intro-band">
        <div className="wrap intro-grid">
          <div>
            <Eyebrow>A living spiritual ecosystem</Eyebrow>
            <h2>One trust. Many forms of care.</h2>
          </div>
          <p data-testid="mission-summary">
            SSRRT brings together devotion and daily action: protecting every life in the Goshala, serving food and
            medicine, sustaining rural dignity, and holding space for prayer along the Cauvery.
          </p>
        </div>
      </section>

      <section className="pillar-section">
        <div className="wrap">
          <SectionHeading eyebrow="The work of the Trust" title="Paths into seva">
            Choose a place to begin — each path leads back to the same quiet intention: to serve with love.
          </SectionHeading>
          <div className="pillar-grid pillar-grid-4">
            {[
              ["01", "Project Kaamadhenau", "Over 300 cows, bulls, and calves cared for with dignity, shelter, nourishment, and love.", "/goshala", "About the Goshala"],
              ["02", "Narayana Seva", "An annual offering of freshly prepared food reaching 10,000–15,000 people across communities.", "/seva/narayana", "About Narayana Seva"],
              ["03", "Mother for the Needy", "Free medical care, mobile camps, education, water, and essential support for surrounding villages.", "/seva/medical", "About medical seva"],
              ["04", "Sacred Ashram", "Eight temple sannidhis consecrated by Amma's worship — Krishna, Shiva, Ganesha, and more on the Cauvery.", "/ashram", "About the Ashram"],
            ].map(([n, title, text, path, linkLabel]) => (
              <article className="pillar-card" key={title}>
                <div className="pillar-number">{n}</div>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link data-testid={`home-${title.toLowerCase().replaceAll(" ", "-")}-link`} to={path}>
                  {linkLabel} <ArrowUpRight size={15}/>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ExploreGrid
        title="More about Amma"
        lede="Short readings from devotees and the Naadi traditions — each a doorway into her human and divine aspects."
        items={[
          { to: "/mother/story", title: "The Human Aspect", note: "Householder, mother, bank officer" },
          { to: "/mother/avatar", title: "Divine Aspects", note: "The myriad faces of the Mother" },
          { to: "/mother/naadi", title: "Naadi Readings", note: "Lalitha, Omkara, Tripura Sundari" },
          { to: "/mother/swami", title: "Swami & Amma", note: "At the feet of Sri Sathya Sai Baba" },
        ]}
      />

      <section className="home-discover tint">
        <div className="wrap">
          <SectionHeading eyebrow="Around the Ashram" title="Small steps to explore">
            A few practical starting points — whether you are visiting, volunteering, or learning from afar.
          </SectionHeading>
          <div className="home-discover-grid">
            {discoverCards.map(({ title, note, to, testid, linkLabel }) => (
              <article className="home-discover-card" key={title}>
                <h3>{title}</h3>
                <p>{note}</p>
                <Link data-testid={testid} to={to}>
                  {linkLabel} <ArrowUpRight size={14}/>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="narayana-section">
        <div className="wrap narayana-grid">
          <div>
            <Eyebrow gold>Narayana Seva · Annual programme</Eyebrow>
            <h2>Food is God.<br/><em>To offer food is to offer the Divine.</em></h2>
          </div>
          <div>
            <p>Every year, Amma and the Trust bring a freshly prepared meal to 10,000–15,000 people across surrounding communities.</p>
            <Link className="btn btn-primary" data-testid="home-narayana-link" to="/seva/narayana">
              Read about the seva <ArrowUpRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-visit">
        <div className="wrap home-visit-inner">
          <div>
            <Eyebrow gold>Visit Karekura</Eyebrow>
            <h2>River Cauvery · Mysore district.</h2>
            <p>Open for darshan and seva when the office confirms timings. Contact the Trust before you travel — especially during festivals and Narayana Seva.</p>
          </div>
          <div className="home-visit-actions">
            <Link className="btn-solid" data-testid="home-contact-link" to="/contact">
              Contact the office <ArrowUpRight size={16}/>
            </Link>
            <Link className="btn-ghost-dark" data-testid="home-volunteer-link" to="/volunteering">
              Volunteer at the Ashram
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
