import React from "react";
import Link from "next/link";

export default function CartItem({ item, deleteCartItem, changeAmount }) {
  const product = item.product;
  const color = item.color;
  const size = item.size;
  return (
    <div className="cart-item">
      <div className="button-container">
        <i
          className="fas fa-trash "
          title="Delete Item"
          onClick={() => deleteCartItem(item.cartItemId)}
        ></i>
      </div>
      <Link href={"/" + product.subCategoryId + "/" + product.productId}>
        <img src={product.productImage} />
      </Link>
      <div className="item-description">
        <Link href={"/" + product.subCategoryId + "/" + product.productId}>
          <div className="title">{product.productTitle}</div>
        </Link>

        <div>{color.colorName + " - " + size.sizeName.toUpperCase()}</div>
        <div className="d-flex align-items-center">
          <div className="item-price">{product.productPrice} TL</div>x
          <input
            type="number"
            value={item.amount!==undefined?item.amount:0}
            onFocus={(e)=>e.target.select()}
            onChange={(e) => changeAmount(item.cartItemId, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
