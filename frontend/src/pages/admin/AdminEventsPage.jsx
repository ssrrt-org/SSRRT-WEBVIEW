import { useState } from "react";
import { AdminField, AdminImageField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";

const blank = { id: "", title: "", when: "", note: "", image: "", published: true };

export default function AdminEventsPage() {
  const { data, patch } = useAdminCms();
  const [editing, setEditing] = useState(null);

  const save = (event) => {
    const exists = data.events.some((e) => e.id === event.id);
    patch({
      events: exists
        ? data.events.map((e) => (e.id === event.id ? event : e))
        : [...data.events, event],
    });
    setEditing(null);
  };

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Events</h1>
          <p>Festival dates, recurring sevas, and gatherings shown on the Events page.</p>
        </div>
        <button
          type="button"
          className="admin-btn"
          onClick={() => setEditing({ ...blank, id: `ev-${Date.now()}` })}
        >
          Add event
        </button>
      </header>

      <div className="admin-card-grid">
        {data.events.map((event) => (
          <article key={event.id} className="admin-mini-card">
            {event.image ? <img className="admin-cover" src={event.image} alt="" /> : null}
            <strong>{event.title}</strong>
            <span className="admin-muted">{event.when}</span>
            <p>{event.note}</p>
            <span className={`admin-pill${event.published ? "" : " off"}`}>
              {event.published ? "Published" : "Draft"}
            </span>
            <div className="admin-row-actions">
              <button type="button" className="admin-ghost" onClick={() => setEditing(event)}>Edit</button>
              <button
                type="button"
                className="admin-ghost danger"
                onClick={() => patch({ events: data.events.filter((e) => e.id !== event.id) })}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      {editing && (
        <div className="admin-drawer-backdrop" onClick={() => setEditing(null)}>
          <form
            className="admin-drawer"
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              save(editing);
            }}
          >
            <h2>Event</h2>
            <AdminField label="Title">
              <input className="admin-input" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </AdminField>
            <AdminField label="When">
              <input className="admin-input" value={editing.when} onChange={(e) => setEditing({ ...editing, when: e.target.value })} />
            </AdminField>
            <AdminField label="Note">
              <textarea className="admin-input" rows={4} value={editing.note} onChange={(e) => setEditing({ ...editing, note: e.target.value })} />
            </AdminField>
            <label className="admin-check">
              <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
              Published on the public Events page
            </label>
            <AdminImageField label="Image" value={editing.image} onChange={(v) => setEditing({ ...editing, image: v })} />
            <div className="admin-drawer-actions">
              <button type="button" className="admin-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" className="admin-btn">Save event</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
