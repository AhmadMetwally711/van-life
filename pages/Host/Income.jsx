import React from "react";

export default function Income() {
  return (
    <div className="income-page">
      <h1>Income</h1>

      <div className="income-card">
        <h2>Total Income</h2>
        <p>$2400</p>
      </div>

      <div className="income-details">
        <h3>Recent Payments</h3>

        <div className="payment">
          <span>Camper Van Rental</span>
          <span>$120</span>
        </div>

        <div className="payment">
          <span>Adventure Van Rental</span>
          <span>$250</span>
        </div>

        <div className="payment">
          <span>Family Trip Rental</span>
          <span>$180</span>
        </div>
      </div>
    </div>
  );
}
