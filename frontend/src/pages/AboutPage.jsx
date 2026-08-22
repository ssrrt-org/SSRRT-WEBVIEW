import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Eyebrow, Quote, SlimHead, Split } from "@/components/shared/PageSections";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
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
  return (
    <>
      <SlimHead
        eyebrow="SSRRT"
        title="Srimad Sai Rajarajeshwari Trust."
        intro="A living Ashram on the banks of the Cauvery — gau seva, free medical care, rural upliftment, and worship guided by Amma's conviction that service to humanity is service to God."
      />

      <Split eyebrow="What we do" title="Day-to-day work." image={IMG.event1}>
        <p>
          Project Kaamadhenau feeds and shelters more than 300 cows. A free clinic serves four or five villages.
          Students get help with school fees. Tankers run when wells dry up. Once a year, Narayana Seva cooks for
          10,000–15,000 people.
        </p>
        <p>
          The Ashram has eight temple sannidhis that Amma has worshipped in for decades. Volunteers help in the
          Goshala, kitchens, and during festivals.
        </p>
      </Split>

      <Split
        eyebrow="Our foundation"
        title="Service rooted in Karekura."
        image={IMG.amma}
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
        programmes={pillars}
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
            <h2>Karekura, on the Cauvery.</h2>
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
              <span>Karekura, Mysore, Karnataka, India</span>
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
