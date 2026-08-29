import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, SlimHead, Quote, Split } from "@/components/shared/PageSections";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import HashRedirect from "@/components/shared/HashRedirect";
import { usePageImages } from "@/context/CmsContext";
import { motherSections } from "@/constants/motherContent";
import { IMG } from "@/constants/images";

const motherIds = motherSections.map((s) => s.id);

const sectionImages = {
  story: IMG.ammaGanesha,
  avatar: IMG.manidweepa,
  testimonies: IMG.event1,
  naadi: IMG.boss,
};

const extraMotherLinks = [
  {
    id: "avataarhood",
    to: "/mother/avataarhood",
    title: "The Avataarhood",
    tag: "Divine purpose",
    note: "Birth, Lalitha, and the celestial inscrutability of every avatar's life.",
    image: IMG.manidweepa,
  },
  {
    id: "swami",
    to: "/mother/swami",
    title: "Swami & Amma",
    tag: "At Baba's feet",
    note: "Her love and humility before Bhagawan Sri Sathya Sai Baba.",
    image: IMG.shirdi,
  },
  {
    id: "realized",
    to: "/mother/realized",
    title: "Realized beings",
    tag: "Naadi & Shirdi Sai",
    note: "Recognition preserved with care — Agastya Nadi, Budha Nadi, and Shirdi Sai Baba.",
    image: IMG.boss,
  },
];

const programmes = [
  ...motherSections.map((s) => ({
    id: s.id,
    to: s.path,
    title: s.navTitle,
    tag: s.eyebrow,
    note: s.paragraphs ? s.paragraphs[0] : s.stories?.[0]?.text?.slice(0, 140) + "…",
    image: sectionImages[s.id] || IMG.amma,
    testid: `mother-link-${s.id}`,
  })),
  ...extraMotherLinks.map((l) => ({
    ...l,
    testid: `mother-link-${l.id}`,
  })),
];

export default function MotherPage() {
  const img = usePageImages("/mother");
  const programmeCards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <>
      <HashRedirect basePath="/mother" ids={motherIds} />

      <SlimHead
        wide
        eyebrow="Glimpses of Amma"
        title="A human life, lived with divine purpose."
        intro="Srimad Sai Rajarajeshwari — affectionately called Amma — is a wife, a mother, a guide, and a perfect renunciant. Her simple life and character reveal a unique ideal to mankind."
      />

      <Split
        eyebrow="The human aspect"
        title="A householder first — dignified, disciplined, devoted."
        image={img("split-human", IMG.ammaGanesha)}
        imgAlt="Amma at SSRRT"
      >
        <p>
          Amma completed her education, married, worked in a bank for 26 years, and secured herself financially
          through voluntary retirement. In daily life she never fails in her duty as a householder — every task
          at home is completed before she attends to devotees or visits the Ashram.
        </p>
        <p>
          Whoever visits her home is welcomed, fed sumptuously, and sent away lifted. The spirit of motherhood
          is so powerfully operative in her that she foregoes her own comforts silently, so that others are spared
          trouble.
        </p>
      </Split>

      <HubProgrammesSection
        eyebrow="Read further"
        title="Seven glimpses into Amma's life."
        lede="Her story as a householder, her divine aspect, testimonies of courage, Naadi readings, and her relationship with realized beings."
        programmes={programmeCards}
        testIdPrefix="mother"
        tint
      />

      <section className="hub-feature">
        <div className="wrap hub-feature-grid">
          <div>
            <Eyebrow gold>Testimonies · Undivided presence</Eyebrow>
            <h2>
              Service before sorrow.
              <br />
              <em>Grace before grief.</em>
            </h2>
            <p>
              When the father of her earthly body passed on at noon, thousands were already seated at Amma's home
              for the annual Narayana Seva. She suppressed her sorrow and continued serving as if nothing had
              happened. Only in the evening — after every last soul had been fed — was the loss announced.
            </p>
            <Link className="btn-solid" to="/mother/testimonies" data-testid="mother-testimonies">
              Read testimonies <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hub-feature-aside">
            <h3>What devotees discover</h3>
            <ul>
              <li>A life lived with dignity as a householder and mother</li>
              <li>Divine aspect — myriad forms of the Mother</li>
              <li>Naadi readings placing her among realized beings</li>
              <li>Humility at the feet of Bhagawan Sri Sathya Sai Baba</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="hub-visit tint">
        <div className="wrap hub-visit-inner">
          <div>
            <Eyebrow gold>Visit & connect</Eyebrow>
            <h2>Experience Amma's work at the Ashram.</h2>
            <p>
              Darshan, seva, and the living programmes of the Trust — Goshala, medical camps, and Narayana Seva
              — all flow from the same spirit of motherhood that shapes Amma's daily life.
            </p>
          </div>
          <div className="hub-visit-actions">
            <Link className="btn-solid" to="/ashram" data-testid="mother-ashram">
              Visit the Ashram <ArrowUpRight size={16} />
            </Link>
            <Link className="btn-ghost-dark" to="/contact" data-testid="mother-contact">
              Contact the office
            </Link>
          </div>
        </div>
      </section>

      <Quote author="Amma">One need not be divine to be a good, perfect human being.</Quote>
    </>
  );
}
