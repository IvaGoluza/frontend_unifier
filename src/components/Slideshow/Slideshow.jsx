import React from "react";

import "./slideshow.css";

export default function Slideshow(values) {
  const [index, setIndex] = React.useState(0);
  return (
    <div className="slideshow">
      <h2 className="mb-4 text-center text-3xl font-bold text-sky-900">{values.title}</h2>
      <div className="slideshowSlider" style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
        {Array.apply(0, Array(values.number)).map(function (x, i) {
          return (
            <img
              className="slide"
              src={"../../assets/images/" + values.images + i + ".png"}
              alt={values.images + i}
              key={i}
            />
          );
        })}
      </div>

      <div className="slideshowDots">
        {Array.apply(0, Array(values.number)).map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " activeDot" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
