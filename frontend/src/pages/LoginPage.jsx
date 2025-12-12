import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { user, loading, error, login } = useAuth();
  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("secret123");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);
  const navigate = useNavigate();

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setLocalError(null);

    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch {
      setLocalError("Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div style={{ padding: "1rem" }}>Checking session...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Email :{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </label>
        </div>

        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Password :{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {(error || localError) && (
        <p style={{ color: "red" }}>{error || localError}</p>
      )}

      <p style={{ marginTop: "1rem" }}>
        No account yet ?{" "}
        <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
