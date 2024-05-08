import React, { useContext, useEffect, useState } from "react";

import AdvertModal, { AdvertType } from "./AdvertModal";
import CertificateForm from "./CertificateForm";
import ContractForm from "./ContractForm";
import DealsTableModal from "./DealsTableModal";
import MsgModal, { MessageType } from "./MsgModal";
import RequestModal, { RequestType } from "./RequestModal";
import { IAuth } from "../../api/auth/IAuth";
import api from "../../api/createAxiosClient";
import { AuthContext } from "../../context/AuthContext";

export interface DealsContentType {
  dealId: number;
  volunteerId: number;
  volunteerName: string;
  volunteerApplicationMessage?: string;
  volunteerApplicationAdvert?: AdvertType;
  personInNeedMessage?: string;
  personInNeedRequest?: RequestType;
  contractDetailsFulfilled: boolean;
  recensionFulfilled: boolean;
}

export interface DealsVolContentType {
  dealId: number;
  personInNeedName: string;
  volunteerApplicationMessage?: string;
  volunteerApplicationAdvert?: AdvertType;
  personInNeedMessage?: string;
  personInNeedRequest?: RequestType;
  reviewed: boolean;
  contractReady: boolean;
}

export interface DealType {
  dealId: number;
  volunteerId: number;
  volunteerName: string;
}

interface PaginationParams {
  page?: number;
  size?: number;
}

export default function Deals() {
  const personInNeedHeader = ["Volonter", "Prijava volontera", "Vaša prijava", "Ispunite dokumente"];
  const [activeModal, setActiveModal] = useState("DEALS_TABLE");
  const [paginationFirst, setPaginationFirst] = useState(true);
  const [paginationLast, setPaginationLast] = useState(true);
  const [content, setContent] = useState<DealsContentType[]>([]);
  const [contentVol, setContentVol] = useState<DealsVolContentType[]>([]);
  const [requestModalData, setRequestModalData] = useState<RequestType | undefined>(undefined);
  const [advertModalData, setAdvertModalData] = useState<AdvertType>();
  const [msgModalData, setMsgModalData] = useState<MessageType | undefined>(undefined);
  const [dealData, setDealData] = useState<DealType>();
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 0,
    size: window.innerWidth < 640 ? 3 : 10,
  });
  const { currentUser } = useContext(AuthContext) as IAuth;
  const userRole = currentUser !== null ? currentUser.userType : "NOT_LOGGED_IN";

  let userId = "";
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    userId = user.id;
  }

  const fetchData = async () => {
    try {
      let response;
      if (userRole === "PERSON_IN_NEED") {
        response = await api.get(`/deal/accepted-deals-person-in-need/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          params: paginationParams,
        });
        setContent(response.data.content);
      } else {
        response = await api.get(`/deal/accepted-deals-volunteer/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          params: paginationParams,
        });
        setContentVol(response.data.content);
      }
      setPaginationFirst(response.data.first);
      setPaginationLast(response.data.last);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (activeModal === "DEALS_TABLE") {
      fetchData().then();
    }
  }, [paginationParams, activeModal]);

  useEffect(() => {
    const handleResize = () => {
      setPaginationParams({
        ...paginationParams,
        size: window.innerWidth < 640 ? 3 : 10,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const paginationNext = () => {
    setPaginationParams((prevParams) => ({
      ...prevParams,
      page: (prevParams.page ?? 0) + 1,
    }));
  };

  const paginationPrev = () => {
    setPaginationParams((prevParams) => ({
      ...prevParams,
      page: (prevParams.page ?? 0) - 1,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {activeModal === "MESSAGE_MODAL" && <MsgModal message={msgModalData} setActiveModal={setActiveModal} />}
      {activeModal === "REQUEST_MODAL" && <RequestModal request={requestModalData} setActiveModal={setActiveModal} />}
      {activeModal === "ADVERT_MODAL" && (
        <AdvertModal volunteer={"ime volontera"} advert={advertModalData} setActiveModal={setActiveModal} />
      )}
      {activeModal === "CONTRACT_FORM" && <ContractForm setActiveModal={setActiveModal} dealData={dealData} />}
      {activeModal === "CERTIFICATE_FORM" && <CertificateForm setActiveModal={setActiveModal} dealData={dealData} />}
      {activeModal === "DEALS_TABLE" && userRole === "PERSON_IN_NEED" && (
        <DealsTableModal
          headerColumns={personInNeedHeader}
          contentPIN={content}
          setActiveModal={setActiveModal}
          setRequestModalData={setRequestModalData}
          setAdvertModalData={setAdvertModalData}
          setMsgModalData={setMsgModalData}
          setDealData={setDealData}
          paginationNext={paginationNext}
          paginationPrev={paginationPrev}
          paginationFirst={paginationFirst}
          paginationLast={paginationLast}
        />
      )}
      {activeModal === "DEALS_TABLE" && userRole !== "PERSON_IN_NEED" && (
        <DealsTableModal
          headerColumns={personInNeedHeader}
          contentVOL={contentVol}
          setActiveModal={setActiveModal}
          setRequestModalData={setRequestModalData}
          setAdvertModalData={setAdvertModalData}
          setMsgModalData={setMsgModalData}
          setDealData={setDealData}
          paginationNext={paginationNext}
          paginationPrev={paginationPrev}
          paginationFirst={paginationFirst}
          paginationLast={paginationLast}
        />
      )}
    </div>
  );
}
