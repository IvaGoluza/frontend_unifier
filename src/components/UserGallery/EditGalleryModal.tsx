import React, { useState } from "react";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

import api from "../../api/createAxiosClient";

interface EditGalleryModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  userId: string;
  onUpdateGallery: (newImage: { src: string; description: string }) => void;
}

Modal.setAppElement("#root");

const EditGalleryModal: React.FC<EditGalleryModalProps> = ({ isOpen, onRequestClose, userId, onUpdateGallery }) => {
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    setSelectedFile(file);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile) {
      setErrorMessage("Odaberite datoteku!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const galleryData = JSON.stringify({ description, userId: parseInt(userId, 10) });
    const galleryBlob = new Blob([galleryData], { type: "application/json" });
    formData.append("gallery", galleryBlob, "gallery.json");

    console.log("Form data being sent:");
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await api.post("/profile/user-gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response);

      const newImage = {
        src: URL.createObjectURL(selectedFile),
        description,
      };

      onUpdateGallery(newImage);
      onRequestClose();
    } catch (error) {
      console.error("Error uploading image:", error);
      setErrorMessage("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 z-50 flex items-center justify-center outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
        <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faCircleXmark} size="2x" />
        </button>
        <h2 className="mb-4 text-2xl font-bold">Dodaj sliku u galeriju</h2>
        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Opis slike
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-[#5422E1] px-2 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Odaberi sliku</label>
            <div className="mt-1 flex items-center">
              <input type="file" name="file" id="file-upload" className="hidden" onChange={handleFileChange} />
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-[35px] bg-[#3d4488] px-4 py-2 text-center text-white hover:bg-[#2e3467]"
              >
                Odaberi datoteku
              </label>
              <span className="ml-2">{selectedFile ? selectedFile.name : "Nije odabrana niti jedna datoteka."}</span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="letter-spacing-0-06 font-krub flex h-[1.5rem] w-2/5 items-center justify-center rounded-[35px] bg-[#3d4488] p-2 text-xs font-bold text-white hover:bg-[#2e3467] lg:text-sm"
            >
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditGalleryModal;
