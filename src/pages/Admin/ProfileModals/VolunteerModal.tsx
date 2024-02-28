import React, { ReactNode } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import "./volunteerModal.css";
import { useQuery } from "react-query";

import { loggedInUserType } from "../../../api/auth/IAuth";
import { RequestType } from "../../../api/auth/IForm";
import api from "../../../api/createAxiosClient";
import NoteModalCard from "../../../components/Notes/NoteModalCard";

interface RecensionType {
  id: number;
  recension: string;
  request: RequestType;
}

interface profileDataType {
  user: loggedInUserType;
  children: ReactNode;
}

const VolunteerModal = ({ user, children }: profileDataType) => {
  const fetchRecension = async () => {
    const response = await api.get("/profile/recension/" + user.id);
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
        <Dialog.Overlay className="DialogOverlayAdmin" />
        <Dialog.Content className="DialogContentUserAdmin">
          <Dialog.Title className="text-3xl font-semibold uppercase text-slate-400">VOLONTERSKI PROFIL</Dialog.Title>
          <div className={" max-w-prose px-10 text-xl font-semibold text-slate-700"}>
            <p className={"my-4"}>
              {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
              <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>IME:</span> {"Dodati poziv"}
            </p>
            <p className={"my-4"}>
              <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>PREZIME:</span> {""}
            </p>
            <p className={"my-4"}>
              <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>OIB:</span> {""}
            </p>
            <p className={"my-4"}>
              <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>EMAIL ADRESA:</span>{" "}
              {user.email}
            </p>
            <p className={"my-4"}>
              <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>BROJ MOBITELA:</span>{" "}
              {user.mobilePhone}
            </p>
            <p className={"my-4"}>
              <p className={"text-xl font-bold tracking-wide text-emerald-900"}>OPIS PROFILA:</p>
              <p>{""}</p>
            </p>
          </div>
          <p className={"my-4 px-10 text-2xl font-bold tracking-wide text-emerald-900"}>RECENZIJE:</p>
          <div>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {myError.message}</div>}
            {data &&
              data.map((rec: RecensionType) => (
                <NoteModalCard key={rec.id} text={rec.recension} email={rec.request.user.email} />
              ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default VolunteerModal;
