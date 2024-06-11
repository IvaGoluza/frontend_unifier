import React, { ChangeEvent, useState } from "react";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Advert2, towns, helpType, categories } from "../../api/auth/IForm";

interface AdvertsFilterProps {
  data: Advert2[];
  setFilteredAdverts: React.Dispatch<React.SetStateAction<Advert2[]>>;
}

const AdvertsFilterButton = ({ data, setFilteredAdverts }: AdvertsFilterProps) => {
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedHelpType, setSelectedHelpType] = useState("");

  const handleTownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTown(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleHelpTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedHelpType(event.target.value);
  };

  const filterAdverts = () => {
    const filteredData = data.filter((advert) => {
      const isTownSelected = selectedTown !== "";
      const isCategorySelected = selectedCategory !== "";
      const isHelpTypeSelected = selectedHelpType !== "";
      return !(
        (isTownSelected && advert.volunteerCenter !== selectedTown) ||
        (isCategorySelected && advert.category !== selectedCategory) ||
        (isHelpTypeSelected && advert.helpType !== selectedHelpType)
      );
    });

    setFilteredAdverts(filteredData);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          className="w-48 cursor-pointer rounded-full bg-[#5422E1] px-2 py-2 text-center font-bold uppercase text-white hover:tracking-widest"
        >
          FILTRIRAJ OGLASE
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent bgImage">
          <Dialog.Description className="text-gray text-lg">
            Odaberite željene filtre i pogledajte samo volonterske oglase koji Vas zanimaju!
          </Dialog.Description>
          <div className="">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="fa-2xl text-indigo-200" />
              <div className="my-4 flex flex-col">
                <p className="mx-2 text-xl font-semibold text-indigo-900">Grad</p>
                <select
                  value={selectedTown}
                  defaultValue={undefined}
                  onChange={handleTownChange}
                  className="mx-2 w-52 rounded-lg border-2 border-gray-200 p-1 text-base shadow-lg"
                >
                  {towns.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="fa-2xl text-indigo-200" />
              <div className="my-4 flex flex-col">
                <p className="mx-2 text-xl font-semibold text-indigo-900">Skupina ljudi kojima se pomaže</p>
                <select
                  value={selectedCategory}
                  defaultValue={undefined}
                  onChange={handleCategoryChange}
                  className="mx-2 w-52 rounded-lg border-2 border-gray-200 p-1 text-base shadow-lg"
                >
                  {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="fa-2xl text-indigo-200" />
              <div className="my-4 flex flex-col">
                <p className="mx-2 text-xl font-semibold text-indigo-900">Vrsta pomoći</p>
                <select
                  value={selectedHelpType}
                  defaultValue={undefined}
                  onChange={handleHelpTypeChange}
                  className="mx-2 w-52 rounded-lg border-2 border-gray-200 p-1 text-base shadow-lg"
                >
                  {helpType.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 25, justifyContent: "center" }}>
            <Dialog.Close asChild>
              <button
                className="mx-3 rounded-3xl bg-blue-900 px-7 py-2 font-bold text-white hover:bg-blue-700"
                onClick={filterAdverts}
              >
                Pronađi oglase
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AdvertsFilterButton;
