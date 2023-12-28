import React from "react";

import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NoteProps {
  text: string;
  email: string;
}

export default function NoteProfileCard({ text, email }: NoteProps) {
  return (
    <div className="m-8 rounded-lg bg-neutral-100 px-6 py-5 text-center text-xl text-emerald-900 shadow-lg">
      <p className="font-normal italic leading-relaxed">
        <FontAwesomeIcon icon={faQuoteLeft} className="m-1" />
        {text}
        <FontAwesomeIcon icon={faQuoteRight} className="m-1" />
      </p>
      <p className="px-6 pt-5 text-end">{email}</p>
    </div>
  );
}
