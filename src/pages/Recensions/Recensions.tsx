import React, { useContext } from "react";

import { useQuery } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { RequestType } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import NoteProfileCard from "../../components/Notes/NoteProfileCard";
import { AuthContext } from "../../context/AuthContext";

interface RecensionType {
  id: number;
  recension: string;
  request: RequestType;
}

export default function Recensions() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchData = async () => {
    const response = await api.get("/profile/recensions/" + currentUser?.id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery("myRecensions", fetchData, {
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
            data.map((rec: RecensionType) => (
              <NoteProfileCard key={rec.id} text={rec.recension} email={rec.request.user.email} />
            ))}
        </div>
      </div>
    </>
  );
}
