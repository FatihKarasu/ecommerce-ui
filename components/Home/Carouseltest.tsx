import Link from "next/link";
import React, { useState } from "react";

export default function Carousel({ items }) {
  const [index, setIndex] = useState(0);
  const clickHandler = (i) => {
    if (index + i < 0) {
      setIndex(items.length - 1);
      return;
    }
    if (index + i > items.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + i);
  };
  const getStyle = (i, index) => {
    let style = "";
    if (i === index) {
      style = "slide active";
    }
    if (i < index) {
      style = "slide left";
    }
    if (i > index) {
      style = "slide right";
    }
    if (i === 0 && index == 2) {
      style = "slide right";
    }
    if (i === 2 && index == 0) {
      style = "slide left";
    }
    return style;
  };
  return (
    <div className="home-carousel">
      <i
        className="fas fa-chevron-left prev carousel-button"
        onClick={() => clickHandler(-1)}
      ></i>

      <i
        className="fas fa-chevron-right next carousel-button"
        onClick={() => clickHandler(1)}
      ></i>
      {items.map((item, i: number) => (
        <Link href={"/" + item.campaignId} key={i}>
          <a>
            <img src={item.campaignImage} className={getStyle(i, index)} />
          </a>
        </Link>
      ))}
      <div className=" blocker left"></div>
      <div className=" blocker right"></div>
      <div className="indicators">
        {items.map((item, i) => (
          <span
            key={i}
            className={i === index ? "indicator active" : "indicator"}
            onClick={() => clickHandler(i - index)}
          />
        ))}
      </div>
    </div>
  );
}
