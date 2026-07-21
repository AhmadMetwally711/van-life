export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getVans() {
  const res = await fetch(`${API_URL}/api/vans`);

  if (!res.ok) {
    throw new Error("Failed to fetch vans");
  }

  return await res.json();
}

export async function getVan(id) {
  const res = await fetch(`${API_URL}/api/vans/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch van");
  }

  return await res.json();
}

export async function getCurrentUser() {
  const res = await fetch(`${API_URL}/api/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to get current user");
  }

  return await res.json();
}
