// src/lib/api.ts
function stripTrailingSlash(s: string) {
  return s.replace(/\/+$/, "");
}
function stripLeadingSlash(s: string) {
  return s.replace(/^\/+/, "");
}
function join(base: string, path: string) {
  if (path.startsWith("http")) return path;
  if (!base) return path; // dev proxy or same-origin relative
  return `${stripTrailingSlash(base)}/${stripLeadingSlash(path)}`;
}
<<<<<<< HEAD

const API_BASE =
  import.meta.env.PROD
    // Prefer an explicit API in prod; else fall back to the site base (/AI-BAG/)
    ? (import.meta.env.VITE_API_BASE ?? import.meta.env.BASE_URL)
    : "";
=======
>>>>>>> 9a8102b17737ed11dd6dc01cb9169fd4f7fefff3

const API_BASE =
  import.meta.env.PROD
    // Prefer an explicit API in prod; else fall back to the site base (/AI-BAG/)
    ? (import.meta.env.VITE_API_BASE ?? import.meta.env.BASE_URL)
    : "";
console.log(API_BASE);
async function request(input: string, init?: RequestInit, retried = false) {
  //const url = input.startsWith("http") ? input : `${API_BASE}${input}`;
   const url = join(API_BASE as string, input);
  const res = await fetch(url, {
    credentials: "include", // <-- send cookies!
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });

  console.log("This is api.ts res:", res);
  if (res.status === 401 && !retried) {
    // try refresh
    const refreshUrl = join(API_BASE as string, "/auth/refresh");
    
    const r = await fetch(refreshUrl, {
      method: "POST",
      credentials: "include",
    });
    /*
    const r = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });*/
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
