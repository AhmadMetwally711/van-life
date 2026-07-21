import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RentVan() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [van, setVan] = React.useState(null);

  const [dates, setDates] = React.useState({
    startDate: "",
    endDate: "",
  });

  const [bookingSuccess, setBookingSuccess] = React.useState(false);

  async function handleBooking() {
    try {
      const res = await fetch("http://localhost:5000/api/rentals", {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          vanId: van.id,
          startDate: dates.startDate,
          endDate: dates.endDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setBookingSuccess(true);

      setTimeout(() => {
        navigate("/my-rentals");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  }
  React.useEffect(() => {
    fetch(`http://localhost:5000/api/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setVan(data));
  }, [id]);

  const start = new Date(dates.startDate);
  const end = new Date(dates.endDate);

  const days =
    dates.startDate && dates.endDate
      ? Math.ceil((end - start) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = days > 0 ? days * van.price : 0;

  if (!van) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="rent-container">
      <h1>Rent Van</h1>

      <div className="rent-van-info">
        <img src={van.image_url} alt={van.name} />

        <h2>{van.name}</h2>

        <p>
          <strong>${van.price}</strong> / day
        </p>
      </div>

      <div className="rent-form">
        <label>Start Date</label>
        <input
          type="date"
          value={dates.startDate}
          onChange={(e) =>
            setDates((prev) => ({
              ...prev,
              startDate: e.target.value,
            }))
          }
        />

        <label>End Date</label>
        <input
          type="date"
          value={dates.endDate}
          onChange={(e) =>
            setDates((prev) => ({
              ...prev,
              endDate: e.target.value,
            }))
          }
        />

        {days > 0 && (
          <>
            <h3>Total Days: {days}</h3>
            <h2>Total Price: ${totalPrice}</h2>
          </>
        )}
        <button className="confirm-btn" onClick={handleBooking}>
          Confirm Booking
        </button>

        {bookingSuccess && (
          <div className="booking-success">
            <h3>✅ Booking Confirmed!</h3>

            <p>Redirecting to your rentals...</p>
          </div>
        )}
      </div>
    </section>
  );
}
