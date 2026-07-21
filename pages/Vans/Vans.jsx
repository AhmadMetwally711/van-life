import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getVans } from "../../api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { API_URL } from "../../api";

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [vans, setVans] = React.useState([]);

  const [favorites, setFavorites] = React.useState([]);

  const typeFilter = searchParams.get("type");

  async function loadFavorites() {
    const res = await fetch(`${API_URL}/api/favorites`, {
      credentials: "include",
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setFavorites(data);
    } else {
      setFavorites([]);
    }
  }

  React.useEffect(() => {
    async function loadVans() {
      const data = await getVans();
      setVans(data);
    }

    loadVans();
  }, []);

  React.useEffect(() => {
    loadFavorites();
  }, []);

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  const vanElements = displayedVans.map((van) => {
    const isFavorite = favorites.some((fav) => fav.id === van.id);

    return (
      <div key={van.id} className="van-tile">
        <button
          className="favorite-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(van.id, isFavorite);
          }}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        <Link
          to={`/vans/${van.id}`}
          state={{
            search: `?${searchParams.toString()}`,
            type: typeFilter,
          }}
        >
          <img src={van.image_url} />

          <div className="van-info">
            <h3>{van.name}</h3>

            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>

          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    );
  });

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  async function toggleFavorite(vanId, isFavorite) {
    try {
      if (isFavorite) {
        await fetch(`${API_URL}/api/favorites/${vanId}`, {
          method: "DELETE",
          credentials: "include",
        });
      } else {
        await fetch(`${API_URL}/api/favorites`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vanId }),
        });
      }

      await loadFavorites();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`}
        >
          Luxury
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`}
        >
          Rugged
        </button>

        {typeFilter ? (
          <button
            onClick={() => handleFilterChange("type", null)}
            className="van-type clear-filters"
          >
            Clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
}
