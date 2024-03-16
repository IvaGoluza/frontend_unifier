import React from "react";

interface TableSidebarCellProps {
  text: string;
}

const CardSidebarCell: React.FC<TableSidebarCellProps> = ({ text }) => {
  return (
    <div className="col-span-2 flex items-center justify-center bg-[#00C2FE] text-center font-bold text-white sm:hidden">
      {text}
    </div>
  );
};

export default CardSidebarCell;
