import React, { useEffect, useState } from "react";

import AdvertModal, { AdvertType } from "./AdvertModal";
import CertificateForm from "./CertificateForm";
import ContractForm from "./ContractForm";
import DealsTableModal from "./DealsTableModal";
import MsgModal, { MessageType } from "./MsgModal";
import RequestModal, { RequestType } from "./RequestModal";
import api from "../../api/createAxiosClient";

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
  const [requestModalData, setRequestModalData] = useState<RequestType | undefined>(undefined);
  const [advertModalData, setAdvertModalData] = useState<AdvertType | undefined>(undefined);
  const [msgModalData, setMsgModalData] = useState<MessageType | undefined>(undefined);
  const [dealId, setDealId] = useState<number>();
  const [paginationParams, setPaginationParams] = useState<PaginationParams>({
    page: 0,
    size: window.innerWidth < 640 ? 3 : 10,
  });

  let userId = "";
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    userId = user.id;
  }

  const fetchData = async () => {
    try {
      const response = await api.get(`/deal/accepted-deals-person-in-need/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: paginationParams,
      });
      console.log(response.data);
      setContent(response.data.content);
      setPaginationFirst(response.data.first);
      setPaginationLast(response.data.last);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, [paginationParams]);

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
      {activeModal === "CONTRACT_FORM" && <ContractForm setActiveModal={setActiveModal} dealId={dealId} />}
      {activeModal === "CERTIFICATE_FORM" && <CertificateForm setActiveModal={setActiveModal} />}
      {activeModal === "DEALS_TABLE" && (
        <DealsTableModal
          headerColumns={personInNeedHeader}
          content={content}
          setActiveModal={setActiveModal}
          setRequestModalData={setRequestModalData}
          setAdvertModalData={setAdvertModalData}
          setMsgModalData={setMsgModalData}
          setDealId={setDealId}
          paginationNext={paginationNext}
          paginationPrev={paginationPrev}
          paginationFirst={paginationFirst}
          paginationLast={paginationLast}
        />
      )}
    </div>
  );
}
