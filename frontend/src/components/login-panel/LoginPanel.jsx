import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPanel() {
  const { user, loading, error, login, logout } = useAuth();

  const [email, setEmail] = useState("alice@example.com");
  const [password, setPassword] = useState("secret123");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  if (loading) {
    return <div>Checking session...</div>;
  }

  if (user) {
    return (
      <div style={{ padding: "1rem", border: "1px solid #ccc", marginBottom: "1rem" }}>
        <h2>Connected as {user.username}</h2>
        <p>Email: {user.email}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setLocalError(null);

    try {
      await login(email, password);
    } catch {
      setLocalError("Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", marginBottom: "1rem" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Email:{" "}
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
            Password:{" "}
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
    </div>
  );
}
