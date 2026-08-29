import { AdminAutoSaveHint, AdminField, AdminImageField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";

export default function AdminFormationPage() {
  const { data, patchDebounced } = useAdminCms();
  const formation = data.formation;
  const set = (key) => (e) => patchDebounced({ formation: { ...formation, [key]: e.target.value } });

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Formation</h1>
          <p>Copy and imagery for the About page — how the Trust is introduced to visitors.</p>
          <AdminAutoSaveHint />
        </div>
      </header>
      <div className="admin-panel admin-stack">
        <AdminField label="Eyebrow">
          <input className="admin-input" value={formation.eyebrow} onChange={set("eyebrow")} />
        </AdminField>
        <AdminField label="Page title">
          <input className="admin-input" value={formation.title} onChange={set("title")} />
        </AdminField>
        <AdminField label="Intro">
          <input className="admin-input" value={formation.intro} onChange={set("intro")} />
        </AdminField>
        <AdminField label="First paragraph">
          <textarea className="admin-input" rows={4} value={formation.body1} onChange={set("body1")} />
        </AdminField>
        <AdminField label="Second paragraph">
          <textarea className="admin-input" rows={4} value={formation.body2} onChange={set("body2")} />
        </AdminField>
        <AdminImageField
          label="Formation image"
          value={formation.image}
          onChange={(v) => patchDebounced({ formation: { ...formation, image: v } })}
        />
        <AdminField label="Location heading">
          <input className="admin-input" value={formation.locationTitle} onChange={set("locationTitle")} />
        </AdminField>
        <AdminField label="Address">
          <input className="admin-input" value={formation.address} onChange={set("address")} />
        </AdminField>
      </div>
    </div>
  );
}
