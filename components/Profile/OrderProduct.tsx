import React, { useState } from "react";
import Link from "next/link";
import { logout,getUser } from "../../redux/userReducer";
import { addToCart } from "../../redux/cartReducer";
import { addtocart } from "../../data/cart";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../../redux/notificationReducer";
import ReviewModal from "./ReviewModal";
export default function OrderProduct({ orderProduct }) {
  const { product, amount, productColor, productSize } = orderProduct;
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(getUser);
  return (
    <div className="product">
      <Link href={`/${product.subCategoryId}/${product.productId}`}>
        <a>
          <img className="product-image" src={product.productImage} />
        </a>
      </Link>
      <div className="d-flex justify-content-between w-100 mx-3 ">
        <div className="w-50 d-flex flex-column justify-content-around">
          <Link href={`/${product.subCategoryId}/${product.productId}`}>
            <a>
              <div className="title">{product.productTitle}</div>
            </a>
          </Link>
          <div className="title">
            {productColor.colorName} - {productSize.sizeName.toUpperCase()}
          </div>
          <div className="price">
            {product.productPrice} TL x {amount}
          </div>
        </div>
        <div className="icons w-50">
          <div className="icon" title="Rate this product" onClick={()=>setShow(true)}>
            <i className="far fa-grin-stars"></i> Rate
          </div>
          <div className="icon" title="Add to Cart" onClick={()=>addtocart(user,product.productId,productColor.colorId,productSize.sizeId,amount,dispatch,logout,addNotification,addToCart)}>
            <i className="fas fa-cart-plus"></i> Add to Cart
          </div>
          <div className="icon" title="Return this product">
            <i className="fas fa-undo-alt"></i> Return
          </div>
        </div>
        <ReviewModal show={show} onHide={()=>setShow(false)} product={product} user={user}/>
      </div>
    </div>
  );
}
