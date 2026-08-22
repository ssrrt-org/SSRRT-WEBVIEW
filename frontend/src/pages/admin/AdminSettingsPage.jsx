import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase";
import { AdminField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";

const FIELDS = [
  ["apiKey", "API key"],
  ["authDomain", "Auth domain"],
  ["projectId", "Project ID"],
  ["storageBucket", "Storage bucket"],
  ["messagingSenderId", "Messaging sender ID"],
  ["appId", "App ID"],
];

export default function AdminSettingsPage() {
  const { data, patch } = useAdminCms();
  const config = { ...firebaseConfig, ...data.firebase };
  const ready = isFirebaseConfigured(config);

  return (
    <div>
      <header className="admin-page-head">
        <h1>Firebase</h1>
        <p>Leave these blank for now. They will authenticate the admin and store CMS data in a later pass.</p>
      </header>
      <div className={`admin-pill${ready ? "" : " off"}`} style={{ marginBottom: 18 }}>
        {ready ? "Config looks complete" : "Not connected — keys are empty"}
      </div>
      <div className="admin-panel admin-stack">
        {FIELDS.map(([key, label]) => (
          <AdminField key={key} label={label}>
            <input
              className="admin-input"
              value={config[key] || ""}
              placeholder={`Paste ${label.toLowerCase()}`}
              onChange={(e) => patch({ firebase: { ...config, [key]: e.target.value } })}
              autoComplete="off"
            />
          </AdminField>
        ))}
      </div>
    </div>
  );
}
