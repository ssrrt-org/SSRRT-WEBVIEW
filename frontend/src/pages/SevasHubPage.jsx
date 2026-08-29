import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Quote, SlimHead, Split } from "@/components/shared/PageSections";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { usePageImages } from "@/context/CmsContext";
import { ashramRituals } from "@/constants/sevasRituals";
import { IMG } from "@/constants/images";

const ritualImages = {
  "nandi-abhisheka": IMG.manidweepa,
  "butter-ganesha": IMG.ganesha,
  "butter-subramanya": IMG.templeSouth,
};

const programmes = [
  ...ashramRituals.map((r) => ({
    id: r.id,
    to: r.path,
    title: r.title,
    tag: r.eyebrow,
    note: r.intro || r.paragraphs?.[0],
    image: ritualImages[r.id] || IMG.manidweepa,
    testid: `sevas-link-${r.id}`,
  })),
  {
    id: "ashram",
    to: "/ashram",
    title: "The Ashram & sannidhis",
    tag: "Eight sacred spaces",
    note: "Eight temple sannidhis where Amma has worshipped for decades — Shiva, Ganesha, Subramanya, and more on the banks of the Cauvery.",
    image: IMG.templeSouth,
    testid: "sevas-link-ashram",
  },
];

export default function SevasHubPage() {
  const img = usePageImages("/sevas");
  const cards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <>
      <SlimHead
        eyebrow="Ashram sevas"
        title="Nandi Abhisheka and seasonal alankaras."
        intro="Living worship at the Ashram — traditional abhishekas and butter alankaras held with devotion in the eight sannidhis Amma has tended for decades."
      />

      <Split
        eyebrow="Worship at Karekura"
        title="Rituals that carry wishes to the Divine."
        image={img("split-worship", IMG.manidweepa)}
        imgAlt="Ashram worship at SSRRT"
        reverse
      >
        <p>
          At the grand Shiva mantapa, devotees whisper heartfelt prayers into Nandi's ear — trusting that he
          carries them directly to Lord Shiva. At the Ganesha and Subramanya sannidhis, families gather for
          seasonal butter alankaras that honour abundance, courage, and new beginnings.
        </p>
        <p>
          These sevas are not performances for an audience. They are the Ashram's daily rhythm of worship —
          open to devotees who wish to participate, offer, and pray alongside Amma's living tradition.
        </p>
      </Split>

      <HubProgrammesSection
        eyebrow="Rituals & spaces"
        title="Participate in Ashram worship."
        lede="From Nandi Abhisheka to seasonal alankaras — and the sacred sannidhis where decades of devotion continue."
        programmes={cards}
        testIdPrefix="sevas"
      />

      <section className="hub-feature tint">
        <div className="wrap hub-feature-grid">
          <div>
            <Eyebrow gold>Nandi Abhisheka</Eyebrow>
            <h2>
              Whisper your prayer
              <br />
              <em>into Nandi's ear.</em>
            </h2>
            <p>
              Nandi, the sacred bull and devoted vehicle of Lord Shiva, receives a traditional abhisheka at the
              grand mantapa. Devotees offer milk, water, and prayers — a seva held with reverence as part of the
              Ashram's living worship.
            </p>
            <Link className="btn-solid" to="/sevas/nandi-abhisheka" data-testid="sevas-nandi">
              Read about Nandi Abhisheka <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hub-feature-aside">
            <h3>Seasonal alankaras</h3>
            <ul>
              <li>Butter alankara for Lord Ganesha — sweetness and new beginnings</li>
              <li>Butter alankara for Lord Subramanya — courage and clarity of purpose</li>
              <li>Families often bring children before a new school year</li>
              <li>Open to devotees from surrounding villages</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="hub-pillars">
        <div className="wrap">
          <Eyebrow>Plan your visit</Eyebrow>
          <h2 className="section-h">Join worship at the Ashram.</h2>
          <div className="hub-action-grid">
            <article>
              <h3>Explore the Ashram</h3>
              <p>Walk through eight sannidhis, sacred spaces, and the Shiva mantapa on the Cauvery.</p>
              <Link to="/ashram">Visit the Ashram <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Offer a seva</h3>
              <p>Participate in abhisheka and alankara programmes during your visit.</p>
              <Link to="/contact">Contact the office <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Volunteer at festivals</h3>
              <p>Help in kitchens and arrangements during major Ashram celebrations.</p>
              <Link to="/volunteering">Volunteer <ArrowUpRight size={14} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="hub-visit">
        <div className="wrap hub-visit-inner">
          <div>
            <Eyebrow gold>Beyond ritual seva</Eyebrow>
            <h2>Community programmes at the Trust.</h2>
            <p>
              Worship at the Ashram sits alongside gau seva, medical camps, rural upliftment, and Narayana Seva —
              the full scope of SSRRT's work in Karekura and surrounding villages.
            </p>
          </div>
          <div className="hub-visit-actions">
            <Link className="btn-solid" to="/seva" data-testid="sevas-all-programmes">
              All seva programmes <ArrowUpRight size={16} />
            </Link>
            <Link className="btn-ghost-dark" to="/donate" data-testid="sevas-donate">
              Donate to the Trust
            </Link>
          </div>
        </div>
      </section>

      <Quote author="Amma">
        Worship is not separate from service — every act of seva at the Ashram is an offering to the Divine.
      </Quote>
    </>
  );
}
