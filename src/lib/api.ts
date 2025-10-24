// /src/lib/api.ts
let ACCESS_TOKEN: string | null = null;
let REFRESH_TOKEN: string | null = null;

// keep access in memory; keep both in storage for reload persistence (you can switch to sessionStorage)
export function setTokens(access: string | null, refresh: string | null) {
  ACCESS_TOKEN = access;
  REFRESH_TOKEN = refresh;
  if (access && refresh) {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  } else {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }
}
export function loadTokens() {
  ACCESS_TOKEN = localStorage.getItem("access");
  REFRESH_TOKEN = localStorage.getItem("refresh");
}
export function clearTokens() {
  setTokens(null, null);
}

function stripTrailingSlash(s: string) { return s.replace(/\/+$/, ""); }
function stripLeadingSlash(s: string) { return s.replace(/^\/+/, ""); }
function join(base: string, path: string) {
  if (path.startsWith("http")) return path;
  if (!base) return path; // dev: relative to Vite/proxy or same-origin
  return `${stripTrailingSlash(base)}/${stripLeadingSlash(path)}`;
}

const API_BASE = import.meta.env.PROD ? (import.meta.env.VITE_API_BASE ?? "") : "";

async function request(path: string, init?: RequestInit, retried = false): Promise<Response> {
  const url = join(API_BASE as string, path);
  const headers: Record<string,string> = { "Content-Type": "application/json", ...(init?.headers as any) };
   if (ACCESS_TOKEN) {
    headers["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
    console.debug("[api] attaching Authorization for", path);
  } else {
    console.debug("[api] NO Authorization for", path);
  }

  const res = await fetch(url, { ...init, headers, credentials: "omit" }); // cookies not needed

  if (res.status !== 401 || retried || !REFRESH_TOKEN) return res;

  // try one refresh with body { refresh }
  const r = await fetch(join(API_BASE as string, "/auth/refresh"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh: REFRESH_TOKEN }),
  });
  if (r.ok) {
    const data = await r.json();
    if (data?.access) {
      setTokens(data.access, REFRESH_TOKEN);
      return request(path, init, true);
    }
  }
  clearTokens();
  return res;
}

export const api = {
  get: (url: string) => request(url, { method: "GET" }),
  post: (url: string, body?: any) =>
    request(url, { method: "POST", body: body ? JSON.stringify(body) : undefined }),
  del: (url: string) => request(url, { method: "DELETE" }),
};


