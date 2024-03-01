import React, { ReactNode } from "react";

import { faUser, faEnvelope, faPhone, faPaperPlane, faFeatherPointed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./userProfile.css";
import { useQuery } from "react-query";

import { loggedInUserType } from "../../api/auth/IAuth";
import { AdvertType, RequestType } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import BasicCard from "../Card/BasicCard";
import NoteModalCard from "../Notes/NoteModalCard";

interface RecensionType {
  id: number;
  recension: string;
  request: RequestType;
}

interface profileDataType {
  user: loggedInUserType;
  advert?: AdvertType;
  children: ReactNode;
}

const VolunteerProfile = ({ user, advert, children }: profileDataType) => {
  const fetchRecension = async () => {
    const response = await api.get("/profile/recensions/" + user.id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(["recensions", user.id], fetchRecension, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContentUser">
          <Dialog.Title className="text-3xl font-semibold uppercase text-emerald-900">VOLONTERSKI PROFIL</Dialog.Title>
          <div className="flex justify-between">
            <div className="my-5 flex w-fit flex-col rounded-sm">
              <div>
                <FontAwesomeIcon icon={faUser} className="mx-2 text-emerald-900" />
                Treba napraviti poziv
              </div>
              <div>
                <FontAwesomeIcon icon={faEnvelope} className="mx-2 text-emerald-900" />
                {user.email}
              </div>
              <div>
                <FontAwesomeIcon icon={faPhone} className="mx-2 text-emerald-900" />
                {user.mobilePhone}
              </div>
            </div>
            <div className="w-1/2 text-center italic text-gray-700">{""}</div>
          </div>
          <div className="mt-10">
            <hr className="border-t-2" />
            <p className="mt-4 font-bold text-emerald-900">
              <FontAwesomeIcon icon={faFeatherPointed} className="mx-2 text-emerald-900" />
              Recenzije volontera
            </p>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {myError.message}</div>}
            {data &&
              data.map((rec: RecensionType) => (
                <NoteModalCard key={rec.id} text={rec.recension} email={rec.request.user.email} />
              ))}
            {data && data.length === 0 && (
              <p className="ml-8">Volonterov rad još nije procijenjen od strane korisnika.</p>
            )}
          </div>
          {advert && (
            <div className="mt-10">
              <hr className="border-t-2" />
              <p className="mt-4 font-bold text-emerald-900">
                <FontAwesomeIcon icon={faPaperPlane} className="mx-2 text-emerald-900" />
                Prijavljeni volonterski oglas
              </p>
              <BasicCard
                id={advert.id}
                title={advert.advertTitle}
                user={advert.user}
                town={advert.town}
                category={advert.category}
                helpType={advert.helpType}
                description={advert.description}
                modal={false}
              />
            </div>
          )}
          <Dialog.Close asChild>
            <button className="IconButton bg-white" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default VolunteerProfile;
