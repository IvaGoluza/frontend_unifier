import React from "react";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WriteDocProps {
  text: string;
}

const WriteDoc: React.FC<WriteDocProps> = ({ text }) => {
  return (
    <div className="mx-[2px] flex cursor-pointer flex-row items-center justify-between rounded-lg border border-[#7800F0] bg-white px-1 py-1 text-[#7800F0]">
      <FontAwesomeIcon icon={faPenToSquare} className="mx-1 text-sm" />
      <span className="text-xs uppercase">{text}</span>
    </div>
  );
};

export default WriteDoc;
