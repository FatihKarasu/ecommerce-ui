import React, { useEffect, useState } from "react";

export default function Carousel({ items }) {
  const [selected, setSelected] = useState(items[0]);
  let isDown = false;
  let startX;
  let scrollLeft;
  let isMoved;

  useEffect(() => {
    if (process.browser && document.getElementById("slick-carousel") !== null) {
      document.getElementById("slick-carousel").scrollLeft = 0;
      if (items.length <= 4) {
        const slick = document.getElementById("slick-carousel");
        const container = document.getElementById("item-container");
        slick.setAttribute(
          "style",
          `width:${container.offsetWidth}px;margin:0 auto`
        );
        slick.style.width = `${container.offsetWidth}px`;
        slick.style.margin = `0 auto`;
      }
    }
  }, [process]);
  const mouseDownEvent = (e) => {
    isDown = true;
    isMoved = false;
    startX = e.pageX - e.currentTarget.offsetLeft;
    scrollLeft = e.currentTarget.scrollLeft;
  };
  const mouseMoveEvent = (e) => {
    if (!isDown) return;
    e.preventDefault();
    if(items.length>4) isMoved = true;
    
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = x - startX;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };
  const move = (direction) => {
    const slider = document.getElementById("slick-carousel");
    let scrollAmount = 0;
    let step = 8;
    var slideTimer = setInterval(function () {
      if (direction == "left") {
        slider.scrollLeft -= step;
      } else {
        slider.scrollLeft += step;
      }
      scrollAmount += step;
      if (
        scrollAmount >=
        document.getElementById("item-container").offsetWidth / items.length
      ) {
        window.clearInterval(slideTimer);
      }
    }, 1);
  };

  return (
    <div className="carousel-a">
      <img className="carousel-a-image" src={selected} alt="First slide" />
      <div className="slick-carousel-container">
        {items.length <= 4 ? null : (
          <>
            <div className="indicator prev" onClick={() => move("left")}>
              <i className="fas fa-chevron-left "></i>
            </div>
            <div className="indicator next" onClick={() => move("right")}>
              <i className="fas fa-chevron-right"></i>
            </div>
          </>
        )}
        <div
          className="slick-carousel"
          id="slick-carousel"
          onMouseDown={(e) => mouseDownEvent(e)}
          onMouseLeave={() => (isDown = false)}
          onMouseUp={() => (isDown = false)}
          onMouseMove={(e) => mouseMoveEvent(e)}
        >
          <div className="item-container" id="item-container">
            {items.map((image, index) => (
              <div
                key={index}
                className={selected === image ? "item selected" : "item"}
                onClick={() => {
                  isMoved ? null : setSelected(image);
                }}
              >
                <img src={image} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
