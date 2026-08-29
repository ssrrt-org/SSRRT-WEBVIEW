import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Eyebrow, Quote, SlimHead, Split } from "@/components/shared/PageSections";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { useFormation, usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";

const pillars = [
  {
    id: "goshala",
    to: "/goshala",
    title: "Project Kaamadhenau",
    tag: "Gau seva · Goshala",
    note: "More than 300 cows fed and sheltered — the Goshala is the heart of daily seva at Karekura.",
    image: IMG.goshalaLocal,
  },
  {
    id: "ashram",
    to: "/ashram",
    title: "The Ashram",
    tag: "Eight sannidhis",
    note: "Temples where Amma has worshipped for decades — Shiva, Ganesha, Subramanya, and more on the Cauvery.",
    image: IMG.templeSouth,
  },
  {
    id: "mother-needy",
    to: "/mother-for-needy",
    title: "Mother for the Needy",
    tag: "Medical & food seva",
    note: "Free clinic for four to five villages, village camps, daily food, and the annual Narayana Seva meal.",
    image: IMG.medical,
  },
  {
    id: "rural",
    to: "/rural-upliftment",
    title: "Rural upliftment",
    tag: "Education & relief",
    note: "School fees, water tankers in drought summers, and crisis relief after floods and cyclones.",
    image: IMG.village,
  },
  {
    id: "sevas",
    to: "/sevas",
    title: "Ashram sevas",
    tag: "Ritual worship",
    note: "Nandi Abhisheka and seasonal butter alankaras at the Ganesha and Subramanya sannidhis.",
    image: IMG.ganesha,
  },
  {
    id: "volunteer",
    to: "/volunteering",
    title: "Volunteering",
    tag: "Join the work",
    note: "Help in the Goshala, kitchens, medical camps, and during festivals at the Ashram.",
    image: IMG.serve,
  },
];

export default function AboutPage() {
  const formation = useFormation();
  const img = usePageImages("/about");
  const pillarCards = pillars.map((pillar) => ({
    ...pillar,
    image: img(`pillar-${pillar.id}`, pillar.image),
  }));

  return (
    <>
      <SlimHead
        eyebrow={formation.eyebrow || "SSRRT"}
        title={formation.title || "Srimad Sai Rajarajeshwari Trust."}
        intro={formation.intro}
      />

      <Split eyebrow="What we do" title="Day-to-day work." image={formation.image || IMG.event1}>
        <p>{formation.body1}</p>
        <p>{formation.body2}</p>
      </Split>

      <Split
        eyebrow="Our foundation"
        title="Service rooted in Karekura."
        image={img("split-foundation", IMG.amma)}
        imgAlt="Amma at SSRRT"
        reverse
        tint
      >
        <p>
          Srimad Sai Rajarajeshwari Trust was formed to carry forward Amma's vision — practical seva for the
          poorest first, worship that stays alive through daily ritual, and an Ashram open to anyone who seeks
          darshan or wishes to volunteer.
        </p>
        <p>
          The Trust operates without fanfare. Coordinators know the villages by name. When a well runs dry or a
          child's fees are due, the response is immediate — because Amma treats every person as Narayana.
        </p>
      </Split>

      <HubProgrammesSection
        eyebrow="Main areas"
        title="Where the Trust's work lives."
        lede="From the Goshala to rural villages — explore each area of seva at SSRRT."
        programmes={pillarCards}
        testIdPrefix="about"
      />

      <section className="hub-pillars tint">
        <div className="wrap">
          <Eyebrow>Get involved</Eyebrow>
          <h2 className="section-h">Support the Trust's work.</h2>
          <div className="hub-action-grid">
            <article>
              <h3>Donate</h3>
              <p>Fund gau seva, medical camps, education, water tankers, and Narayana Seva.</p>
              <Link to="/donate">Make a donation <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Volunteer</h3>
              <p>Spend time in the Goshala, kitchens, and during Ashram festivals.</p>
              <Link to="/volunteering">Volunteer at the Ashram <ArrowUpRight size={14} /></Link>
            </article>
            <article>
              <h3>Visit</h3>
              <p>Plan darshan and seva at Karekura — call the office before you travel.</p>
              <Link to="/contact">Contact the office <ArrowUpRight size={14} /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="about-location">
        <div className="wrap about-location-grid">
          <div>
            <Eyebrow gold>Location</Eyebrow>
            <h2>{formation.locationTitle || "Karekura, on the Cauvery."}</h2>
            <p>
              The Ashram is open to visitors for darshan and seva. Call the office before you travel — especially
              during festivals and Narayana Seva week.
            </p>
            <Link className="btn-solid" to="/events" style={{ marginTop: "1.25rem" }}>
              View events <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="about-location-detail">
            <MapPin size={20} aria-hidden="true" />
            <div>
              <strong>Address</strong>
              <span>{formation.address || "Karekura, Mysore, Karnataka, India"}</span>
            </div>
          </div>
        </div>
      </section>

      <Quote author="Amma">
        Service to humanity is the highest form of worship — and every person who comes to us is Narayana.
      </Quote>
    </>
  );
}
