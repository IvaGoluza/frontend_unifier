import React from "react";

import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface cardData {
  text: string;
  email: string;
}

export default function NoteModalCard({ text, email }: cardData) {
  return (
    <p className="min-h- m-3 rounded-lg border border-gray-100 bg-white px-2 text-center italic text-emerald-900 shadow-md">
      <FontAwesomeIcon icon={faQuoteLeft} className="fa-2xs m-1" />
      {text}
      <FontAwesomeIcon icon={faQuoteRight} className="fa-2xs m-1" /> <span className="ml-5">~{email}</span>
    </p>
  );
}
