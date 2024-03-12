import React, { useEffect, useRef, useState } from "react";
import "./userProfile.css";

const images = [
  {
    src: "../../../assets/images/cat4.png",
    description:
      "Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.Opis za prvu sliku o volontiranju.",
  },
  { src: "../../../assets/images/cat5.png", description: "Drugi opis, možda o nekoj akciji." },
  { src: "../../../assets/images/cat6.png", description: null },
];

const reviews = [
  { text: "Ovo je tekst recenzije 1." },
  { text: "Ovo je tekst recenzije 2." },
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

const UserProfile = () => {
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
    <div className="user-profile relative w-full overflow-hidden">
      <div className="profile-picture-container"></div>
      <div className="fullname whitespace-nowrap text-center text-lg font-bold text-[#09115B] md:text-3xl lg:text-6xl">
        Maria Lovrić
      </div>
      <div className="mt-[-30vh] flex justify-evenly px-24 py-12">
        <div className="relative flex h-72 w-72 flex-col items-start justify-start overflow-hidden rounded-2xl bg-[#F8F26C] p-4 shadow-2xl">
          <div className="flex flex-col space-y-2">
            <div className="">
              <h2 className="text-lg font-bold text-[#0F182C] md:text-xl">Kontakt Info</h2>
              <div className="mt-1 h-1 w-32 bg-[#C1B908]"></div>
            </div>
            <div className="space-y-2 ">
              <div className="flex items-center">
                <img src="../../../assets/svgImages/mail.svg" alt="Email" className="h-6 w-6" />
                <span className="ml-2 text-sm text-[#0F182C]">maria.lovric@gmail.com</span>
              </div>
              <div className="flex items-center">
                <img src="../../../assets/svgImages/phone.svg" alt="Phone" className="h-6 w-6" />
                <span className="ml-2 text-sm text-[#0F182C]">098 1982 378</span>
              </div>
            </div>
          </div>
          <img
            src="../../../assets/svgImages/logo.svg"
            alt="Logo"
            className="absolute left-24 top-32 h-2/3 w-2/3 rotate-[30deg] opacity-30"
          />
        </div>

        <div
          className="flex h-72 w-72 flex-col items-start justify-start rounded-2xl p-4 text-white shadow-2xl"
          style={{ backgroundColor: "#0F182C" }}
        >
          <h2 className="text-xl font-bold">O VOLONTERU...</h2>
          <p className="mt-4 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>

        <div
          className="relative flex h-72 w-72 flex-col items-start justify-start rounded-2xl p-4 text-[#0F182C] shadow-2xl"
          style={{ backgroundColor: "#99D7E8" }}
        >
          <h2 className="text-xl font-bold">PODRUČJE RADA</h2>
          <ul className="mt-3 list-disc space-y-2 pl-4 text-sm">
            <li>DJECA I MLADI</li>
            <li>OSOBE S INVALIDITETOM</li>
            <li>OBRAZOVANJE</li>
            <li>ZABAVA</li>
            <li>RADIONICE</li>
          </ul>
          <img
            src="../../../assets/svgImages/logo.svg"
            alt="Logo"
            className="absolute right-2 top-2 h-8 w-8 transform"
            style={{ zIndex: 10 }}
          />
        </div>
        <div
          className="relative flex h-72 w-72 flex-col items-start justify-start overflow-hidden rounded-2xl p-4 text-[#0F182C] shadow-2xl"
          style={{ backgroundColor: "#E7F4F8" }}
        >
          <h2 className="text-xl font-bold">PRILOŽENE POTVRDE</h2>
          <div className="mt-3 list-disc space-y-2 text-sm">
            <div className="flex items-center">
              <img src="../../../assets/svgImages/tick.svg" alt="Email" className="h-6 w-6" />
              <span className="ml-2 text-sm text-[#0F182C]">maria.lovric@gmail.com</span>
            </div>
            <div className="flex items-center">
              <img src="../../../assets/svgImages/tick.svg" alt="Phone" className="h-6 w-6" />
              <span className="ml-2 text-sm text-[#0F182C]">098 1982 378</span>
            </div>
          </div>
          <img
            src="../../../assets/svgImages/logo.svg"
            alt="Logo"
            className="absolute inset-0 left-16 h-full w-full scale-150 transform object-cover opacity-25"
            style={{ zIndex: 10 }}
          />
        </div>
      </div>
      <div className="z-10 mt-[-15vh] flex flex-col items-start justify-between lg:mt-[25vh] lg:flex-row lg:items-center">
        <img
          src="../../../assets/svgImages/volunteer-profile-flower.svg"
          alt="Volunteer Flower"
          className="h-96 w-auto self-start lg:self-center"
        />
        <div className="mt-5 text-3xl font-bold text-[#90B8F6]">DNEVNIK PRETHODNIH VOLONTERSKIH AKCIJA</div>
        <div className="relative mr-[22rem] flex w-[60%] flex-col items-center justify-center" ref={galleryRef}>
          <div className="group relative">
            <img
              src={images[currentImageIndex].src}
              alt="Profile"
              className={`profile-images ${!images[currentImageIndex].description ? "center-image" : ""}`}
            />
            {images[currentImageIndex].description && (
              <div key={currentImageIndex} className={`description-container ${isDescriptionVisible ? "visible" : ""}`}>
                <p className="absolute bottom-0 left-[3vh] p-4 font-light text-white">
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
      <div className="grid grid-cols-2 justify-items-center gap-y-2 px-48 pb-32 pt-48 lg:grid-cols-4">
        {reviews.map((review, index) => {
          const isBgNeeded = colorStyles[index].backgroundColor.toUpperCase() === "#E7F4F8";
          return (
            <div
              key={index}
              className={`relative flex h-64 w-64 flex-col items-center justify-center overflow-hidden rounded-2xl border border-white p-4 shadow-md ${
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
              <p className="relative z-10 font-light">{review.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
