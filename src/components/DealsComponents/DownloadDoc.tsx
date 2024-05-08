import React from "react";

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WriteDocProps {
  text: string;
  onClick: () => void;
}

const DownloadDoc: React.FC<WriteDocProps> = ({ text, onClick }) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && onClick) onClick();
  };

  return (
    <div
      className="mx-[2px] flex cursor-pointer flex-row items-center justify-between rounded-lg border border-[#63E6BE] bg-white px-1 py-1 font-bold text-[#63E6BE]"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <FontAwesomeIcon icon={faDownload} className="mx-1 text-sm" />
      <span className="text-xs uppercase">{text}</span>
    </div>
  );
};

export default DownloadDoc;
