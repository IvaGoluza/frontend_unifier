import React from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CardInfo from "./CardInfo";
import InfoWithModal from "./InfoWithModal";
import { loggedInUserType } from "../../api/auth/IAuth";

interface BasicCardProps {
  id: number;
  title: string;
  association?: boolean;
  user: loggedInUserType;
  town: string;
  category: string;
  helpType: string;
  volunteerNum?: number;
  description: string;
  modal: boolean;
  deleteHandler?: (arg: number) => void;
}

export default function BasicCard({
  id,
  title,
  association,
  user,
  town,
  category,
  helpType,
  volunteerNum,
  description,
  modal,
  deleteHandler,
}: BasicCardProps) {
  return (
    <div className="request-container w-min-w relative m-4 grid grid-cols-3 grid-rows-1 gap-12 rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-h-64 md:max-w-xl">
      {deleteHandler && (
        <div className="border-gray absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2">
          <FontAwesomeIcon icon={faXmark} className="text-xl text-gray-300" onClick={() => deleteHandler(id)} />
        </div>
      )}
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
