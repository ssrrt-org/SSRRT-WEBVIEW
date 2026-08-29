import { useState } from "react";
import { confirmAdminAction } from "@/admin/adminUtils";
import AdminDrawer from "@/admin/components/AdminDrawer";
import AdminEmptyState from "@/admin/components/AdminEmptyState";
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

  const removeEvent = (id) => {
    if (!confirmAdminAction("Remove this event?")) return;
    patch({ events: data.events.filter((e) => e.id !== id) });
  };

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Events</h1>
          <p>Festival dates, recurring sevas, and gatherings shown on the public Events page.</p>
        </div>
        <button
          type="button"
          className="admin-btn"
          onClick={() => setEditing({ ...blank, id: `ev-${Date.now()}` })}
        >
          Add event
        </button>
      </header>

      {data.events.length === 0 ? (
        <AdminEmptyState
          title="No events yet"
          description="Add the first festival, seva, or gathering for visitors to see."
          action={(
            <button
              type="button"
              className="admin-btn sm"
              onClick={() => setEditing({ ...blank, id: `ev-${Date.now()}` })}
            >
              Add event
            </button>
          )}
        />
      ) : (
        <div className="admin-card-grid">
          {data.events.map((event) => (
            <article key={event.id} className="admin-mini-card">
              {event.image ? <img className="admin-cover" src={event.image} alt="" /> : <div className="admin-cover admin-cover-empty">No image</div>}
              <strong>{event.title || "Untitled event"}</strong>
              <span className="admin-muted">{event.when || "Date not set"}</span>
              <p>{event.note || "No description yet."}</p>
              <span className={`admin-pill${event.published ? "" : " off"}`}>
                {event.published ? "Published" : "Draft"}
              </span>
              <div className="admin-row-actions">
                <button type="button" className="admin-ghost sm" onClick={() => setEditing(event)}>Edit</button>
                <button type="button" className="admin-ghost sm danger" onClick={() => removeEvent(event.id)}>Remove</button>
              </div>
            </article>
          ))}
        </div>
      )}

      {editing ? (
        <AdminDrawer
          title="Event"
          onClose={() => setEditing(null)}
          footer={(
            <>
              <button type="button" className="admin-ghost" onClick={() => setEditing(null)}>Cancel</button>
              <button type="submit" form="admin-event-form" className="admin-btn">Save event</button>
            </>
          )}
        >
          <form
            id="admin-event-form"
            className="admin-stack"
            onSubmit={(e) => {
              e.preventDefault();
              save(editing);
            }}
          >
            <AdminField label="Title">
              <input className="admin-input" required value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </AdminField>
            <AdminField label="When" hint="Example: Sunday, 12 October · 6:00 AM">
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
          </form>
        </AdminDrawer>
      ) : null}
    </div>
  );
}
