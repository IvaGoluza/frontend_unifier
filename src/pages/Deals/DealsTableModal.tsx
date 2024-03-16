import React from "react";

import { AdvertType } from "./AdvertModal";
import { DealsContentType } from "./Deals";
import { MessageType } from "./MsgModal";
import { RequestType } from "./RequestModal";
import DealCard from "../../components/DealsComponents/DealCard";
import ModalBodyContainer from "../../components/DealsComponents/ModalBodyContainer";
import ModalContainer from "../../components/DealsComponents/ModalContainer";
import ModalFooterContainer from "../../components/DealsComponents/ModalFooterContainer";
import NavButton from "../../components/DealsComponents/NavButton";
import TableHeader from "../../components/DealsComponents/TableHeader";

interface DealsTableModalProps {
  headerColumns: string[];
  content: DealsContentType[];
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setRequestModalData: React.Dispatch<React.SetStateAction<RequestType | undefined>>;
  setAdvertModalData: React.Dispatch<React.SetStateAction<AdvertType | undefined>>;
  setMsgModalData: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
}

const DealsTableModal: React.FC<DealsTableModalProps> = ({
  headerColumns,
  content,
  setActiveModal,
  setRequestModalData,
  setAdvertModalData,
  setMsgModalData,
}) => {
  return (
    <>
      <>
        <ModalContainer>
          <ModalBodyContainer>
            <TableHeader numCol={4} columns={headerColumns} />
            {content.map((contentData, index) => (
              <DealCard
                key={index}
                content={contentData}
                setActiveModal={setActiveModal}
                setRequestModalData={setRequestModalData}
                setAdvertModalData={setAdvertModalData}
                setMsgModalData={setMsgModalData}
              />
            ))}
          </ModalBodyContainer>
          <ModalFooterContainer>
            <NavButton leftOnly={false} rightOnly={false} onLeftClick={() => console.log("hi")} />
          </ModalFooterContainer>
        </ModalContainer>
      </>
    </>
  );
};

export default DealsTableModal;
