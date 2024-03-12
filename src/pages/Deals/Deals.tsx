import React, { useState } from "react";

import AdvertModal, { AdvertType } from "./AdvertModal";
import DealsTableModal from "./DealsTableModal";
import MsgModal from "./MsgModal";
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
  const personInNeedHeader = [
    "Volonter",
    "Prijava volontera",
    "Vaša prijava",
    "Ugovor o volontiranju",
    "Potvrda volontiranja",
  ];
  const contentDummy = [
    {
      volunteerId: 0,
      volunteerName: "string",
      volunteerApplicationAdvert: {
        advertTitle: "string",
        location: "string",
        helpType: "string",
        time: "string",
        category: "string",
        description: "string",
        advertImage: "string",
        volunteerCenter: "string",
      },
      personInNeedMessage: "string",
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
      contractDetailsFulfilled: true,
      recensionFulfilled: true,
    },
    {
      volunteerId: 0,
      volunteerName: "string",
      volunteerApplicationMessage: "string",
      personInNeedMessage: "string",
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
      contractDetailsFulfilled: true,
      recensionFulfilled: true,
    },
    {
      volunteerId: 0,
      volunteerName: "string",
      volunteerApplicationMessage: "string",
      volunteerApplicationAdvert: {
        advertTitle: "string",
        location: "string",
        helpType: "string",
        time: "string",
        category: "string",
        description: "string",
        advertImage: "string",
        volunteerCenter: "string",
      },
      personInNeedMessage: "string",
      contractDetailsFulfilled: true,
      recensionFulfilled: true,
    },
  ];
  const [activeModal, setActiveModal] = useState("USER_NEED_MSG_MODAL");
  const [pagationFirst, setPagationFirst] = useState(true);
  const [pagationLast, setPagationLast] = useState(true);
  const [content, setContent] = useState<DealsContentType[]>([]);
  const [requestModalData, setRequestModalData] = useState<RequestType | null>(null);

  return (
    <div className="flex flex-row items-center justify-center">
      {activeModal === "USER_NEED_MSG_MODAL" && (
        <MsgModal
          name={"vaša poruka"}
          message={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
          }
          setActiveModal={setActiveModal}
        />
      )}
      {activeModal === "REQUEST_MODAL" && (
        <RequestModal
          request={{
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
          }}
          setActiveModal={setActiveModal}
        />
      )}
      {activeModal === "ADVERT_MODAL" && (
        <AdvertModal
          volunteer={"ime volontera"}
          advert={{
            advertTitle: "string",
            location: "string",
            helpType: "string",
            category: "string",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
            volunteerCenter: "string",
            time: "string",
          }}
          setActiveModal={setActiveModal}
        />
      )}
      {activeModal === "DEALS_TABLE" && (
        <DealsTableModal headerColumns={personInNeedHeader} content={contentDummy} setActiveModal={setActiveModal} />
      )}
    </div>
  );
}
