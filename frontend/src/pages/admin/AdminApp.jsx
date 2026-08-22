import { Navigate, Outlet } from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "@/admin/AdminAuthContext";
import { AdminCmsProvider } from "@/admin/AdminCmsContext";
import AdminLayout from "@/admin/AdminLayout";
import SeoHead from "@/components/seo/SeoHead";

export function AdminRoot() {
  return (
    <AdminAuthProvider>
      <AdminCmsProvider>
        <SeoHead />
        <Outlet />
      </AdminCmsProvider>
    </AdminAuthProvider>
  );
}

export function RequireAdmin() {
  const { user } = useAdminAuth();
  if (!user) return <Navigate to="/admin/login" replace />;
  return <AdminLayout />;
}
