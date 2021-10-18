import React from "react";
import Link from "next/link";
import Filter from "./Products/Filter";
export default function ProductCard({ product, colors, sizes, clickHandler }) {
  return (
    <div
      className="product-card"
      onClick={() => {
        clickHandler(product.productId);
      }}
    >
      <img src={product.productImage} />
      <div className="product-data">
        <small>{product.productTitle}</small>
        <p>{product.productPrice} ₺</p>
      </div>
      <div className="product-hover">
        <div className="items">
          {sizes.map((size) => (
            <div className="size" key={size.sizeId}>{size.sizeName.toUpperCase()}</div>
          ))}
        </div>
        <div className="colors">
          {colors.map((color) => (
            <i
              className="fas fa-circle"
              style={{ color: color.colorValue }}
              title={color.colorName}
              key={color.colorId}
            ></i>
          ))}
        </div>
      </div>
    </div>
  );
}
