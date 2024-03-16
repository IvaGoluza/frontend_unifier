import React from "react";

import { nanoid } from "nanoid";

interface TableHeaderProps {
  numCol: number;
  columns: string[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ numCol, columns }) => {
  const additionalCSS: React.CSSProperties = {
    gridTemplateColumns: `repeat(${numCol}, 1fr)`, // Use camelCase syntax here
  };

  return (
    <div
      className="mb-4 hidden h-16 w-full grid-cols-4 items-center justify-items-center rounded-t-[50px] bg-[#00C2FE] px-5 text-center font-bold text-white sm:grid"
      style={additionalCSS}
    >
      {columns.map((column) => (
        <p key={nanoid()}>{column}</p>
      ))}
    </div>
  );
};

export default TableHeader;
