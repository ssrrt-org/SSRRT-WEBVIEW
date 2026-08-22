export function AdminField({ label, hint, children }) {
  return (
    <label className="admin-field">
      <span className="admin-label">{label}</span>
      {children}
      {hint ? <small className="admin-hint">{hint}</small> : null}
    </label>
  );
}

export function AdminImageField({ label, value, onChange, hint }) {
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  return (
    <div className="admin-field">
      <span className="admin-label">{label}</span>
      <div className="admin-image-row">
        <div className="admin-image-preview">
          {value ? <img src={value} alt="" /> : <span>No image</span>}
        </div>
        <div className="admin-image-controls">
          <input
            className="admin-input"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or upload a file"
          />
          <input type="file" accept="image/*" onChange={onFile} />
          {hint ? <small className="admin-hint">{hint}</small> : null}
        </div>
      </div>
    </div>
  );
}
