import React from "react";
import Link from "next/link";
export default function ProductCard({ product, colors, sizes }) {
  return (
    <Link href={"/" + product.subCategoryId + "/" + product.productId}>
      <div className="product-card">
        <img src={product.productImage} />
        <div className="product-data">
          <small>{product.productTitle}</small>
          {product.productSalePrice ? (
            <div className="d-flex justify-content-between">
              <div className="d-flex">
                <p className="previous-price">{product.productPrice} ₺</p>
                <p>{product.productSalePrice} ₺</p>
              </div>
              <div className="d-flex align-items-center">
                <div className="discount-rate">
                  %
                  {Math.ceil(
                    100 -
                      (product.productSalePrice * 100) / product.productPrice
                  )}
                </div>
                <div>Discount</div>
              </div>
            </div>
          ) : (
            <p>{product.productPrice} ₺</p>
          )}
        </div>
        <div className="product-hover">
          <div className="items">
            {sizes.map((size) => (
              <div className="size" key={size.sizeId}>
                {size.sizeName.toUpperCase()}
              </div>
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
    </Link>
  );
}
