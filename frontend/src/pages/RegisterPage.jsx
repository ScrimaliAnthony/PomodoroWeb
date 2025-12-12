import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { post } from "../api/client";
import { Navigate, Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const { user, loading, login } = useAuth();
  const [username, setUsername] = useState("charlie");
  const [email, setEmail] = useState("charlie@example.com");
  const [password, setPassword] = useState("secret123");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await post("/users", { username, email, password });

      await login(email, password);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("Register error:", err);
      setError("Could not create account");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <div style={{ padding: "1rem" }}>Checking session...</div>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Create an account</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: 320 }}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Username :{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>
        </div>

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
              autoComplete="new-password"
            />
          </label>
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Register"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p style={{ marginTop: "1rem" }}>
        Already have an account ?{" "}
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
