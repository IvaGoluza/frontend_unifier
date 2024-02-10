import React, { ReactNode } from "react";

import { faUser, faEnvelope, faPhone, faFeatherPointed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

import "./userProfile.css";

import { useQuery } from "react-query";

import { loggedInUserType } from "../../api/auth/IAuth";
import { AdvertType } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import NoteModalCard from "../Notes/NoteModalCard";

interface NoteType {
  id: number;
  note: string;
  advert: AdvertType;
}

interface profileDataType {
  user: loggedInUserType;
  children: ReactNode;
}

const UserProfile = ({ user, children }: profileDataType) => {
  const fetchNotes = async () => {
    const response = await api.get("/profile/note/" + user.id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(["notes", user.id], fetchNotes, {
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
          <Dialog.Title className="text-3xl font-semibold uppercase text-emerald-900">korisnički profil</Dialog.Title>
          <div className="flex justify-between">
            <div className="my-5 flex w-2/5 flex-col rounded-sm">
              <div>
                <FontAwesomeIcon icon={faUser} className="mx-2 text-emerald-900" />
                {user.firstName} {user.lastName}
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
            <div className="w-1/2 text-center italic text-gray-700">{user.profileDescription}</div>
          </div>
          <div className="mt-10">
            <hr className="border-t-2" />
            <p className="mt-4 font-bold text-emerald-900">
              <FontAwesomeIcon icon={faFeatherPointed} className="mx-2 text-emerald-900" />
              Napomene za volontere
            </p>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {myError.message}</div>}
            {data &&
              data.map((rec: NoteType) => <NoteModalCard key={rec.id} text={rec.note} email={rec.advert.user.email} />)}
            {data && data.length === 0 && <p className="pl-8">Za korisnika trenutno nisu dostupne napomene.</p>}
          </div>

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

export default UserProfile;
