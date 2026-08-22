import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Quote, SlimHead, Split } from "@/components/shared/PageSections";
import { IMG } from "@/constants/images";

const programmes = [
  {
    id: "medical",
    to: "/seva/medical",
    title: "Multi-village medical centre",
    tag: "Medical care · Pillar 01",
    note: "Free consultations, basic diagnostics, and medicines for four to five surrounding villages — a trusted clinic where dignity does not depend on ability to pay.",
    image: IMG.medical,
  },
  {
    id: "medical-village",
    to: "/seva/medical-village",
    title: "Medical support in the village",
    tag: "Village camps",
    note: "When families cannot travel to the centre, coordinators run preventive camps — screening, fevers, referrals, and hygiene awareness in the villages themselves.",
    image: IMG.village,
  },
  {
    id: "food",
    to: "/seva/food",
    title: "Food for the needy",
    tag: "Daily nourishment",
    note: "Beyond Narayana Seva, Amma cooks and distributes fresh meals for hundreds — street dwellers, labourers, and families facing sudden hardship.",
    image: IMG.serve,
  },
  {
    id: "narayana",
    to: "/seva/narayana",
    title: "Narayana Seva",
    tag: "Annual programme",
    note: "Once a year, 10,000–15,000 people receive a freshly prepared meal — slums, jails, orphanages, schools, and villages united in one act of seva.",
    image: IMG.kitchen,
  },
];

export default function MotherForNeedyHubPage() {
  return (
    <>
      <SlimHead
        eyebrow="Mother for the Needy"
        title="Clinics and food for those who cannot pay."
        intro="Free medical care and nourishment for surrounding villages — guided by Amma's conviction that no one should be turned away for lack of money."
      />

      <Split
        eyebrow="Amma's outreach"
        title="Care that reaches the poorest first."
        image={IMG.medical}
        imgAlt="Medical seva at SSRRT"
      >
        <p>
          In rural Karnataka, a fever, a pregnancy complication, or a child's cough can become a crisis when
          the nearest doctor is hours away and every rupee is already spent on food.
        </p>
        <p>
          SSRRT's Mother for the Needy programmes bring the clinic closer, send doctors into villages, and
          put freshly cooked food into hands that would otherwise go empty. The work is practical, daily, and
          deeply personal — because Amma treats every person as Narayana.
        </p>
      </Split>

      <section className="hub-programmes">
        <div className="wrap">
          <Eyebrow>Programmes</Eyebrow>
          <h2 className="section-h">Four paths of compassionate care.</h2>
          <p className="hub-programmes-lede">
            Each programme addresses a different gap — treatment, village access, daily food, and the great annual meal.
            Choose one to read the full story.
          </p>
          <div className="hub-programme-grid">
            {programmes.map((program) => (
              <Link
                key={program.id}
                to={program.to}
                className="hub-programme-card"
                data-testid={`mother-needy-link-${program.id}`}
              >
                <article>
                  <div className="hub-programme-img">
                    <img src={program.image} alt={program.title} loading="lazy" />
                  </div>
                  <div className="hub-programme-body">
                    <span className="temple-card-tag">{program.tag}</span>
                    <h3>{program.title}</h3>
                    <p>{program.note}</p>
                    <span className="temple-card-more">
                      Read programme <ArrowUpRight size={14} />
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hub-feature tint">
        <div className="wrap hub-feature-grid">
          <div>
            <Eyebrow gold>Narayana Seva · Annual programme</Eyebrow>
            <h2>Food is God.<br /><em>To offer food is to offer the Divine.</em></h2>
            <p>
              Every year, kitchens open before dawn. Volunteers cook, transport, and serve while Amma herself
              stands and feeds thousands with her own hands. Slums, jails, orphanages, and villages — all
              gathered under one roof of shared humanity.
            </p>
            <Link className="btn-solid" to="/seva/narayana" data-testid="mother-needy-narayana">
              Read about Narayana Seva <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hub-feature-aside">
            <h3>Who is served</h3>
            <ul>
              <li>City slums and overcrowded urban poverty</li>
              <li>Central jail — inmates often forgotten</li>
              <li>Orphanages and schools for the deaf & mute</li>
              <li>Multiple surrounding villages</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="hub-pillars">
        <div className="wrap">
          <Eyebrow>How you can help</Eyebrow>
          <h2 className="section-h">Join the work of care.</h2>
          <div className="hub-action-grid">
            <article>
              <h3>Support medical camps</h3>
              <p>Help fund medicines, diagnostics, and village screening programmes.</p>
              <Link to="/donate?purpose=medical">Donate to medical seva <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Support Narayana Seva</h3>
              <p>Sponsor the annual meal that reaches 10,000–15,000 people.</p>
              <Link to="/donate?purpose=narayana">Donate to Narayana Seva <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Volunteer your time</h3>
              <p>Help in kitchens, distribution lines, and community outreach.</p>
              <Link to="/volunteering">Volunteer at the Ashram <ArrowUpRight size={14} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="hub-visit">
        <div className="wrap hub-visit-inner">
          <div>
            <Eyebrow gold>Related seva</Eyebrow>
            <h2>Rural upliftment programmes.</h2>
            <p>
              Education scholarships, water tankers in drought summers, and emergency relief after floods —
              the Trust's rural work complements medical and food seva across the same villages.
            </p>
          </div>
          <div className="hub-visit-actions">
            <Link className="btn-solid" to="/rural-upliftment" data-testid="mother-needy-rural">
              Rural upliftment <ArrowUpRight size={16} />
            </Link>
            <Link className="btn-ghost-dark" to="/seva" data-testid="mother-needy-all-seva">
              All seva programmes
            </Link>
          </div>
        </div>
      </section>

      <Quote>
        Rather than dry rations from a distance, food is prepared fresh — with the same care one would give to feeding one's own family.
      </Quote>
    </>
  );
}
