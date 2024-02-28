import React from "react";

import CardInfo from "./CardInfo";
import InfoWithModal from "./InfoWithModal";
import { loggedInUserType } from "../../api/auth/IAuth";

interface data {
  title: string;
  association?: boolean;
  user: loggedInUserType;
  town: string;
  category: string;
  helpType: string;
  description: string;
  volunteerNum?: number;
  modal: boolean;
}

export default function RequestInfo({
  title,
  association,
  user,
  town,
  category,
  helpType,
  description,
  volunteerNum,
  modal,
}: data) {
  return (
    <div className="top-container grid grid-cols-3 grid-rows-1 gap-4 pb-4">
      {modal && (
        <InfoWithModal
          title={title}
          town={town}
          user={user}
          association={association}
          helpType={helpType}
          category={category}
        />
      )}

      {!modal && (
        <CardInfo
          title={title}
          town={town}
          user={user}
          association={association}
          helpType={helpType}
          category={category}
        />
      )}

      <div className="right-container col-span-2 flex flex-col justify-between">
        <p className="text-s">{description}</p>
        {volunteerNum && (
          <div className="volNum-container">
            <span className="text-xl font-semibold text-violet-900">Broj potrebnih volontera: {volunteerNum}</span>
          </div>
        )}
      </div>
    </div>
  );
}
