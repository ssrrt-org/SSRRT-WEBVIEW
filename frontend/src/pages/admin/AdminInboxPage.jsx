import { confirmAdminAction } from "@/admin/adminUtils";
import AdminEmptyState from "@/admin/components/AdminEmptyState";
import { useAdminCms } from "@/admin/AdminCmsContext";

export default function AdminInboxPage() {
  const { data, patch } = useAdminCms();

  const archiveMessage = (id) => {
    if (!confirmAdminAction("Archive this message? It will be removed from the inbox list.")) return;
    patch({ inbox: data.inbox.filter((m) => m.id !== id) });
  };

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Inbox</h1>
          <p>Contact and volunteer messages from the public site. Reply by email or phone using the details below.</p>
        </div>
      </header>

      {data.inbox.length === 0 ? (
        <AdminEmptyState
          title="Inbox is empty"
          description="New contact and volunteer form submissions will appear here automatically."
        />
      ) : (
        <div className="admin-stack">
          {data.inbox.map((item) => (
            <article key={item.id} className="admin-panel admin-inbox-card">
              <div className="admin-panel-head">
                <div>
                  <h2>{item.name || "Anonymous"} · {item.type || "Message"}</h2>
                  <p className="admin-muted">
                    {item.email ? <a href={`mailto:${item.email}`}>{item.email}</a> : "No email"}
                    {item.phone ? ` · ${item.phone}` : ""}
                    {item.purpose ? ` · ${item.purpose}` : ""}
                    {item.date ? ` · ${item.date}` : ""}
                  </p>
                </div>
                <div className="admin-row-actions">
                  {item.email ? (
                    <a className="admin-ghost sm" href={`mailto:${item.email}`}>Reply</a>
                  ) : null}
                  <button
                    type="button"
                    className="admin-ghost sm danger"
                    onClick={() => archiveMessage(item.id)}
                  >
                    Archive
                  </button>
                </div>
              </div>
              <p className="admin-inbox-message">{item.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
