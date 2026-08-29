export default function AdminEmptyState({ title, description, action }) {
  return (
    <div className="admin-empty">
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
      {action || null}
    </div>
  );
}
