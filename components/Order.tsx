import React from "react";


export default function Order({ order }) {

    return (
        <div className="order">
            <img src={order.productImage} />
            <div className="order-info">
                <h4>{order.productTitle}</h4>
                <p>{order.productDetail}</p>
                <p>{order.productPrice}</p>
            </div>

        </div>
    );
}
