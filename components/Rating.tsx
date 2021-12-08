import React, { useEffect, useState } from "react";

export default function Rating({ value, clickHandler,size }) {
  let fraction = (value * 10) % 10;
  let integer = (value * 10 - fraction) / 10;
  const [rating, setRating] = useState([]);
  useEffect(() => {
    onHover(0);
  }, [value]);
  const onHover = (index) => {
    if (index === 0) {
      defaultRating();
    } else {
      let starContainer = [];

      for (let i = 1; i <= 5; i++) {
        if (i <= index) {
          starContainer.push(
            <i
              key={i}
              style={size!==undefined?{fontSize:size}:null}
              className="fas fa-star"
              onClick={() => clickHandler(i)}
              onMouseOver={() => onHover(i)}
            ></i>
          );
        } else {
          starContainer.push(
            <i
              key={i}
              style={size!==undefined?{fontSize:size}:null}
              className="far fa-star"
              onClick={() => clickHandler(i)}
              onMouseOver={() => onHover(i)}
            ></i>
          );
        }
      }
      setRating(starContainer);
    }
  };

  const defaultRating = () => {
    let starContainer = [];
    if (value === undefined) {
      if (clickHandler === undefined) {
        for (let i = 1; i <= 5; i++) {
          starContainer.push(<i key={i} style={size!==undefined?{fontSize:size}:null} className="far fa-star"></i>);
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          starContainer.push(
            <i
              key={i}
              style={size!==undefined?{fontSize:size}:null}
              className="far fa-star"
              onClick={() => clickHandler(i)}
              onMouseOver={() => onHover(i)}
            ></i>
          );
        }
      }
    } else {
      if (clickHandler === undefined) {
        for (let i = 1; i <= 5; i++) {
          if (i <= integer) {
            starContainer.push(<i style={size!==undefined?{fontSize:size}:null} key={i} className="fas fa-star"></i>);
          } else if (i - 1 == integer && fraction >= 5) {
            starContainer.push(
              <i key={i} style={size!==undefined?{fontSize:size}:null} className="fas fa-star-half-alt"></i>
            );
          } else {
            starContainer.push(<i key={i} style={size!==undefined?{fontSize:size}:null} className="far fa-star"></i>);
          }
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          if (i <= integer) {
            starContainer.push(
              <i
                key={i}
                style={size!==undefined?{fontSize:size}:null}
                className="fas fa-star"
                onClick={() => clickHandler(i)}
                onMouseOver={() => onHover(i)}
              ></i>
            );
          } else if (i - 1 == integer && fraction >= 5) {
            starContainer.push(
              <i
                key={i}
                style={size!==undefined?{fontSize:size}:null}
                className="fas fa-star-half-alt"
                onClick={() => clickHandler(i)}
                onMouseOver={() => onHover(i)}
              ></i>
            );
          } else {
            starContainer.push(
              <i
                key={i}
                style={size!==undefined?{fontSize:size}:null}
                className="far fa-star"
                onClick={() => clickHandler(i)}
                onMouseOver={() => onHover(i)}
              ></i>
            );
          }
        }
      }
    }
    setRating(starContainer);
  };
  return (
    <div style={{ width: "fit-content" }} onMouseLeave={() => onHover(0)}>
      {rating}
    </div>
  );
}
