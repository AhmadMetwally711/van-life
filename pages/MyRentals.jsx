import React from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

export default function MyRentals() {
  const [rentals, setRentals] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function loadRentals() {
      try {
        const res = await fetch(`${API_URL}/api/rentals`, {
          credentials: "include",
        });

        if (res.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        const data = await res.json();
        setRentals(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadRentals();
  }, []);

  async function cancelRental(id) {
    const res = await fetch(`${API_URL}/api/rentals/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) {
      setRentals((prev) => prev.filter((rental) => rental.id !== id));
    }
  }

  function getDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return Math.ceil(diffDays);
  }

  return (
    <section className="my-rentals-container">
      <h1>My Rentals</h1>

      {rentals.length === 0 && <h2>No rentals yet</h2>}

      <div className="rentals-list">
        {rentals.map((rental) => {
          const days = getDays(rental.start_date, rental.end_date);

          const totalPrice = days * rental.price;

          return (
            <div className="rental-card" key={rental.id}>
              <img src={rental.image_url} alt={rental.name} />

              <div className="rental-info">
                <h2>{rental.name}</h2>

                <p>
                  {new Date(rental.start_date).toLocaleDateString()} →{" "}
                  {new Date(rental.end_date).toLocaleDateString()}
                </p>

                <h3>
                  ${rental.price}
                  <span>/day</span>
                </h3>

                <h4>For {days} days</h4>

                <h3>Total: ${totalPrice}</h3>

                <span className={`status ${rental.status}`}>
                  {rental.status}
                </span>

                <button
                  className="cancel-rent-btn"
                  onClick={() => cancelRental(rental.id)}
                >
                  Cancel Rent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
