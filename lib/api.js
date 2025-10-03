    // lib/api.js
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export async function apiPost(path, data, token) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiGet(path, token) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { ...(token && { Authorization: `Bearer ${token}` }) },
  });
  return res.json();
}
