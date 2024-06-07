import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";
import _ from "lodash";

import api from "../../api/createAxiosClient";

interface UserSearchResult {
  userId: number;
  name: string;
  volunteerCenter: string;
}

interface SearchVolunteersProps {
  userId: number | undefined;
}

export default function SearchVolunteers({ userId }: SearchVolunteersProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [helpersId, setHelpersId] = useState<number[]>([]);

  const fetchVolunteers = useCallback(
    _.debounce(async (name: string) => {
      try {
        const response = await api.get(`/user/search-volunteers/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          params: { name },
        });
        console.log(response.data);
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

  const handleResultClick = (userId: number) => {
    setHelpersId((prev) => [...prev, userId]);
    setResults([]);
    setSearchTerm("");
  };

  return (
    <div className="m-4">
      <input
        className="border-1 rounded-full border bg-red-700"
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Pretraži volontere"
      />
      <ul>
        {results.map((result) => (
          <li key={result.userId} onClick={() => handleResultClick(result.userId)}>
            {result.name} - {result.volunteerCenter}
          </li>
        ))}
      </ul>
    </div>
  );
}
