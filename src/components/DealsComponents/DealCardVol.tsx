import React from "react";

import AdvReqButton from "./AdvReqButton";
import ButtonsContainer from "./ButtonsContainer";
import CardSidebarCell from "./CardSidebarCell";
import DownloadDoc from "./DownloadDoc";
import MessageButton from "./MessageButton";
import WaitingDoc from "./WaitingDoc";
import api from "../../api/createAxiosClient";
import { AdvertType } from "../../pages/Deals/AdvertModal";
import { DealsVolContentType, DealType } from "../../pages/Deals/Deals";
import { MessageType } from "../../pages/Deals/MsgModal";
import { RequestType } from "../../pages/Deals/RequestModal";

export interface TableRowProps {
  content: DealsVolContentType;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setRequestModalData: React.Dispatch<React.SetStateAction<RequestType | undefined>>;
  setAdvertModalData: React.Dispatch<React.SetStateAction<AdvertType | undefined>>;
  setMsgModalData: React.Dispatch<React.SetStateAction<MessageType | undefined>>;
  setDealData: React.Dispatch<React.SetStateAction<DealType | undefined>>;
}

const DealCardVol: React.FC<TableRowProps> = ({
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
    if (content.personInNeedMessage)
      setMsgModalData({ name: content.personInNeedName, text: content.personInNeedMessage });
    setActiveModal("MESSAGE_MODAL");
  };

  const onVolunteerMsgButtonClick = () => {
    if (content.volunteerApplicationMessage)
      setMsgModalData({ name: "vaša poruka", text: content.volunteerApplicationMessage });
    setActiveModal("MESSAGE_MODAL");
  };

  const downloadVolunteerReportPdf = async () => {
    try {
      const response = await api.get(`jasper-report/volunteer-report/${content.dealId}`, {
        headers: {
          // eslint-disable-next-line sonarjs/no-duplicate-string
          "Content-Type": "application/pdf",
        },
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "potvrda-o-volontiranju.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Greška prilikom preuzimanja PDF-a:", error);
    }
  };

  const downloadVolunteerContractPdf = async () => {
    try {
      const response = await api.get(`jasper-report/volunteer-contract/${content.dealId}`, {
        headers: {
          "Content-Type": "application/pdf",
        },
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", "ugovor_volontiranja.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Greška prilikom preuzimanja PDF-a:", error);
    }
  };

  return (
    <div className="m-2 grid h-48 grid-cols-5 grid-rows-4 gap-0.5 overflow-hidden rounded-xl border border-[0.5px] border-slate-200 shadow-xl sm:mx-5 sm:h-8 sm:grid-cols-4 sm:grid-rows-1 sm:items-center sm:justify-items-center sm:gap-0 sm:overflow-visible sm:border-0 sm:bg-[#EAFAFF] sm:shadow-none hover:sm:bg-[#C6F1FF]">
      <CardSidebarCell text={"Korisnik"} />
      <p className="col-span-3 flex cursor-pointer items-center bg-[#EAFAFF] pl-2 font-bold text-[#07169B] sm:col-span-1 sm:bg-transparent sm:pl-0">
        {content.personInNeedName}
      </p>
      <CardSidebarCell text={"Prijava korisnika"} />
      <ButtonsContainer>
        {content.personInNeedRequest && <AdvReqButton onClick={onPersonReqButtonClick} />}
        {content.personInNeedMessage && <MessageButton onClick={onPersonMsgButtonClick} />}
      </ButtonsContainer>
      <CardSidebarCell text={"Vaša prijava"} />
      <ButtonsContainer>
        {content.volunteerApplicationAdvert && <AdvReqButton onClick={onVolunteerAdvertButtonClick} />}
        {content.volunteerApplicationMessage && <MessageButton onClick={onVolunteerMsgButtonClick} />}
      </ButtonsContainer>
      <CardSidebarCell text={"Dokumenti"} />
      <ButtonsContainer>
        {content.contractReady ? (
          <DownloadDoc text={"ugovor"} onClick={downloadVolunteerContractPdf} />
        ) : (
          <WaitingDoc text={"ugovor"} />
        )}
        {content.reviewed ? (
          <DownloadDoc text={"potvrda"} onClick={downloadVolunteerReportPdf} />
        ) : (
          <WaitingDoc text={"potvrda"} />
        )}
      </ButtonsContainer>
    </div>
  );
};

export default DealCardVol;
