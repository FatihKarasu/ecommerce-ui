import React from "react";

export default function Product({ item, changeItemAmount, deleteCartItem }) {
  const product = item.product;
  return (
    <div className="product">
      <div className="title">{product.productTitle}</div>
      <div className="attr">
        {item.color.colorName + " - " + item.size.sizeName.toUpperCase()}
      </div>
      <div className="price">
        <div className="d-flex align-items-center">
          <div className="item-price">{product.productPrice} TL</div>x
          <input
            type="number"
            defaultValue={item.amount}
            onFocus={(e)=>e.target.select()}
            onBlur={(e)=>e.target.value=item.amount}
            onChange={(e) => changeItemAmount(item.cartItemId, e.target.value)}
          />
        </div>
        <div className="total"> {item.amount * product.productPrice} ₺</div>
      </div>
      <div className="button-container">
        <i
          className="fas fa-trash "
          title="Delete Item"
          onClick={() => deleteCartItem(item.cartItemId)}
        ></i>
      </div>
    </div>
  );
}
