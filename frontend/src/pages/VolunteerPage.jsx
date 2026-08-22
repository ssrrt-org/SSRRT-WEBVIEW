import { Eyebrow, SlimHead, Split, Quote, CtaBand } from '@/components/shared/PageSections';
import { IMG } from '@/constants/images';

const volunteerRoles = [
  { title: "Daily feeding & fodder prep", note: "Cut and chop green fodder, mix feed with mineral supplements, carry and distribute food across the shelter sections. Watch a cow eagerly consume a meal you prepared." },
  { title: "Cleaning & sanitation", note: "Clean stalls, wash feeding troughs, maintain clean water sources, and help manage waste through composting programmes that turn dung into organic fertiliser." },
  { title: "Bathing & grooming", note: "Regular bathing and grooming for skin and coat health, prevention of parasites, and a close, gentle interaction that helps spot wounds or swelling early." },
  { title: "Medical support", note: "For volunteers with veterinary background or interest — assist visiting vets during check-ups, vaccinations and treatments, and help maintain basic health records." },
  { title: "Calf care", note: "Bottle-feeding newborns, monitoring young calves for illness, and providing the nurturing presence young animals need to thrive. Often the most emotionally rewarding work." },
  { title: "Infrastructure & maintenance", note: "Shelters, fencing, water systems and storage need ongoing care. Volunteers with carpentry, plumbing or electrical skills contribute significantly here." },
  { title: "Administrative & outreach", note: "Record-keeping, coordinating schedules, managing sponsorships, photographing cows for the adoption programme, and helping spread awareness through community outreach." },
  { title: "Educational programmes", note: "Educate visiting school groups, community members and first-time visitors about cow welfare and the broader values of compassion and non-violence." },
];

const volunteerPeople = [
  { title: "Individuals & families", note: "Bond as a family while instilling compassion in children. Watching a child gently pet a rescued calf leaves a lasting impression no classroom can match." },
  { title: "Students", note: "For students of veterinary science, agriculture or social work, invaluable hands-on experience alongside a meaningful contribution to a cause." },
  { title: "Retirees & seniors", note: "A wonderful way to stay physically active, socially engaged and spiritually fulfilled. The unhurried pace of the Goshala suits many older volunteers well." },
  { title: "Corporate & community groups", note: "A refreshing break from routine, team bonding through shared purpose, and a visible, tangible contribution to sustainability and compassion." },
  { title: "Devotees seeking growth", note: "For many, goshala volunteering is a spiritual practice — a form of seva that purifies the heart, cultivates humility and deepens the connection to the divine." },
];

export default function VolunteerPage() { return (
  <>
    <SlimHead
      eyebrow="Volunteering"
      title="Offer your time at the Goshala or Ashram."
    />

    <section className="volunteer-intro tint">
      <div className="wrap volunteer-intro-grid">
        <div>
          <Eyebrow gold>More than a shelter</Eyebrow>
          <h2>Volunteering is the heartbeat of the Goshala.</h2>
        </div>
        <p>A goshala housing hundreds of cows cannot rely on paid staff alone. The sheer scale of daily tasks — preparing fodder, cleaning enclosures, bathing cows, monitoring health, providing individual attention — demands far more hands than any small institution could employ. Volunteers fill this critical gap. And they bring something paid labour cannot: genuine, heartfelt care that the animals themselves seem to sense.</p>
      </div>
    </section>

    <section className="volunteer-ways">
      <div className="wrap">
        <Eyebrow>Ways to serve · eight roles</Eyebrow>
        <h2 className="section-h">Ways to serve.</h2>
        <div className="volunteer-grid">
          {volunteerRoles.map((r) => (
            <article key={r.title} data-testid={`volunteer-${r.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>
              <h3>{r.title}</h3>
              <p>{r.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="who-can-vol tint">
      <div className="wrap">
        <Eyebrow gold>Who can volunteer</Eyebrow>
        <h2 className="section-h">The doors are open — to anyone with a willing heart.</h2>
        <div className="who-can-grid">
          {volunteerPeople.map((p, i) => (
            <article key={p.title}>
              <span>0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <Split eyebrow="Personal transformation" title="What happens to those who serve." image={IMG.meditation}>
      <p>There is something profoundly grounding about physical labour performed in service of another being who cannot repay you, thank you in words, or fully comprehend your sacrifice. In a world dominated by transactional relationships and digital distraction, the simple, tactile act of feeding, cleaning and caring for a cow offers a rare form of presence.</p>
      <p>Volunteers frequently describe reduced stress and anxiety, attributing it to the calming presence of the animals and the meditative quality of purposeful, repetitive work. They speak of developing deeper patience and gentleness, and of a renewed gratitude that comes from witnessing the resilience of rescued animals.</p>
    </Split>

    <section className="volunteer-expect">
      <div className="wrap volunteer-expect-grid">
        <div>
          <Eyebrow gold>What to expect</Eyebrow>
          <h2>Come as you are. Leave a little quieter.</h2>
          <p>The days are simple: an early start, a shared meal, work done in company, and a slow evening. First-time volunteers are paired with experienced staff or long-term volunteers who demonstrate proper techniques for feeding, cleaning and handling animals safely.</p>
        </div>
        <ul>
          <li><span>01</span><div><strong>Register your interest</strong>Share a note with the Trust office. We will confirm dates, help with travel and lodging where needed.</div></li>
          <li><span>02</span><div><strong>Orientation on arrival</strong>The temples, the kitchens, the Goshala, and safety protocols for working around large animals.</div></li>
          <li><span>03</span><div><strong>Serve alongside</strong>Placed with a small team led by experienced volunteers who know the work by heart. Choose a day, a weekly rhythm or a longer stay.</div></li>
          <li><span>04</span><div><strong>Carry it home</strong>Most volunteers say the day continues to work inside them long after they leave. Many return, again and again.</div></li>
        </ul>
      </div>
    </section>

    <Quote>Every bucket of water carried, every stall cleaned, every calf bottle-fed, and every gentle hand laid upon a recovering cow represents a small but significant act of grace.</Quote>

    <CtaBand
      eyebrow="Get started"
      title="Call or write to the Trust office."
      note="Tell them when you would like to visit and what you can help with."
      primary={{ label: "Contact", to: "/contact", testid: "volunteer-contact" }}
      secondary={{ label: "Seva programmes", to: "/seva", testid: "volunteer-seva" }}
    />
  </>
);
}
