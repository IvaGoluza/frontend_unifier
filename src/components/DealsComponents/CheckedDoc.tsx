import React from "react";

import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CheckedDocProps {
  text: string;
}

const CheckedDoc: React.FC<CheckedDocProps> = ({ text }) => {
  return (
    <div
      tabIndex={0}
      className="mx-[2px] flex flex-row items-center justify-between rounded-lg border border-[#63E6BE] bg-white px-1 py-1 text-[#63E6BE]"
    >
      <FontAwesomeIcon icon={faCircleCheck} className="mx-1 text-sm" />
      <span className="cursor-default text-xs uppercase">{text}</span>
    </div>
  );
};

export default CheckedDoc;
