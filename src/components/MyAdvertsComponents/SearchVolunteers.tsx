import React, { useState, useEffect, useCallback } from "react";

import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";

import api from "../../api/createAxiosClient";

interface UserSearchResult {
  userId: number;
  name: string;
  volunteerCenter: string;
}

interface SearchVolunteersProps {
  userId: number | undefined;
  setHelpersId: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function SearchVolunteers({ userId, setHelpersId }: SearchVolunteersProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [helpers, setHelpers] = useState<UserSearchResult[]>([]);

  const fetchVolunteers = useCallback(
    _.debounce(async (name: string) => {
      try {
        const response = await api.get(`/user/search-volunteers/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          params: { name },
        });
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 800),
    [userId]
  );

  useEffect(() => {
    if (searchTerm) {
      fetchVolunteers(searchTerm);
    } else {
      setResults([]);
    }
  }, [searchTerm, fetchVolunteers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleResultClick = (result: UserSearchResult) => {
    // Dodajemo odabranog volontera u helpers polje
    setHelpers((prev) => [...prev, result]);
    // Ako želite ažurirati helpersId polje, koristite setHelpersId funkciju
    setHelpersId((prevIds) => [...prevIds, result.userId]);
    setSearchTerm(""); // Clear search term after adding user
  };

  const removeHelper = (userId: number) => {
    // Filtriramo helpers polje kako bismo uklonili odabranog volontera
    setHelpers((prev) => prev.filter((helper) => helper.userId !== userId));
    // Ako želite ažurirati helpersId polje, koristite setHelpersId funkciju
    setHelpersId((prevIds) => prevIds.filter((id) => id !== userId));
  };

  return (
    <div className="m-2">
      <div className="flex h-8 w-full flex-row items-center rounded-2xl border border-white px-2 text-white">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          className="ml-2 bg-transparent text-white outline-none placeholder:text-white"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Pretraži volontere"
        />
      </div>
      {results.length !== 0 && searchTerm !== "" && (
        <ul className="mt-1 rounded-lg bg-gradient-to-t from-[#DAEFFB] to-[#A7D8F5] p-2">
          {results.map((result) => (
            <li key={result.userId} onClick={() => handleResultClick(result)} className="cursor-pointer">
              {result.name} - {result.volunteerCenter}
            </li>
          ))}
        </ul>
      )}
      {helpers.length !== 0 && (
        <div className="mt-2 flex flex-col gap-1">
          {helpers.map((helper) => (
            <div
              key={helper.userId}
              className="flex cursor-pointer items-center justify-between rounded-full bg-slate-50 px-2"
            >
              <span>{helper.name}</span>
              <button onClick={() => removeHelper(helper.userId)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
