import React, { useState } from "react";

import AdvertModal, { AdvertType } from "./AdvertModal";
import ContractForm from "./ContractForm";
import DealsTableModal from "./DealsTableModal";
import MsgModal, { MessageType } from "./MsgModal";
import RequestModal, { RequestType } from "./RequestModal";

export interface DealsContentType {
  volunteerId: number;
  volunteerName: string;
  volunteerApplicationMessage?: string;
  volunteerApplicationAdvert?: AdvertType;
  personInNeedMessage?: string;
  personInNeedRequest?: RequestType;
  contractDetailsFulfilled: boolean;
  recensionFulfilled: boolean;
}

export default function Deals() {
  const personInNeedHeader = ["Volonter", "Prijava volontera", "Vaša prijava", "Ispunite dokumente"];
  const contentDummy = [
    {
      volunteerId: 0,
      volunteerName: "string jedan",
      volunteerApplicationAdvert: {
        advertTitle: "adveerrrt",
        location: "string",
        helpType: "string",
        time: "string",
        category: "string",
        description: "string",
        advertImage: "string",
        volunteerCenter: "string",
      },
      personInNeedMessage: "prva string",
      personInNeedRequest: {
        requestTitle: "string",
        location: "string",
        time: "string",
        helpType: "string",
        category: "string",
        typeOfAction: "string",
        description: "string",
        skillSet: "string",
        volunteerCenter: "string",
        numOfVolunteers: 999,
      },
      contractDetailsFulfilled: true,
      recensionFulfilled: false,
    },
    {
      volunteerId: 0,
      volunteerName: "string dva",
      volunteerApplicationMessage: "druga string",
      personInNeedMessage: "treca string",
      personInNeedRequest: {
        requestTitle: "string",
        location: "string",
        time: "string",
        helpType: "string",
        category: "string",
        typeOfAction: "string",
        description: "string",
        skillSet: "string",
        volunteerCenter: "string",
        numOfVolunteers: 0,
      },
      contractDetailsFulfilled: false,
      recensionFulfilled: false,
    },
    {
      volunteerId: 0,
      volunteerName: "string tri",
      volunteerApplicationMessage: "cetvrta string",
      volunteerApplicationAdvert: {
        advertTitle: "zadnji advert",
        location: "string",
        helpType: "string",
        time: "string",
        category: "string",
        description: "string",
        volunteerCenter: "string",
      },
      personInNeedMessage: "peta string",
      contractDetailsFulfilled: true,
      recensionFulfilled: true,
    },
  ];
  const [activeModal, setActiveModal] = useState("DEALS_TABLE");
  const [pagationFirst, setPagationFirst] = useState(true);
  const [pagationLast, setPagationLast] = useState(true);
  const [content, setContent] = useState<DealsContentType[]>([]);
  const [requestModalData, setRequestModalData] = useState<RequestType | undefined>(undefined);
  const [advertModalData, setAdvertModalData] = useState<AdvertType | undefined>(undefined);
  const [msgModalData, setMsgModalData] = useState<MessageType | undefined>(undefined);

  return (
    <div className="flex flex-col items-center justify-center">
      {activeModal === "MESSAGE_MODAL" && <MsgModal message={msgModalData} setActiveModal={setActiveModal} />}
      {activeModal === "REQUEST_MODAL" && <RequestModal request={requestModalData} setActiveModal={setActiveModal} />}
      {activeModal === "ADVERT_MODAL" && (
        <AdvertModal volunteer={"ime volontera"} advert={advertModalData} setActiveModal={setActiveModal} />
      )}
      {activeModal === "CONTRACT_FORM" && <ContractForm setActiveModal={setActiveModal} />}
      {activeModal === "DEALS_TABLE" && (
        <DealsTableModal
          headerColumns={personInNeedHeader}
          content={contentDummy}
          setActiveModal={setActiveModal}
          setRequestModalData={setRequestModalData}
          setAdvertModalData={setAdvertModalData}
          setMsgModalData={setMsgModalData}
        />
      )}
    </div>
  );
}
