import React from "react";

import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { DealsContentType } from "../../pages/Deals/Deals";

interface TableRowProps {
  content: DealsContentType;
}

const TableRow: React.FC<TableRowProps> = ({ content }) => {
  return (
    <div className="mx-5 my-2 grid h-8 grid-cols-5 items-center justify-items-center rounded-full bg-[#EAFAFF] font-bold text-[#07169B] hover:bg-[#C6F1FF]">
      <p className="cursor-pointer">{content.volunteerName}</p>
      <p className="cursor-pointer">
        {content.volunteerApplicationMessage && (
          <>
            <FontAwesomeIcon icon={faCommentDots} className="mr-1" /> {"hi"}
          </>
        )}
        {content.volunteerApplicationAdvert && (
          <>
            <FontAwesomeIcon icon={faCommentDots} className="mr-1" />
            {content.volunteerApplicationAdvert.advertTitle}
          </>
        )}
      </p>
      <p className="cursor-pointer">Obrazovanje</p>
      <p className="cursor-pointer rounded-xl bg-[#384E77] px-5 py-[2px] text-sm text-white">Ispuni ugovor</p>
      <p className="cursor-pointer rounded-xl bg-[#5422E1] px-5 py-[2px] text-sm text-white">Ispuni potvrdu</p>
    </div>
  );
};

export default TableRow;
