import React from "react";

export default function CartItem({ item, deleteCartItem, changeAmount }) {
  const product = item.product;
  const color = item.color;
  const size = item.size;
  console.log(item)
  return (
    <div className="cart-item">
      <div className="button-container">
        <i
          className="fas fa-trash "
          title="Delete Item"
          onClick={() => deleteCartItem(product.cartItemId)}
        ></i>
      </div>
      <img src={product.productImage} />
      <div className="item-description">
        <div className="title">{product.productTitle}</div>
        <div>{color.colorName + " - " + size.sizeName.toUpperCase()}</div>
        <div className="d-flex align-items-center">
          <div className="item-price">{product.productPrice} TL</div>x
          <input type="number" defaultValue={item.amount} onChange={(e)=>changeAmount(item.cartItemId,e.target.value)}/>
        </div>
      </div>
    </div>
  );
}
