import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image" />
      <div className="product-data">
        <div className="skeleton-title" />
        <div className="skeleton-price" />
      </div>
    </div>
  );
}
