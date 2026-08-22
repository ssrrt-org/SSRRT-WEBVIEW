import { Link } from 'react-router-dom';
import { Eyebrow, SlimHead } from '@/components/shared/PageSections';
import { ArrowUpRight } from 'lucide-react';

export default function EventsPage() { return (
  <>
    <SlimHead
      eyebrow="Events"
      title="Ashram gatherings and festival dates."
    />
    <section className="events-section">
      <div className="wrap">
        <div className="events-hero">
          <Eyebrow>Coming soon</Eyebrow>
          <h2>The calendar is being prepared.</h2>
          <p>The Trust office is finalising dates for the year's events. In the meantime, browse the recurring programmes below — most run through the year at the Ashram.</p>
        </div>
        <div className="events-grid">
          {[
            { title: "Narayana Seva", when: "Annual · date announced by the Trust", note: "10,000–15,000 meals served across slums, jails, orphanages, schools and villages." },
            { title: "Nandi Abhisheka", when: "Recurring · monthly", note: "A traditional abhisheka held at the grand Shiva mantapa." },
            { title: "Butter Alankara — Ganesha", when: "Recurring · seasonal", note: "A traditional butter alankara offered at the Ganesha sannidhi." },
            { title: "Butter Alankara — Subramanya", when: "Recurring · seasonal", note: "A traditional butter alankara offered at the Subramanya sannidhi." },
            { title: "Free medical camps", when: "Rolling · across 4–5 villages", note: "Consultations, basic diagnostics and medicines — always free of cost." },
            { title: "Ashram darshan", when: "Daily", note: "Temples open through the day; timings vary by season. Contact the office to confirm." },
          ].map((ev) => (
            <article key={ev.title} data-testid={`event-${ev.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>
              <h3>{ev.title}</h3>
              <span className="event-when">{ev.when}</span>
              <p>{ev.note}</p>
            </article>
          ))}
        </div>
        <div className="events-cta">
          <p>For confirmed dates, visit timings and seva participation, please contact the Trust office.</p>
          <Link className="btn-solid" data-testid="events-contact" to="/contact">Contact the office <ArrowUpRight size={16}/></Link>
        </div>
      </div>
    </section>
  </>
);
}
