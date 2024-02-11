import React, { useContext } from "react";

import api from "../../api/createAxiosClient";
import { useQuery } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { AdvertType } from "../../api/auth/IForm";
import NoteProfileCard from "../../components/Notes/NoteProfileCard";
import { AuthContext } from "../../context/AuthContext";

interface NoteType {
  id: number;
  note: string;
  advert: AdvertType;
}

export default function Notes() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchData = async () => {
    const response = await api.get("/profile/notes/" + currentUser?.id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery("myNotes", fetchData, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  return (
    <>
      <div className={"profile-container flex min-h-screen items-center justify-center"}>
        <img
          src="../../../assets/images/profile_logo.png"
          alt="unifier-home"
          className="sticky top-1/3 my-96 h-64 w-48 rounded-lg"
        />
        <div className={"max-w-prose px-10 py-16 text-xl font-semibold text-slate-700"}>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {myError.message}</div>}
          {data &&
            data.map((rec: NoteType) => <NoteProfileCard key={rec.id} text={rec.note} email={rec.advert.user.email} />)}
        </div>
      </div>
    </>
  );
}
