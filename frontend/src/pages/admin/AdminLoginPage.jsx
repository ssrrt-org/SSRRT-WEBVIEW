import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { HARDCODED_ADMIN } from "@/admin/adminAuth";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { LOGIN } from "@/constants/testIds/auth";

export default function AdminLoginPage() {
  const { user, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(HARDCODED_ADMIN.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/admin", { replace: true });
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <p className="admin-kicker">SSRRT · Trust office</p>
        <h1>Admin console</h1>
        <p className="admin-login-copy">
          Temporary local login. Firebase Auth keys stay empty until the backend pass.
        </p>
        {error ? <div className="admin-error">{error}</div> : null}
        <label className="admin-field">
          <span className="admin-label">Email</span>
          <input
            className="admin-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid={LOGIN.emailInput}
            autoComplete="username"
            required
          />
        </label>
        <label className="admin-field">
          <span className="admin-label">Password</span>
          <input
            className="admin-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid={LOGIN.passwordInput}
            autoComplete="current-password"
            required
          />
        </label>
        <button className="admin-btn" type="submit" data-testid={LOGIN.submitButton}>
          Sign in
        </button>
        <p className="admin-demo">
          Demo: <code>{HARDCODED_ADMIN.email}</code> / <code>{HARDCODED_ADMIN.password}</code>
        </p>
      </form>
    </div>
  );
}
