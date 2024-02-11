import React, { useState } from "react";

import api from "../../api/createAxiosClient";

import toast from "react-hot-toast";
import { useMutation } from "react-query";

import RequestInfo from "./RequestInfo";
import { loggedInUserType } from "../../api/auth/IAuth";
import { AdvertType, RequestType } from "../../api/auth/IForm";

interface data {
  id: number;
  association?: boolean;
  requestTitle: string;
  user: loggedInUserType;
  town: string;
  category: string;
  helpType: string;
  description: string;
  volunteerNum?: number;
  adverts?: AdvertType[];
  requests?: RequestType[];
}

interface DealType {
  sender: string;
  requestId: number;
  advertId: number;
}

export default function OpportunityCard({
  id,
  association,
  requestTitle,
  user,
  town,
  category,
  helpType,
  description,
  volunteerNum,
  adverts,
  requests,
}: data) {
  const [selectedAdvert, setSelectedAdvert] = useState("");

  const createInstance = async (data: DealType) => {
    const response = await api.post("/deal", data);
    return response.data;
  };

  const createMutation = useMutation(createInstance, {
    onSuccess: () => {
      toast.success("Vaš zahtjev je poslan!", {
        position: "bottom-center",
        duration: 3000,
        className: "scale-125",
      });
    },
  });

  const createDeal = () => {
    if (adverts) {
      createMutation.mutate({
        sender: "ADVERT",
        requestId: id,
        advertId: parseInt(selectedAdvert),
      });
    } else {
      createMutation.mutate({
        sender: "REQUEST",
        requestId: parseInt(selectedAdvert),
        advertId: id,
      });
    }
  };

  return (
    <div className="request-container w-min-w md:m-w-xl m-4 flex h-fit flex-col rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50">
      {adverts && (
        <RequestInfo
          title={requestTitle}
          association={association}
          user={user}
          town={town}
          category={category}
          helpType={helpType}
          description={description}
          volunteerNum={volunteerNum}
          modal={true}
        />
      )}
      {requests && (
        <RequestInfo
          title={requestTitle}
          user={user}
          town={town}
          category={category}
          helpType={helpType}
          description={description}
          modal={true}
        />
      )}
      <div className="bottom-container col-span-3 flex flex-row items-start justify-around border-t-4 border-gray-100">
        <div>
          <p className="my-3 font-semibold text-violet-900">Oglas s kojim se želim prijaviti</p>
          <select
            value={selectedAdvert}
            className="regInput"
            onChange={(event) => setSelectedAdvert(event.target.value)}
          >
            <option>Odaberite oglas</option>
            {adverts &&
              adverts.map((advert) => (
                <option key={advert.id} value={advert.id}>
                  {advert.advertTitle}
                </option>
              ))}
            {requests &&
              requests.map((request) => (
                <option key={request.id} value={request.id}>
                  {request.requestTitle}
                </option>
              ))}
          </select>
        </div>
        <button
          className="mx-3 mt-8 rounded-3xl bg-orange-500 px-7 py-3 font-bold text-white hover:bg-orange-300"
          onClick={createDeal}
        >
          PRIJAVA
        </button>
      </div>
    </div>
  );
}
