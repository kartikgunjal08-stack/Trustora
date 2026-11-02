import React from "react";

export default function RatingStars({ rating = 5, size = 16 }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            color: star <= rating ? "#f59e0b" : "#475569",
            fontSize: `${size}px`,
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}