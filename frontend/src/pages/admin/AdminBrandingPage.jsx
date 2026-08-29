import { AdminAutoSaveHint, AdminField, AdminImageField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";

export default function AdminBrandingPage() {
  const { data, patchDebounced } = useAdminCms();
  const branding = data.branding;

  const set = (key) => (value) => patchDebounced({ branding: { ...branding, [key]: value } });

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Logos & brand</h1>
          <p>Header Devi mark, Sri Yantra, footer mark, and the Trust title shown above the public navigation.</p>
          <AdminAutoSaveHint />
        </div>
      </header>
      <div className="admin-panel admin-stack">
        <AdminField label="Site title">
          <input className="admin-input" value={branding.siteTitle} onChange={(e) => set("siteTitle")(e.target.value)} />
        </AdminField>
        <AdminField label="Tagline">
          <input className="admin-input" value={branding.siteTagline} onChange={(e) => set("siteTagline")(e.target.value)} />
        </AdminField>
        <AdminImageField label="Header · Devi logo" value={branding.headerDevi} onChange={set("headerDevi")} />
        <AdminImageField label="Header · Sri Yantra" value={branding.headerYantra} onChange={set("headerYantra")} />
        <AdminImageField label="Footer logo" value={branding.footerLogo} onChange={set("footerLogo")} />
      </div>
    </div>
  );
}
