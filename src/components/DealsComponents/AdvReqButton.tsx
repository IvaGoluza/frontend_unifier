import React from "react";

import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface AdvReqButtonProps {
  onClick: () => void;
}

const AdvReqButton: React.FC<AdvReqButtonProps> = ({ onClick }) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && onClick) onClick();
  };

  return (
    <div
      tabIndex={0}
      className="mx-[2px] flex cursor-pointer flex-col items-center justify-center rounded-lg border border-[#384E77] bg-white p-1"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <FontAwesomeIcon icon={faRectangleList} className="text-[#384E77]" />
    </div>
  );
};

export default AdvReqButton;
