import Link from "next/link";
import React from "react";
import { Carousel } from "react-bootstrap";

export default function HomeCarousel({ items }) {
  return (
    <div>
      <Carousel className="mt-3">
        {items.map((item, index) => (
          <Carousel.Item className="px-2" key={index}>
            <Link href={"/" + item.campaignId}>
              <a>
                <img
                  className="d-block w-100"
                  src={item.campaignImage}
                  alt={item.campaignTitle}
                />
              </a>
            </Link>
            <Carousel.Caption>
              <h3>{item.campaignTitle}</h3>
              <p>{item.campaignDescription}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
