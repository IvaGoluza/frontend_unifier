import React, { ChangeEvent, useState } from "react";

import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { nanoid } from "nanoid";

import { RequestTypeDeals, towns, helpType, categories, request_owner } from "../../api/auth/IForm";

interface RequestsFilterProps {
  data: RequestTypeDeals[];
  setFilteredRequests: React.Dispatch<React.SetStateAction<RequestTypeDeals[]>>;
}

const RequestsFilter = ({ data, setFilteredRequests }: RequestsFilterProps) => {
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedHelpType, setSelectedHelpType] = useState("");
  const [selectedOwner, setSelectedOwner] = useState("");

  const handleTownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedTown(event.target.value);
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleHelpTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedHelpType(event.target.value);
  };

  const handleOwnerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOwner(event.target.value);
  };

  const filterRequests = () => {
    const filteredData = data.filter((request) => {
      const isTownSelected = selectedTown !== "";
      const isCategorySelected = selectedCategory !== "";
      const isHelpTypeSelected = selectedHelpType !== "";
      const isOwnerSelected = selectedOwner !== "";
      return !(
        (isTownSelected && request.town !== selectedTown) ||
        (isCategorySelected && request.category !== selectedCategory) ||
        (isHelpTypeSelected && request.helpType !== selectedHelpType) ||
        (isOwnerSelected && selectedOwner === "association" && !request.association)
      );
    });

    setFilteredRequests(filteredData);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="absolute -top-40 left-72 pl-4">
          <div className="ml-10 flex h-36 w-36 -rotate-6 flex-col items-center justify-center rounded-full bg-white text-2xl font-bold text-indigo-400 no-underline shadow-lg hover:bg-indigo-400 hover:text-white">
            <p>Filtriraj</p>
            <p>zahtjeve</p>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent bgImage">
          <Dialog.Description className="text-gray ml-10 text-lg">
            Odaberite željene filtre i pogledajte samo zahtjeve koji Vas zanimaju!
          </Dialog.Description>
          <div className="ml-40">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="fa-2xl text-indigo-200" />
              <div className="my-2 flex flex-col">
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
              <div className="my-2 flex flex-col">
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
              <div className="my-2 flex flex-col">
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

            <div className="flex items-center">
              <FontAwesomeIcon icon={faFilter} className="fa-2xl text-indigo-200" />
              <div className="my-2 flex flex-col">
                <p className="mx-2 text-xl font-semibold text-indigo-900">Tvorac zahtjeva</p>
                <select
                  value={selectedOwner}
                  defaultValue={undefined}
                  onChange={handleOwnerChange}
                  className="mx-2 w-52 rounded-lg border-2 border-gray-200 p-1 text-base shadow-lg"
                >
                  {request_owner.map((option) => (
                    <option key={nanoid()} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
            <Dialog.Close asChild>
              <button
                className="mx-3 rounded-3xl bg-blue-900 px-7 py-2 font-bold text-white hover:bg-blue-700"
                onClick={filterRequests}
              >
                Pronađi zahtjeve
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

export default RequestsFilter;
