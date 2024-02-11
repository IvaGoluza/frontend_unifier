import React, { useContext } from "react";

import "./profile.css";
import { IAuth } from "../../api/auth/IAuth";
import EditProfile from "../../components/EditProfile/EditProfile";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  return (
    <>
      <div className="profile-container flex min-h-screen items-center justify-center">
        <img src="../../../assets/images/profile_logo.png" alt="unifier-home" className="h-64 w-48" />
        <div
          className={"relative max-w-prose rounded bg-white px-10 py-6 text-xl font-semibold text-slate-700 shadow-lg"}
        >
          <div className={"absolute -bottom-12 right-0"}>
            <EditProfile />
          </div>
          <p className={"my-4"}>
            {/* eslint-disable-next-line sonarjs/no-duplicate-string */}
            <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>IME:</span>{" "}
            {'Dodati poziv'}
          </p>
          <p className={"my-4"}>
            <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>PREZIME:</span>{" "}
            {''}
          </p>
          <p className={"my-4"}>
            <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>EMAIL ADRESA:</span>{" "}
            {currentUser?.email}
          </p>
          <p className={"my-4"}>
            <span className={"mr-3 text-2xl font-bold tracking-wide text-emerald-900"}>BROJ MOBITELA:</span>{" "}
            {currentUser?.mobilePhone}
          </p>
          <p className={"my-4"}>
            <p className={"text-2xl font-bold tracking-wide text-emerald-900"}>OPIS PROFILA:</p>
            <p>{''}</p>
          </p>
        </div>
      </div>
    </>
  );
}
