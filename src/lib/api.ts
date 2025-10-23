// src/lib/api.ts
const API_BASE = "";

async function request(input: string, init?: RequestInit, retried = false) {
  const url = input.startsWith("http") ? input : `${API_BASE}${input}`;
  const res = await fetch(url, {
    credentials: "include", // <-- send cookies!
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  console.log("This is api.ts res:", res);
  if (res.status === 401 && !retried) {
    // try refresh
    const r = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    if (r.ok) {
      // retry original once
      return request(input, init, true);
    }
  }

  return res;
}

export const api = {
  get: (url: string) => request(url, { method: "GET" }),
  post: (url: string, body?: any) =>
    request(url, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  del: (url: string) => request(url, { method: "DELETE" }),
};
