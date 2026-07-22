import React from "react";

export default function Reviews() {
  return (
    <div className="reviews-page">
      <h1>Reviews</h1>

      <div className="reviews-summary">
        <h2>Overall Rating</h2>
        <p className="rating">4.8 ⭐</p>
        <p>Based on 24 reviews</p>
      </div>

      <div className="reviews-list">
        <h2>Recent Reviews</h2>

        <div className="review-card">
          <h3>John</h3>
          <p>Great van, very comfortable and clean. Had an amazing trip!</p>
          <span>⭐⭐⭐⭐⭐</span>
        </div>

        <div className="review-card">
          <h3>Sarah</h3>
          <p>Easy booking process and the van was exactly as described.</p>
          <span>⭐⭐⭐⭐</span>
        </div>

        <div className="review-card">
          <h3>Mike</h3>
          <p>Nice experience, would rent again.</p>
          <span>⭐⭐⭐⭐⭐</span>
        </div>
      </div>
    </div>
  );
}
