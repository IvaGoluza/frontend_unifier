import React from "react";

import { nanoid } from "nanoid";

interface TableHeaderProps {
  columns: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <div className="mb-4 grid h-16 w-full grid-cols-5 items-center justify-items-center rounded-t-[50px] bg-[#00C2FE] px-5 text-center font-bold text-white">
      {columns.map((column) => (
        <p key={nanoid()}>{column}</p>
      ))}
    </div>
  );
};

export default TableHeader;
