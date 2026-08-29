import { useId, useState } from "react";
import { Upload } from "lucide-react";
import { uploadImage } from "@/lib/storage";
import { isUsableImageUrl } from "@/lib/utils";

export function AdminField({ label, hint, children }) {
  return (
    <label className="admin-field">
      <span className="admin-label">{label}</span>
      {children}
      {hint ? <small className="admin-hint">{hint}</small> : null}
    </label>
  );
}

export function AdminImageField({ label, value, onChange, hint, uploadFolder = "cms" }) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const urlLooksValid = !value || isUsableImageUrl(value);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError("");
    try {
      const url = await uploadImage(file, uploadFolder);
      onChange(url);
    } catch (error) {
      const reader = new FileReader();
      reader.onload = () => onChange(String(reader.result || ""));
      reader.readAsDataURL(file);
      setUploadError(error.message || "Storage upload failed — saved as inline preview instead.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="admin-field">
      <span className="admin-label">{label}</span>
      <div className="admin-image-row">
        <div className="admin-image-preview">
          {value ? <img src={value} alt="" /> : <span>No image yet</span>}
        </div>
        <div className="admin-image-controls">
          <input
            className="admin-input"
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL or upload a file below"
          />
          {!urlLooksValid ? (
            <small className="admin-hint admin-hint-warn">
              This link looks incomplete. Upload a file again or paste the full image URL.
            </small>
          ) : null}
          <label className="admin-file-btn" htmlFor={inputId}>
            <Upload size={14} />
            {uploading ? "Uploading…" : "Choose image file"}
          </label>
          <input
            id={inputId}
            className="admin-file-input"
            type="file"
            accept="image/*"
            onChange={onFile}
            disabled={uploading}
          />
          {uploading ? <small className="admin-hint">Uploading to Firebase Storage…</small> : null}
          {uploadError ? <small className="admin-hint admin-hint-warn">{uploadError}</small> : null}
          {hint ? <small className="admin-hint">{hint}</small> : null}
        </div>
      </div>
    </div>
  );
}

export function AdminAutoSaveHint() {
  return (
    <p className="admin-autosave-hint">
      Changes save automatically after you pause typing.
    </p>
  );
}
