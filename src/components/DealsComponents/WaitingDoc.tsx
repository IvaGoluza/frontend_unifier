import React from "react";

import { faHourglassHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface WriteDocProps {
  text: string;
}

const WaitingDoc: React.FC<WriteDocProps> = ({ text }) => {
  return (
    <div className="mx-[2px] flex cursor-pointer flex-row items-center justify-between rounded-lg border border-slate-800 bg-white px-1 py-1 font-bold text-slate-800">
      <FontAwesomeIcon icon={faHourglassHalf} className="mx-1 text-sm" />
      <span className="text-xs uppercase">{text}</span>
    </div>
  );
};

export default WaitingDoc;
