import React from "react";

import { nanoid } from "nanoid";

import { DealsContentType } from "./Deals";
import ModalContainer from "../../components/DealsComponents/ModalContainer";
import NavButton from "../../components/DealsComponents/NavButton";
import TableHeader from "../../components/DealsComponents/TableHeader";
import TableRow from "../../components/DealsComponents/TableRow";

interface DealsTableModalProps {
  headerColumns: string[];
  content: DealsContentType[];
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
}

const DealsTableModal: React.FC<DealsTableModalProps> = ({ headerColumns, content }) => {
  return (
    <ModalContainer>
      <TableHeader columns={headerColumns} />
      {content.map((contentData) => (
        <TableRow key={nanoid()} content={contentData} />
      ))}
      <NavButton leftOnly={false} rightOnly={false} onLeftClick={() => console.log("hi")} />
    </ModalContainer>
  );
};

export default DealsTableModal;
