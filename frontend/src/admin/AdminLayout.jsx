import { useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ExternalLink,
  HeartHandshake,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Landmark,
  Menu,
  Settings,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { useAdminCms } from "@/admin/AdminCmsContext";
import { LOGOUT } from "@/constants/testIds/auth";

const NAV = [
  { to: "/admin", end: true, label: "Overview", icon: LayoutDashboard },
  { to: "/admin/branding", label: "Logos & brand", icon: Sparkles },
  { to: "/admin/images", label: "Page images", icon: Image },
  { to: "/admin/shop", label: "Shoppe", icon: ShoppingBag },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/formation", label: "Formation", icon: Landmark },
  { to: "/admin/donate", label: "Donations", icon: HeartHandshake },
  { to: "/admin/inbox", label: "Inbox", icon: Inbox, badgeKey: "inbox" },
  { to: "/admin/settings", label: "Settings & help", icon: Settings },
];

function saveStatusLabel(status) {
  if (status === "saving") return "Saving changes…";
  if (status === "saved") return "All changes saved";
  if (status === "error") return "Save failed — check message below";
  return "Changes save automatically";
}

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const { notice, syncError, loading, saveStatus, data } = useAdminCms();
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);

  const inboxCount = useMemo(() => (data.inbox || []).length, [data.inbox]);

  const closeNav = () => setNavOpen(false);

  return (
    <div className={`admin-shell${navOpen ? " nav-open" : ""}`}>
      <button
        type="button"
        className="admin-nav-toggle"
        aria-expanded={navOpen}
        aria-label={navOpen ? "Close menu" : "Open menu"}
        onClick={() => setNavOpen((open) => !open)}
      >
        {navOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {navOpen ? (
        <button
          type="button"
          className="admin-nav-scrim"
          aria-label="Close menu"
          onClick={closeNav}
        />
      ) : null}

      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>SSRRT Admin</strong>
          <span>Easy content console</span>
        </div>
        <nav className="admin-nav" aria-label="Admin sections">
          {NAV.map((item) => {
            const Icon = item.icon;
            const badge = item.badgeKey === "inbox" && inboxCount > 0 ? inboxCount : null;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `admin-nav-link${isActive ? " on" : ""}`}
                onClick={closeNav}
              >
                <Icon size={16} />
                <span className="admin-nav-text">{item.label}</span>
                {badge ? <span className="admin-nav-badge">{badge}</span> : null}
              </NavLink>
            );
          })}
        </nav>
        <a className="admin-view-site" href="/" target="_blank" rel="noreferrer">
          <ExternalLink size={14} />
          View live site
        </a>
      </aside>

      <div className="admin-main">
        <header className="admin-top">
          <div className="admin-top-left">
            <p>Signed in as <strong>{user?.email}</strong></p>
            <span className={`admin-save-status is-${saveStatus}`}>{saveStatusLabel(saveStatus)}</span>
          </div>
          <div className="admin-top-actions">
            <a className="admin-ghost sm hide-mobile" href="/" target="_blank" rel="noreferrer">
              <ExternalLink size={14} />
              View site
            </a>
            <button
              type="button"
              className="admin-ghost"
              data-testid={LOGOUT.button}
              onClick={() => {
                logout();
                navigate("/admin/login");
              }}
            >
              <LogOut size={14} />
              Sign out
            </button>
          </div>
        </header>

        {syncError ? <div className="admin-error admin-banner">{syncError}</div> : null}
        {notice ? <div className="admin-notice admin-banner">{notice}</div> : null}

        <div className="admin-body">
          {loading ? (
            <div className="admin-loading">
              <div className="admin-loading-card">
                <strong>Loading your content…</strong>
                <p>Pulling the latest data from Firebase.</p>
              </div>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}
