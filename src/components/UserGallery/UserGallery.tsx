import React, { useEffect, useRef, useState } from "react";

import api from "../../api/createAxiosClient";
import "./userGallery.css";

const images = [
  {
    src: "../../../assets/images/cat4.png",
    description:
      "Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.",
  },
  { src: "../../../assets/images/cat5.png", description: "Drugi opis, možda o nekoj akciji." },
  { src: "../../../assets/images/cat6.png", description: null },
];

const UserGallery = ({ userId }: { userId: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const galleryRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setDescriptionVisible(true);
          } else {
            setDescriptionVisible(false);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex: number) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative z-10 mt-16 flex flex-col items-center justify-center space-y-4 lg:mt-[15vw] lg:flex-row lg:items-center">
      <img
        src="../../../assets/svgImages/volunteer-profile-flower.svg"
        alt="Volunteer Flower"
        className="flower flex-start absolute bottom-0 left-0 h-96 w-auto lg:static lg:self-center"
      />
      <div className="mobileTitle mt-7 text-3xl font-bold text-[#90B8F6] lg:ml-8">
        DNEVNIK PRETHODNIH VOLONTERSKIH AKCIJA
      </div>
      <div className="gallery relative mr-[24vw] flex flex-col items-center justify-center" ref={galleryRef}>
        <div className="group relative">
          <img
            src={images[currentImageIndex].src}
            alt="Profile"
            className={`profile-images ${!images[currentImageIndex].description ? "center-image" : ""}`}
          />
          {images[currentImageIndex].description && (
            <div key={currentImageIndex} className={`description-container ${isDescriptionVisible ? "visible" : ""}`}>
              <p className="text-description break-words p-4 font-light text-white">
                {images[currentImageIndex].description}
              </p>
            </div>
          )}
        </div>
        <div className={`image-controls ${!images[currentImageIndex].description ? "image-controls2" : ""}`}>
          <button onClick={prevImage}>&lt;</button>
          <button onClick={nextImage}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default UserGallery;
