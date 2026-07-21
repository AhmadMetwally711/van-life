import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function VanDetail() {
  const params = useParams();
  const location = useLocation();
  console.log(location);

  const [van, setVan] = React.useState(null);

  React.useEffect(() => {
    fetch(`http://localhost:5000/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data));
  }, [params.id]);

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van ? (
        <div className="van-detail">
          <img src={van.image_url} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <Link to="rent" className="link-button">
            Rent this van
          </Link>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
