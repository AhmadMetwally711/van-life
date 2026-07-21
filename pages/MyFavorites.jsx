import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../api";

export default function MyFavorites() {
  const [favorites, setFavorites] = React.useState([]);

  async function loadFavorites() {
    const res = await fetch(`${API_URL}/api/favorites`, {
      credentials: "include",
    });

    const data = await res.json();
    setFavorites(data);
  }

  React.useEffect(() => {
    loadFavorites();
  }, []);

  async function removeFavorite(vanId) {
    await fetch(`${API_URL}/api/vans/${vanId}/favorites`, {
      method: "DELETE",
      credentials: "include",
    });

    setFavorites((prev) => prev.filter((van) => van.id !== vanId));
  }

  return (
    <section className="favorites-container">
      <h1>My Favorites</h1>

      <div className="favorites-list">
        {favorites.map((van) => (
          <div key={van.id} className="favorite-card">
            <img src={van.image_url} alt={van.name} />

            <div>
              <h2>{van.name}</h2>

              <p>${van.price}/day</p>

              <Link to={`/vans/${van.id}`}>View Van</Link>

              <button
                className="remove-fav-btn"
                onClick={() => removeFavorite(van.id)}
              >
                Remove from Favorites
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
