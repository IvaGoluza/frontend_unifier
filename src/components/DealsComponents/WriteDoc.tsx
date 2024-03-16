import React from "react";

import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WriteDocProps {
  text: string;
  onClick: () => void;
}

const WriteDoc: React.FC<WriteDocProps> = ({ text, onClick }) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && onClick) onClick();
  };

  return (
    <div
      className="mx-[2px] flex cursor-pointer flex-row items-center justify-between rounded-lg border border-[#7800F0] bg-white px-1 py-1 font-bold text-[#7800F0]"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <FontAwesomeIcon icon={faPenToSquare} className="mx-1 text-sm" />
      <span className="text-xs uppercase">{text}</span>
    </div>
  );
};

export default WriteDoc;
