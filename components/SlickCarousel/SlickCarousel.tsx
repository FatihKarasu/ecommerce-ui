import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/router";
export default function SlickCarousel({ items }) {
  const router = useRouter();
  let isDown = false;
  let startX;
  let scrollLeft;
  let isMoved;

  if (process.browser && document.getElementById("carousel") !== null) {
    document.getElementById("carousel").scrollLeft = 0;
  }
  const mouseDownEvent = (e) => {
    isDown = true;
    isMoved = false;
    startX = e.pageX - e.currentTarget.offsetLeft;
    scrollLeft = e.currentTarget.scrollLeft;
  };
  const mouseMoveEvent = (e) => {
    if (!isDown) return;
    e.preventDefault();
    isMoved = true;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = x - startX;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  const move = (direction) => {
    const slider = document.getElementById("carousel");
    let scrollAmount = 0;
    let step = 8;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        slider.scrollLeft -= step;
      } else {
        slider.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= 272) {
        window.clearInterval(slideTimer);
      }
    }, 1);
  };
  const clickHandler = (categoryId, productId) => {
    if (!isMoved) {
      router.push(`/${categoryId}/${productId}`);
    }
  };
  return (
    <div className="carousel-container">
      <div className="carousel-title">Similar Products</div>
      <div className="indicator left">
        <i className="fas fa-chevron-left " onClick={() => move("left")}></i>
      </div>
      <div className="indicator right">
        <i className="fas fa-chevron-right" onClick={() => move("right")}></i>
      </div>
      <div
        className="carousel"
        id="carousel"
        onMouseDown={(e) => mouseDownEvent(e)}
        onMouseLeave={() => (isDown = false)}
        onMouseUp={() => (isDown = false)}
        onMouseMove={(e) => mouseMoveEvent(e)}
      >
        <div className="item-container">
          {items !== undefined && items !== null
            ? items.map((item) => (
                <ProductCard
                  key={item.product.productId}
                  product={item.product}
                  onClick={clickHandler}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
