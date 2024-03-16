import React from "react";

import AdvReqButton from "./AdvReqButton";
import ButtonsContainer from "./ButtonsContainer";
import CardSidebarCell from "./CardSidebarCell";
import CheckedDoc from "./CheckedDoc";
import MessageButton from "./MessageButton";
import WriteDoc from "./WriteDoc";
import { AdvertType } from "../../pages/Deals/AdvertModal";
import { DealsContentType } from "../../pages/Deals/Deals";
import { MessageType } from "../../pages/Deals/MsgModal";
import { RequestType } from "../../pages/Deals/RequestModal";

export interface TableRowProps {
  content: DealsContentType;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setRequestModalData: React.Dispatch<React.SetStateAction<RequestType | undefined>>;
  setAdvertModalData: React.Dispatch<React.SetStateAction<AdvertType | undefined>>;
  setMsgModalData: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
}

const DealCard: React.FC<TableRowProps> = ({
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

  const onContractButtonClick = () => {
    setActiveModal("CONTRACT_FORM");
  };

  return (
    <div className="m-2 grid h-48 grid-cols-5 grid-rows-4 gap-0.5 overflow-hidden rounded-xl border border-[0.5px] border-slate-200 shadow-xl sm:mx-5 sm:h-8 sm:grid-cols-4 sm:grid-rows-1 sm:items-center sm:justify-items-center sm:gap-0 sm:overflow-visible sm:border-0 sm:bg-[#EAFAFF] sm:shadow-none hover:sm:bg-[#C6F1FF]">
      <CardSidebarCell text={"Volonter"} />
      <p className="col-span-3 flex cursor-pointer items-center bg-[#EAFAFF] pl-2 font-bold text-[#07169B] sm:col-span-1 sm:bg-transparent sm:pl-0">
        {content.volunteerName}
      </p>
      <CardSidebarCell text={"Prijava volontera"} />
      <ButtonsContainer>
        {content.volunteerApplicationAdvert && <AdvReqButton onClick={onVolunteerAdvertButtonClick} />}
        {content.volunteerApplicationMessage && <MessageButton onClick={onVolunteerMsgButtonClick} />}
      </ButtonsContainer>
      <CardSidebarCell text={"Vaša prijava"} />
      <ButtonsContainer>
        {content.personInNeedRequest && <AdvReqButton onClick={onPersonReqButtonClick} />}
        {content.personInNeedMessage && <MessageButton onClick={onPersonMsgButtonClick} />}
      </ButtonsContainer>
      <CardSidebarCell text={"Dokumenti"} />
      <ButtonsContainer>
        {content.contractDetailsFulfilled ? (
          <CheckedDoc text={"ugovor"} />
        ) : (
          <WriteDoc text={"ugovor"} onClick={onContractButtonClick} />
        )}
        {content.recensionFulfilled ? (
          <CheckedDoc text={"potvrda"} />
        ) : (
          <WriteDoc text={"potvrda"} onClick={() => console.log("to do")} />
        )}
      </ButtonsContainer>
    </div>
  );
};

export default DealCard;
