import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  HeartHandshake,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Landmark,
  Settings,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { useAdminCms } from "@/admin/AdminCmsContext";
import { LOGOUT } from "@/constants/testIds/auth";

const NAV = [
  { to: "/admin", end: true, label: "Overview", icon: LayoutDashboard },
  { to: "/admin/branding", label: "Logos & brand", icon: Sparkles },
  { to: "/admin/heroes", label: "Page heroes", icon: Image },
  { to: "/admin/shop", label: "Shoppe", icon: ShoppingBag },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/formation", label: "Formation", icon: Landmark },
  { to: "/admin/donate", label: "Donations", icon: HeartHandshake },
  { to: "/admin/inbox", label: "Inbox", icon: Inbox },
  { to: "/admin/settings", label: "Firebase", icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAdminAuth();
  const { notice } = useAdminCms();
  const navigate = useNavigate();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>SSRRT Admin</strong>
          <span>Content console</span>
        </div>
        <nav className="admin-nav">
          {NAV.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `admin-nav-link${isActive ? " on" : ""}`}
              >
                <Icon size={16} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <div className="admin-main">
        <header className="admin-top">
          <p>Signed in as <strong>{user?.email}</strong></p>
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
        </header>
        {notice ? <div className="admin-notice">{notice}</div> : null}
        <div className="admin-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
