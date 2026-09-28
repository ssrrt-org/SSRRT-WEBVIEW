import { useState } from "react";
import { confirmAdminAction } from "@/admin/adminUtils";
import AdminDrawer from "@/admin/components/AdminDrawer";
import AdminEmptyState from "@/admin/components/AdminEmptyState";
import { AdminField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";

const blank = () => ({
  id: `dev-${Date.now()}`,
  name: "",
  location: "",
  tag: "",
  date: "",
  message: "",
  published: true,
});

export default function AdminDevoteesPage() {
  const { data, patch } = useAdminCms();
  const stories = data.devoteeStories || [];
  const [editing, setEditing] = useState(null);

  const isNewStory = editing && !stories.some((s) => s.id === editing.id);

  const save = (story) => {
    const exists = stories.some((s) => s.id === story.id);
    patch({
      devoteeStories: exists
        ? stories.map((s) => (s.id === story.id ? story : s))
        : [...stories, story],
    });
    setEditing(null);
  };

  const removeStory = (id) => {
    if (!confirmAdminAction("Remove this story from the website?")) return;
    patch({ devoteeStories: stories.filter((s) => s.id !== id) });
  };

  const openFromInbox = (item) => {
    setEditing({
      id: `dev-${Date.now()}`,
      name: item.name || "",
      location: item.purpose || "",
      tag: "",
      date: item.date || "",
      message: item.message || "",
      published: false,
    });
  };

  const inboxDevotee = (data.inbox || []).filter(
    (m) => (m.type || "").toLowerCase().includes("devotee"),
  );

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Devotees Corner</h1>
          <p>
            Publish approved devotee experiences on the public Devotees Corner page. New submissions arrive
            in Inbox as &ldquo;Devotees Corner&rdquo;.
          </p>
        </div>
        <button type="button" className="admin-btn" onClick={() => setEditing(blank())}>
          Add story
        </button>
      </header>

      {inboxDevotee.length > 0 ? (
        <section className="admin-panel admin-devotees-inbox-pending">
          <h2>Pending from Inbox ({inboxDevotee.length})</h2>
          <p className="admin-muted">Open a submission to copy it into a draft story.</p>
          <div className="admin-stack">
            {inboxDevotee.map((item) => (
              <article key={item.id} className="admin-inbox-card admin-panel">
                <div className="admin-panel-head">
                  <div>
                    <h2>{item.name || "Anonymous"}</h2>
                    <p className="admin-muted">
                      {item.email || "No email"}
                      {item.date ? ` · ${item.date}` : ""}
                    </p>
                  </div>
                  <button type="button" className="admin-ghost sm" onClick={() => openFromInbox(item)}>
                    Use in new story
                  </button>
                </div>
                <p className="admin-inbox-message">{item.message}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {stories.length === 0 ? (
        <AdminEmptyState
          title="No published stories yet"
          description="Review inbox submissions, then add approved experiences here."
          action={(
            <button type="button" className="admin-btn" onClick={() => setEditing(blank())}>
              Add story
            </button>
          )}
        />
      ) : (
        <div className="admin-stack">
          {stories.map((story) => (
            <article key={story.id} className="admin-panel">
              <div className="admin-panel-head">
                <div>
                  <h2>{story.name}</h2>
                  <p className="admin-muted">
                    {story.location || "No location"}
                    <span className={`admin-pill${story.published ? "" : " off"}`}>
                      {story.published ? "Published" : "Draft"}
                    </span>
                  </p>
                </div>
                <div className="admin-row-actions">
                  <button type="button" className="admin-ghost sm" onClick={() => setEditing(story)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-ghost sm danger"
                    onClick={() => removeStory(story.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p className="admin-inbox-message">{story.message}</p>
            </article>
          ))}
        </div>
      )}

      {editing ? (
        <AdminDrawer
          title={isNewStory ? "Add story" : "Edit story"}
          onClose={() => setEditing(null)}
          footer={(
            <>
              <button type="button" className="admin-ghost" onClick={() => setEditing(null)}>
                Cancel
              </button>
              <button type="submit" form="admin-devotee-form" className="admin-btn">
                Save story
              </button>
            </>
          )}
        >
          <form
            id="admin-devotee-form"
            className="admin-stack"
            onSubmit={(e) => {
              e.preventDefault();
              save(editing);
            }}
          >
            <AdminField label="Name">
              <input
                className="admin-input"
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                required
              />
            </AdminField>
            <AdminField label="City / region">
              <input
                className="admin-input"
                value={editing.location}
                onChange={(e) => setEditing({ ...editing, location: e.target.value })}
              />
            </AdminField>
            <AdminField label="Category tag" hint="Shown on the story card, e.g. Mysuru Darshan">
              <input
                className="admin-input"
                value={editing.tag || ""}
                onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
              />
            </AdminField>
            <AdminField label="Date label" hint="Optional, e.g. Kartika Masam, 2025">
              <input
                className="admin-input"
                value={editing.date || ""}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
              />
            </AdminField>
            <AdminField label="Experience">
              <textarea
                className="admin-input"
                rows={8}
                value={editing.message}
                onChange={(e) => setEditing({ ...editing, message: e.target.value })}
                required
              />
            </AdminField>
            <label className="admin-check">
              <input
                type="checkbox"
                checked={editing.published !== false}
                onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              />
              Published on website
            </label>
          </form>
        </AdminDrawer>
      ) : null}
    </div>
  );
}
