import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { DEFAULT_ADMIN_EMAIL } from "@/admin/adminAuth";
import { useAdminAuth } from "@/admin/AdminAuthContext";
import { LOGIN } from "@/constants/testIds/auth";

export default function AdminLoginPage() {
  const { user, loading, login } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [uid, setUid] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="admin-login">
        <p className="admin-login-copy">Loading…</p>
      </div>
    );
  }

  if (user) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setUid("");
    const result = await login(email, password);
    if (!result.ok) {
      setError(result.error);
      setUid(result.uid || "");
      setSubmitting(false);
      return;
    }
    setSubmitting(false);
    navigate("/admin", { replace: true });
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={onSubmit}>
        <p className="admin-kicker">SSRRT · Trust office</p>
        <h1>Admin console</h1>
        <p className="admin-login-copy">
          Sign in with <code>{DEFAULT_ADMIN_EMAIL}</code> — first login auto-creates your admin record if Firestore rules are deployed.
        </p>
        {error ? (
          <div className="admin-error">
            <p>{error}</p>
            {uid ? (
              <p className="admin-error-detail">
                Your UID: <code>{uid}</code>
                <br />
                Ask your technical contact to add Firestore doc <code>admins/{uid}</code> with fields <code>email</code> and <code>role: &quot;admin&quot;</code>.
              </p>
            ) : null}
            {error.includes("rules") ? (
              <p className="admin-error-detail">
                Firestore rules may need deploying. See Settings & help after sign-in, or ask your technical contact.
              </p>
            ) : null}
          </div>
        ) : null}
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
        <button className="admin-btn" type="submit" data-testid={LOGIN.submitButton} disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
