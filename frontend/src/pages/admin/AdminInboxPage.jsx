import { useAdminCms } from "@/admin/AdminCmsContext";

export default function AdminInboxPage() {
  const { data, patch } = useAdminCms();

  return (
    <div>
      <header className="admin-page-head">
        <h1>Inbox</h1>
        <p>Contact and volunteer messages. This is sample data until forms post to Firebase.</p>
      </header>
      <div className="admin-stack">
        {data.inbox.map((item) => (
          <article key={item.id} className="admin-panel">
            <div className="admin-panel-head">
              <h2>{item.name} · {item.type}</h2>
              <button
                type="button"
                className="admin-ghost danger"
                onClick={() => patch({ inbox: data.inbox.filter((m) => m.id !== item.id) })}
              >
                Archive
              </button>
            </div>
            <p className="admin-muted">{item.email} · {item.date}</p>
            <p>{item.message}</p>
          </article>
        ))}
        {data.inbox.length === 0 ? <p className="admin-muted">Inbox is empty.</p> : null}
      </div>
    </div>
  );
}
