import React from "react";


export default function CartItem({ item ,deleteCartItem,changeAmount}) {

    return (
        <div className="cart-item">
            <div className="button-container"><i
              className="fas fa-trash "
              title="Delete Item"
              onClick={() => deleteCartItem(item.cartItemId)}
            ></i></div>
           <img src={item.productImage} />
            <div className="item-info">
                <h4>{item.productTitle}</h4>
                <p>{item.productDetail}</p>
                <div className="item-price"><h5>{item.productPrice}₺ x</h5> <i className="far fa-minus-square" onClick={()=>changeAmount(item.cartItemId,(item.amount-1))}></i><h5>{item.amount}</h5><i className="far fa-plus-square" onClick={()=>changeAmount(item.cartItemId,(item.amount+1))}></i></div>
            </div>

        </div>
    );
}
