import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SevaScrollingHero from "@/components/seva/SevaScrollingHero";
import { Eyebrow, Quote, Split } from "@/components/shared/PageSections";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { usePageImages } from "@/context/CmsContext";
import { SUPPORT_CAUSE_LABEL } from "@/constants/supportLabels";
import { ashramRituals } from "@/constants/sevasRituals";
import { IMG } from "@/constants/images";

const ritualImages = {
  "nandi-abhisheka": IMG.manidweepa,
  "ghee-butter-abhisheka": IMG.ganesha,
  alankar: IMG.templeSouth,
  "ganesh-abhisheka": IMG.ganesha,
  "bhavatarini-seva": IMG.amma,
  "subramanya-seva": IMG.templeSouth,
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
    <div className="mother-page sevas-hub-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Ashram sevas</Eyebrow>
          <h1 className="mother-page-title">Nandi Abhisheka and seasonal alankaras.</h1>
          <p className="mother-page-lede">
            Living worship at the Ashram — traditional abhishekas and butter alankaras held with devotion in the
            sannidhis Amma has tended for decades.
          </p>
        </div>
      </header>

      <SevaScrollingHero />

      <Split
        eyebrow="Worship at Karekura"
        title="Rituals that carry wishes to the Divine."
        image={img("split-worship", IMG.manidweepa)}
        imgAlt="Ashram worship at SSRRT"
        reverse
      >
        <p>
          At the grand Shiva mantapa, devotees whisper heartfelt prayers into Nandi&apos;s ear — trusting that he
          carries them directly to Lord Shiva. At the Ganesha and Subramanya sannidhis, families gather for
          seasonal butter alankaras that honour abundance, courage, and new beginnings.
        </p>
        <p>
          These sevas are not performances for an audience. They are the Ashram&apos;s daily rhythm of worship —
          open to devotees who wish to participate, offer, and pray alongside Amma&apos;s living tradition.
        </p>
      </Split>

      <HubProgrammesSection
        hideHeader
        lede="Each seva has its own page — read about the ritual and book your participation when you are ready."
        programmes={cards}
        testIdPrefix="sevas"
        tint
      />

      <section className="hub-feature tint">
        <div className="wrap hub-feature-grid">
          <div>
            <Eyebrow gold>Nandi Abhisheka</Eyebrow>
            <h2 className="mother-line-heading">
              Whisper your prayer <em>into Nandi&apos;s ear.</em>
            </h2>
            <p>
              Nandi, the sacred bull and devoted vehicle of Lord Shiva, receives a traditional abhisheka at the
              grand mantapa. Devotees offer milk, water, and prayers — a seva held with reverence as part of the
              Ashram&apos;s living worship.
            </p>
            <Link className="btn-solid" to="/sevas/nandi-abhisheka/book" data-testid="sevas-nandi-book">
              Book Nandi Abhisheka <ArrowUpRight size={16} />
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

      <section className="hub-visit">
        <div className="wrap hub-visit-inner">
          <div>
            <Eyebrow gold>Beyond ritual seva</Eyebrow>
            <h2 className="mother-line-heading mother-line-heading-sm">Community programmes at the Trust.</h2>
            <p>
              Worship at the Ashram sits alongside gau seva, medical camps, rural upliftment, and Narayana Seva —
              the full scope of SSRRT&apos;s work in Karekura and surrounding villages.
            </p>
          </div>
          <div className="hub-visit-actions">
            <Link className="btn-solid" to="/seva" data-testid="sevas-all-programmes">
              All seva programmes <ArrowUpRight size={16} />
            </Link>
            <Link className="btn-ghost-dark" to="/donate" data-testid="sevas-donate">
              {SUPPORT_CAUSE_LABEL}
            </Link>
          </div>
        </div>
      </section>

      <Quote author="Amma">
        Worship is not separate from service — every act of seva at the Ashram is an offering to the Divine.
      </Quote>
    </div>
  );
}
