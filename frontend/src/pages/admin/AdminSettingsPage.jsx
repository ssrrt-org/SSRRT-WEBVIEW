import { firebaseConfig, isFirebaseConfigured } from "@/lib/firebase";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { useAdminCms } from "@/admin/AdminCmsContext";

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const { syncError } = useAdminCms();
  const ready = isFirebaseConfigured();

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Settings & help</h1>
          <p>Connection status, admin access, and what syncs between this console and the live website.</p>
        </div>
      </header>

      <div className={`admin-pill admin-status-pill${ready ? "" : " off"}`}>
        {ready ? "Firebase connected" : "Firebase config incomplete"}
      </div>

      {syncError ? <div className="admin-error admin-banner">{syncError}</div> : null}

      <div className="admin-panel admin-stack">
        <div>
          <h2>Project</h2>
          <ul className="admin-list">
            <li>Project ID: <strong>{firebaseConfig.projectId || "Not set"}</strong></li>
            <li>Auth domain: <strong>{firebaseConfig.authDomain || "Not set"}</strong></li>
            <li>Storage: <strong>{firebaseConfig.storageBucket || "Not set"}</strong></li>
          </ul>
        </div>

        <div>
          <h2>Signed-in admin</h2>
          <p className="admin-muted">{user?.email}</p>
          <p className="admin-muted">UID: {user?.uid}</p>
        </div>

        <div>
          <h2>Add another admin</h2>
          <ol className="admin-list">
            <li>In Firebase Console → Authentication, create the user with email and password.</li>
            <li>In Firestore, add document <code>admins/&lt;their-uid&gt;</code> with fields <code>email</code> and <code>role: &quot;admin&quot;</code>.</li>
            <li>They can then sign in at <code>/admin/login</code>.</li>
          </ol>
        </div>

        <div>
          <h2>What syncs automatically</h2>
          <ul className="admin-list">
            <li>Logos, heroes, shop catalogue, events, and formation page copy</li>
            <li>Donation offerings after verified Razorpay payment</li>
            <li>Inbox messages from contact and volunteer forms</li>
            <li>Images uploaded through this admin console</li>
          </ul>
        </div>

        <div>
          <h2>Need help?</h2>
          <p className="admin-muted">
            Most pages save automatically after you pause typing. Look for the save status in the top bar.
            Use <strong>View live site</strong> in the sidebar to check how changes look to visitors.
          </p>
        </div>
      </div>
    </div>
  );
}
