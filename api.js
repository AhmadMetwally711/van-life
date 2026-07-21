export async function getVans() {
  const res = await fetch("http://localhost:5000/api/vans");

  if (!res.ok) {
    throw new Error("Failed to fetch vans");
  }

  const data = await res.json();
  return data;
}
