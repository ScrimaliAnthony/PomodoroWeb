const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getAuthToken() {
  // pour l’instant, on stockera le token ici
  return localStorage.getItem("auth_token");
}

async function request(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export function get(path) {
  return request(path, { method: "GET" });
}

export function post(path, body) {
  return request(path, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
