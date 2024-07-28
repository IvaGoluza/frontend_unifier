import React, { useState, useEffect } from "react";
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

const Reviews: React.FC<ReviewsProps> = ({ userRecensions = [] }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [displayedReviews, setDisplayedReviews] = useState<UserRecension[]>([]);

  useEffect(() => {
    if (userRecensions.length > 8) {
      const randomReviews = userRecensions.sort(() => 0.5 - Math.random()).slice(0, 8);
      setDisplayedReviews(randomReviews);
    } else {
      setDisplayedReviews(userRecensions);
    }
  }, [userRecensions]);

  const nextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % displayedReviews.length);
  };

  const prevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + displayedReviews.length) % displayedReviews.length);
  };

  return (
    <div>
      <h2 className="px-8 pb-2 pt-64 text-left text-3xl font-semibold text-[#90B8F6] sm:px-16 md:px-32 lg:px-48">
        ŠTO SU KORISNICI NAPISALI O ORGANIZACIJI
      </h2>
      <p className="text-l text-thin px-8 pb-4 pt-2 text-left text-white sm:px-16 md:px-32 lg:px-48">
        U nastavku su prikazane poruke koje su o Vama napisali korisnici kojima ste pomogli ili su sudjelovali u Vašim
        volonterskim akcijama.
      </p>
      {displayedReviews.length > 0 ? (
        <>
          <div className="reviews-container grid justify-items-center gap-y-4 px-4 pb-16 sm:px-16 md:px-32 lg:px-48">
            {displayedReviews.map((recension, index) => {
              const isBgNeeded = colorStyles[index % colorStyles.length].backgroundColor.toUpperCase() === "#E7F4F8";
              return (
                <div
                  key={index}
                  className={`review-card relative flex h-64 w-full flex-col items-center justify-center overflow-auto rounded-2xl border border-white p-4 shadow-md ${
                    index % colorStyles.length === 0 || index % colorStyles.length === colorStyles.length - 2
                      ? "text-white"
                      : "text-black"
                  } ${index === currentReviewIndex ? "block" : "hidden"} sm:block`}
                  style={colorStyles[index % colorStyles.length]}
                >
                  {isBgNeeded && (
                    <img
                      src="../../../assets/svgImages/logo.svg"
                      alt="Logo"
                      className="absolute inset-0 h-full w-full object-cover opacity-25"
                      style={{ zIndex: 10 }}
                    />
                  )}
                  <p className="review-card relative z-10 overflow-auto font-light">{recension.recension}</p>
                </div>
              );
            })}
          </div>
          <div className="review-controls sm:hidden">
            <button onClick={prevReview}>&lt;</button>
            <button onClick={nextReview}>&gt;</button>
          </div>
        </>
      ) : (
        <p className="text-center text-white">Još uvijek nema recenzija...</p>
      )}
    </div>
  );
};

export default Reviews;
