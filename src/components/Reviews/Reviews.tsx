import React, { useEffect, useRef, useState } from "react";

import api from "../../api/createAxiosClient";
import "./reviews.css";

const reviews = [
  {
    text: "Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.",
  },
  {
    text: "Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.",
  },
  { text: "Ovo je tekst recenzije 3." },
  { text: "Ovo je tekst recenzije 4." },
  { text: "Ovo je tekst recenzije 5." },
  { text: "Ovo je tekst recenzije 6." },
  { text: "Ovo je tekst recenzije 7." },
  { text: "Ovo je tekst recenzije 8." },
];

const colorStyles = [
  { backgroundColor: "#0F182C" },
  { backgroundColor: "#99D7E8" },
  { backgroundColor: "#B0A9F9" },
  { backgroundColor: "#E7F4F8" },
  { backgroundColor: "#E7F4F8" },
  { backgroundColor: "#F8F26C" },
  { backgroundColor: "#0F182C" },
  { backgroundColor: "#99D7E8" },
];

const Reviews = ({ userId }: { userId: string }) => {
  return (
    <div className="grid justify-items-center gap-y-4 px-8 pb-16 pt-16 sm:grid-cols-1 sm:px-16 md:px-32 lg:grid-cols-2 lg:px-48 xl:grid-cols-4">
      {reviews.map((review, index) => {
        const isBgNeeded = colorStyles[index].backgroundColor.toUpperCase() === "#E7F4F8";
        return (
          <div
            key={index}
            className={`relative flex h-64 w-full flex-col items-center justify-center overflow-auto rounded-2xl border border-white p-4 shadow-md sm:w-64 ${
              index === 0 || index === reviews.length - 2 ? "text-white" : "text-black"
            }`}
            style={colorStyles[index]}
          >
            {isBgNeeded && (
              <img
                src="../../../assets/svgImages/logo.svg"
                alt="Logo"
                className="absolute inset-0 left-16 h-full w-full scale-150 transform object-cover opacity-25"
                style={{ zIndex: 10 }}
              />
            )}
            <p className="relative z-10 overflow-auto font-light">{review.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;
