import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Quote, SlimHead, Split } from "@/components/shared/PageSections";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { IMG } from "@/constants/images";

const programmes = [
  {
    id: "education",
    to: "/seva/education",
    title: "Education support",
    tag: "School fees · Pillar 01",
    note: "Fees, books, uniforms, and mentorship for students who would otherwise drop out when family income fails.",
    image: IMG.village,
  },
  {
    id: "water",
    to: "/seva/water",
    title: "Water supply",
    tag: "Drought relief",
    note: "Tankers reach villages when wells run dry in summer — clean drinking water when every drop matters.",
    image: IMG.event1,
  },
  {
    id: "relief",
    to: "/seva/relief",
    title: "Bedding & crisis relief",
    tag: "Emergency response",
    note: "After floods, cyclones, and pandemic hardship — mattresses, blankets, and essentials for families who lost everything.",
    image: IMG.serve,
  },
  {
    id: "narayana",
    to: "/seva/narayana",
    title: "Narayana Seva",
    tag: "Annual community meal",
    note: "Once a year, 10,000–15,000 people receive a freshly prepared meal across slums, jails, orphanages, and villages.",
    image: IMG.kitchen,
  },
];

export default function RuralUpliftmentHubPage() {
  return (
    <>
      <SlimHead
        eyebrow="Rural Upliftment"
        title="School fees, water tankers, and crisis relief."
        intro="Practical seva for villages around Karekura — education when families cannot afford fees, water when wells dry up, and relief when disaster strikes."
      />

      <Split
        eyebrow="Village-first seva"
        title="When hardship is seasonal, the response must be steady."
        image={IMG.village}
        imgAlt="Rural outreach at SSRRT"
      >
        <p>
          Rural Karnataka faces cycles of drought, crop failure, and sudden floods. A child's school fee becomes
          impossible when the harvest fails. A village well that served three generations runs empty in May.
        </p>
        <p>
          SSRRT's rural upliftment work meets these moments with scholarships, tanker runs, and emergency kits —
          coordinated quietly, without bureaucracy, because Amma knows the families by name.
        </p>
      </Split>

      <HubProgrammesSection
        eyebrow="Programmes"
        title="Four pillars of rural support."
        lede="Each programme addresses a different gap in village life. Choose one to read how the Trust responds."
        programmes={programmes}
        testIdPrefix="rural"
      />

      <section className="hub-feature tint">
        <div className="wrap hub-feature-grid">
          <div>
            <Eyebrow gold>Education · Long-term impact</Eyebrow>
            <h2>
              A scholarship today
              <br />
              <em>can change a family's tomorrow.</em>
            </h2>
            <p>
              Beyond paying fees, coordinators check in on attendance, help with exam preparation, and connect
              families to the medical centre when illness keeps children home. The goal is not charity — it is
              continuity.
            </p>
            <Link className="btn-solid" to="/seva/education" data-testid="rural-education">
              Read about education seva <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hub-feature-aside">
            <h3>What support covers</h3>
            <ul>
              <li>School and college fees for deserving students</li>
              <li>Books, uniforms, and study materials</li>
              <li>Mentorship and follow-up through the year</li>
              <li>Coordination with village schools and families</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="hub-pillars">
        <div className="wrap">
          <Eyebrow>How you can help</Eyebrow>
          <h2 className="section-h">Support rural programmes.</h2>
          <div className="hub-action-grid">
            <article>
              <h3>Sponsor a student</h3>
              <p>Help cover school fees and materials for a child in a surrounding village.</p>
              <Link to="/donate?purpose=education">Donate to education <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Fund water tankers</h3>
              <p>Keep clean drinking water flowing when village wells run dry in summer.</p>
              <Link to="/donate?purpose=water">Donate to water seva <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Relief in crisis</h3>
              <p>Contribute to bedding, blankets, and essentials after floods and disasters.</p>
              <Link to="/donate?purpose=relief">Donate to relief seva <ArrowUpRight size={14} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="hub-visit">
        <div className="wrap hub-visit-inner">
          <div>
            <Eyebrow gold>Related seva</Eyebrow>
            <h2>Medical care and daily food.</h2>
            <p>
              Rural upliftment works alongside the Mother for the Needy programmes — free clinics, village camps,
              and daily nourishment for families who cannot pay.
            </p>
          </div>
          <div className="hub-visit-actions">
            <Link className="btn-solid" to="/mother-for-needy" data-testid="rural-mother-needy">
              Mother for the Needy <ArrowUpRight size={16} />
            </Link>
            <Link className="btn-ghost-dark" to="/seva" data-testid="rural-all-seva">
              All seva programmes
            </Link>
          </div>
        </div>
      </section>

      <Quote>
        The Trust does not wait for headlines — tankers leave when the well is empty, fees are paid before
        the term ends, and relief reaches villages while the roads are still muddy.
      </Quote>
    </>
  );
}
