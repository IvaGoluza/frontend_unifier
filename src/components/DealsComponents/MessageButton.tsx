import React from "react";

import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface MessageButtonProps {
  onClick: () => void;
}

const MessageButton: React.FC<MessageButtonProps> = ({ onClick }) => {
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && onClick) onClick();
  };

  return (
    <div
      tabIndex={0}
      className="mx-[2px] flex cursor-pointer flex-col items-center justify-center rounded-lg border border-[#FA7000] bg-white p-1"
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <FontAwesomeIcon icon={faCommentDots} className="text-[#FA7000]" />
    </div>
  );
};

export default MessageButton;
