import React from "react";
import { Link } from "react-router-dom";

export default function HostVans() {
  const [vans, setVans] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/host/vans", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setVans(data));
  }, []);

  const hostVansEls = vans.map((van) => (
    <Link to={String(van.id)} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.image_url} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <div className="host-vans-list">
        {vans.length > 0 ? (
          <section>{hostVansEls}</section>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}
