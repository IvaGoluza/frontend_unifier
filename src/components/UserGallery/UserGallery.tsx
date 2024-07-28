import React, { useEffect, useRef, useState, useCallback } from "react";

import EditGalleryModal from "./EditGalleryModal";
import api from "../../api/createAxiosClient";
import "./userGallery.css";

interface Image {
  src: string;
  description: string;
}

const UserGallery = ({ userId }: { userId: string }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMoreImages, setHasMoreImages] = useState(true);
  const [isSameUser, setIsSameUser] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchImages(page);
  }, [page]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = storedUser ? JSON.parse(storedUser).id : null;

    setIsSameUser(parseInt(userId) === storedUserId);
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
  }, [userId]);

  const fetchImages = async (page: number) => {
    try {
      const response = await api.get(`/profile/user-gallery/${userId}`, {
        params: {
          page,
          size: 10,
        },
      });
      const newImages = response.data.content.map((item: any) => ({
        src: `data:image/jpeg;base64,${item.image}`,
        description: item.description,
      }));

      console.log("Fetched images:", newImages);

      setImages((prevImages) => [...prevImages, ...newImages]);
      setHasMoreImages(!response.data.last);

      console.log("Updated images:", images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex === images.length) {
        if (hasMoreImages) {
          setPage((prevPage) => prevPage + 1);
        }
        return 0;
      }
      return nextIndex;
    });
  }, [images.length, hasMoreImages]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleGalleryUpdate = useCallback((newImage: Image) => {
    console.log("Adding new image:", newImage);
    setImages((prevImages) => [...prevImages, newImage]);
    setIsModalOpen(false);
  }, []);

  return (
    <div className="relative z-10 mt-16 flex flex-col items-center justify-center space-y-4 lg:mt-[15vw] lg:flex-row lg:items-center">
      <img
        src="../../../assets/svgImages/volunteer-profile-flower.svg"
        alt="Volunteer Flower"
        className="flower flex-start absolute bottom-0 left-0 h-96 w-auto lg:static lg:self-center"
      />
      <div className="mobileTitle mt-7 text-3xl font-bold text-[#90B8F6] lg:ml-8">
        DNEVNIK PRETHODNIH VOLONTERSKIH AKCIJA
        {isSameUser && (
          <div>
            <div className="mt-4 text-[14px] font-thin leading-tight text-white">
              Priložite slike i opis Vaših prethodnih volonterskih akcija kako bi se ostali korisnici mogli lako
              upoznati s Vašim radom.
            </div>
            <img
              src="../../../assets/svgImages/editGallery.svg"
              alt="Edit Gallery"
              className="editGallery mt-3 h-16 w-16 cursor-pointer"
              onClick={openModal}
            />
          </div>
        )}
      </div>
      <div className="gallery relative mr-[24vw] flex flex-col items-center justify-center" ref={galleryRef}>
        <div className="group relative">
          {images.length > 0 && (
            <img
              src={images[currentImageIndex].src}
              alt="Profile"
              className={`profile-images ${!images[currentImageIndex].description ? "center-image" : ""}`}
              style={{ maxHeight: "500px" }}
            />
          )}
          {images[currentImageIndex]?.description && (
            <div key={currentImageIndex} className={`description-container ${isDescriptionVisible ? "visible" : ""}`}>
              <p className="text-description break-words p-4 font-light text-white">
                {images[currentImageIndex].description}
              </p>
            </div>
          )}
        </div>
        {images.length > 0 && (
          <div className={`image-controls ${!images[currentImageIndex]?.description ? "image-controls2" : ""}`}>
            <button onClick={prevImage}>&lt;</button>
            <button onClick={nextImage}>&gt;</button>
          </div>
        )}
      </div>
      {isModalOpen && (
        <EditGalleryModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          userId={userId}
          onUpdateGallery={handleGalleryUpdate}
        />
      )}
    </div>
  );
};

export default UserGallery;
