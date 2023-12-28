import React from "react";

import InfoWithModal from "./InfoWithModal";
import { DealAdvertType } from "../../api/auth/IForm";
import NoteModal from "../Modals/NoteModal";

interface dealsDataType {
  advert: DealAdvertType;
  dealId: number;
}

export default function DealAdvertCard({ advert, dealId }: dealsDataType) {
  return (
    <div className="request-container w-min-w relative m-4 grid grid-cols-3 grid-rows-1 gap-4 rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-h-64 md:max-w-xl">
      <InfoWithModal
        title={advert.advert.advertTitle}
        town={advert.advert.town}
        user={advert.advert.user}
        helpType={advert.advert.helpType}
        category={advert.advert.category}
      />

      <div className="right-container col-span-2 flex flex-col justify-between">
        <p className="text-s">{advert.advert.description}</p>
        {!advert.accepted && (
          <div className="button-container">
            <button className="mx-3 rounded-3xl bg-gray-200 px-7 py-2 font-bold text-white">NA ČEKANJU</button>
          </div>
        )}
        {advert.accepted && (
          <div className="button-container">
            <NoteModal noteType={"recenzija"} dealId={dealId} />
          </div>
        )}
      </div>
      {!advert.accepted && (
        <img
          src="../../../assets/images/waiting.png"
          alt="waiting"
          className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full"
        />
      )}
    </div>
  );
}
