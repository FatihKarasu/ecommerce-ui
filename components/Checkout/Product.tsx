import React from "react";

export default function Product({ item, changeItemAmount, deleteCartItem }) {
  return (
    <div className="product">
      <div>
        <h6>{item.productTitle}</h6>
        <small>{item.productDetail}</small>
        <div className="price">
          <div className="d-flex">
            <div className="amount">
              <i
                className="fas fa-minus"
                onClick={() =>
                  changeItemAmount(item.cartItemId, item.amount - 1)
                }
              ></i>
              <div>{item.amount}</div>
              <i
                className="fas fa-plus"
                onClick={() =>
                  changeItemAmount(item.cartItemId, item.amount + 1)
                }
              ></i>
            </div>
            x {item.productPrice} ₺
          </div>
          <div> {item.amount * item.productPrice} ₺</div>
        </div>
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
