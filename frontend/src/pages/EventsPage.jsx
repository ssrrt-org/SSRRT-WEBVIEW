import { Link } from 'react-router-dom';
import { Eyebrow } from '@/components/shared/PageSections';
import { ArrowUpRight } from 'lucide-react';
import { usePublishedEvents } from '@/context/CmsContext';

export default function EventsPage() {
  const events = usePublishedEvents();

  return (
    <section className="events-section">
      <div className="wrap">
        <div className="events-hero">
          <Eyebrow>Events</Eyebrow>
          <h1>Ashram gatherings and festival dates.</h1>
          <p>Confirmed dates are announced by the Trust office. Browse the programmes below — most run through the year at the Ashram.</p>
        </div>
        <div className="events-grid">
          {events.map((ev) => (
            <article key={ev.id || ev.title} data-testid={`event-${ev.title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`}>
              {ev.image ? (
                <div className="event-image">
                  <img src={ev.image} alt="" loading="lazy" />
                </div>
              ) : null}
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
  );
}
