import React, { useEffect, useState } from "react";
import Review from "./Review";
import { getReviews } from "../../data/reviews";

const dropdownItems = [
  { id: "newest", title: "Newest" },
  { id: "oldest", title: "Oldest" },
  { id: "lowest", title: "Lowest" },
  { id: "highest", title: "Highest" },
];
let start = 0;
let end = 6;

export default function Reviews({ productId, setShow,show }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({
    id: "newest",
    title: "Newest",
  });

  const [reviews, setReviews] = useState([]);
  const fetch = async () => {
    start = 0;
    end = 6;
    setReviews(await getReviews(productId, start, end, selected.id));
  };
  useEffect(() => {
    if(!show)
    {
      fetch();
    }
  }, [selected.id,productId,show]);
  const clickHandler = (title) => {
    setSelected(title);
    if (process.browser) {
      document.getElementById("dropdown").blur();
    }
  };

  const loadMore = async () => {
    start = end;
    end += 6;
    const data = await getReviews(productId, start, end, selected.id);
    setReviews([...reviews, ...data]);
  };

  return (
    <div className="review-container">
      <div className="d-flex justify-content-end align-items-center">
        
        <div
          tabIndex={1}
          className="dropdown"
          id="dropdown"
          onClick={() => setOpen(!open)}
          onBlur={() => setOpen(false)}
        >
          <div className="dropdown-button">
            <div>{selected.title}</div>
            {open ? (
              <i className="fas fa-caret-up"></i>
            ) : (
              <i className="fas fa-caret-down"></i>
            )}
          </div>
          {open ? (
            <div className="menu">
              {dropdownItems.map((item) => (
                <div
                  key={item.id}
                  className={selected.id === item.id ? "item selected" : "item"}
                  onClick={() => clickHandler(item)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {reviews.map((review) => (
        <Review key={review.reviewId} review={review} setShow={setShow}/>
      ))}
      <div className="d-flex">
        <div className="load-button" onClick={() => loadMore()}>
          Load More
        </div>
      </div>
    </div>
  );
}
