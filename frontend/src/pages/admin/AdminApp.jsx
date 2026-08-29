import { Navigate, Outlet } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "@/admin/AdminAuthContext";
import { AdminCmsProvider } from "@/admin/AdminCmsContext";
import AdminLayout from "@/admin/AdminLayout";
import SeoHead from "@/components/seo/SeoHead";

export function AdminRoot() {
  return (
    <AdminAuthProvider>
      <SeoHead />
      <Outlet />
    </AdminAuthProvider>
  );
}

export function RequireAdmin() {
  const { user, loading } = useAdminAuth();
  if (loading) {
    return (
      <div className="admin-login">
        <p className="admin-login-copy">Checking admin session…</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/admin/login" replace />;
  return (
    <AdminCmsProvider>
      <AdminLayout />
    </AdminCmsProvider>
  );
}
