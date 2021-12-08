import React from "react";

export default function ProductCard({ product,onClick }) {
  return (
    <div className="item" onClick={()=>onClick(product.subCategoryId,product.productId)}>
      <img src={product.productImage} />
      <div className="pt-1 px-2">
        <div className="title">{product.productTitle}</div>

        <div className="mt-1">
          {product.productOldPrice ? (
            <div className="d-flex align-items-center">
              <div className="discount-rate">
                %
                {Math.ceil(
                  100 - (product.productPrice * 100) / product.productOldPrice
                )}
              </div>

              <div className="previous-price">{product.productOldPrice} ₺</div>
              <div className="price">{product.productPrice} ₺</div>
            </div>
          ) : (
            <div className="price">{product.productPrice} ₺</div>
          )}
        </div>
      </div>
    </div>
  );
}
