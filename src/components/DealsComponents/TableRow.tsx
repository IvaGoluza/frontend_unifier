import React from "react";

import AdvReqButton from "./AdvReqButton";
import ButtonsContainer from "./ButtonsContainer";
import CheckedDoc from "./CheckedDoc";
import MessageButton from "./MessageButton";
import WriteDoc from "./WriteDoc";
import { AdvertType } from "../../pages/Deals/AdvertModal";
import { DealsContentType } from "../../pages/Deals/Deals";
import { MessageType } from "../../pages/Deals/MsgModal";
import { RequestType } from "../../pages/Deals/RequestModal";

interface TableRowProps {
  content: DealsContentType;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setRequestModalData: React.Dispatch<React.SetStateAction<RequestType | undefined>>;
  setAdvertModalData: React.Dispatch<React.SetStateAction<AdvertType | undefined>>;
  setMsgModalData: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
}

const TableRow: React.FC<TableRowProps> = ({
  content,
  setActiveModal,
  setRequestModalData,
  setAdvertModalData,
  setMsgModalData,
}) => {
  const onPersonReqButtonClick = () => {
    setRequestModalData(content.personInNeedRequest);
    setActiveModal("REQUEST_MODAL");
  };

  const onVolunteerAdvertButtonClick = () => {
    setAdvertModalData(content.volunteerApplicationAdvert);
    setActiveModal("ADVERT_MODAL");
  };

  const onPersonMsgButtonClick = () => {
    if (content.personInNeedMessage) setMsgModalData({ name: "vaša poruka", text: content.personInNeedMessage });
    setActiveModal("MESSAGE_MODAL");
  };

  const onVolunteerMsgButtonClick = () => {
    if (content.volunteerApplicationMessage)
      setMsgModalData({ name: content.volunteerName, text: content.volunteerApplicationMessage });
    setActiveModal("MESSAGE_MODAL");
  };

  return (
    <div className="mx-5 my-2 grid h-8 grid-cols-4 items-center justify-items-center rounded-full bg-[#EAFAFF] font-bold text-[#07169B] hover:bg-[#C6F1FF]">
      <p className="cursor-pointer">{content.volunteerName}</p>
      <ButtonsContainer>
        {content.volunteerApplicationAdvert && <AdvReqButton onClick={onVolunteerAdvertButtonClick} />}
        {content.volunteerApplicationMessage && <MessageButton onClick={onVolunteerMsgButtonClick} />}
      </ButtonsContainer>
      <ButtonsContainer>
        {content.personInNeedRequest && <AdvReqButton onClick={onPersonReqButtonClick} />}
        {content.personInNeedMessage && <MessageButton onClick={onPersonMsgButtonClick} />}
      </ButtonsContainer>
      <ButtonsContainer>
        {content.contractDetailsFulfilled ? <CheckedDoc text={"ugovor"} /> : <WriteDoc text={"ugovor"} />}
        {content.recensionFulfilled ? <CheckedDoc text={"potvrda"} /> : <WriteDoc text={"potvrda"} />}
      </ButtonsContainer>
    </div>
  );
};

export default TableRow;
