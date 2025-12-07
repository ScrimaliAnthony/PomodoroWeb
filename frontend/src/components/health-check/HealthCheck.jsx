import { useEffect, useState } from "react";

export default function HealthCheck() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/health")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const json = await res.json();
        setData(json);
      })
      .catch((err) => {
        console.error("Error calling /api/health:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", marginBottom: "1rem" }}>
      <h2>Health check backend</h2>
      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
      {error && (
        <p style={{ color: "red" }}>Error: {error}</p>
      )}
    </div>
  );
}
