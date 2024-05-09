import React, { useEffect, useRef, useState } from "react";

import api from "../../api/createAxiosClient";
import "./reviews.css";

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

interface UserRecension {
  recension: string;
}

interface ReviewsProps {
  userRecensions?: UserRecension[];
}

const Reviews: React.FC<ReviewsProps> = ({ userRecensions }) => {
  return (
    <div>
      <h2 className="px-8 pb-2 pt-80  text-left text-3xl font-semibold text-[#90B8F6] sm:px-16 md:px-32 lg:px-48">
        ŠTO SU KORISNICI NAPISALI O ORGANIZACIJI
      </h2>
      <p className="text-l text-thin pb-8 text-left text-white sm:px-16 md:px-32 lg:px-48">
        U nastavku su prikazane poruke koje su o Vama napisali korisnici kojima ste pomogli ili su sudjelovali u Vašim
        volonterskim akcijama.
      </p>
      <div className="grid justify-items-center gap-y-4 px-8 pb-16 sm:grid-cols-1 sm:px-16 md:px-32 lg:grid-cols-2 lg:px-48 xl:grid-cols-4">
        {userRecensions?.map((recension, index) => {
          const isBgNeeded = colorStyles[index % colorStyles.length].backgroundColor.toUpperCase() === "#E7F4F8";
          return (
            <div
              key={index}
              className={`relative flex h-64 w-full flex-col items-center justify-center overflow-auto rounded-2xl border border-white p-4 shadow-md sm:w-64 ${
                index % colorStyles.length === 0 || index % colorStyles.length === colorStyles.length - 2
                  ? "text-white"
                  : "text-black"
              }`}
              style={colorStyles[index % colorStyles.length]}
            >
              {isBgNeeded && (
                <img
                  src="../../../assets/svgImages/logo.svg"
                  alt="Logo"
                  className="absolute inset-0 left-16 h-full w-full scale-150 transform object-cover opacity-25"
                  style={{ zIndex: 10 }}
                />
              )}
              <p className="relative z-10 overflow-auto font-light">{recension.recension}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Reviews;
