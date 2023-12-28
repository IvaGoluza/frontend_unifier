import React from "react";

import { loggedInUserType } from "../../api/auth/IAuth";
import UserProfile from "../Modals/UserProfile";
import VolunteerProfile from "../Modals/VolunteerProfile";

interface info {
  title: string;
  association?: boolean;
  town: string;
  category: string;
  helpType: string;
  user: loggedInUserType;
}

export default function InfoWithModal({ title, association, town, category, helpType, user }: info) {
  const translateCategory = (category: string): string => {
    switch (category) {
      case "CHILDREN":
        return "DJECA/MLADI";
      case "SPECIAL_NEEDS":
        return "POSEBNE POTREBE";
      case "ELDERLY":
        return "STARIJI";
      case "FAMILY":
        return "POMOĆ OBITELJI";
      default:
        return "";
    }
  };

  const translateHelpType = (helpType: string): string => {
    switch (helpType) {
      case "HEALTH":
        return "ZDRAVLJE";
      case "EDUCATION":
        return "OBRAZOVANJE";
      case "WORKSHOPS":
        return "RADIONICE";
      case "SUPPORT":
        return "DONACIJE";
      case "REPAIRS":
        return "POPRAVCI";
      case "REST":
        return "OSTALO";
      default:
        return "";
    }
  };
  return (
    <div className="left-container grid grid-cols-1 grid-rows-3">
      <div>
        <span className="text-xl font-bold text-violet-900">{title}</span>
        {association !== null && association && <p className="font-semibold text-violet-900">udruga</p>}
      </div>
      {user.userType !== "VOLUNTEER" && (
        <UserProfile user={user}>
          <div className="contact-info truncate font-semibold text-emerald-900">
            <p className="hover:text-lg">{user.email}</p>
            <p>{user.mobilePhone}</p>
          </div>
        </UserProfile>
      )}
      {user.userType === "VOLUNTEER" && (
        <VolunteerProfile user={user}>
          <div className="contact-info truncate font-semibold text-emerald-900">
            <p className="hover:text-lg">{user.email}</p>
            <p>{user.mobilePhone}</p>
          </div>
        </VolunteerProfile>
      )}
      <div className="categories-info font-bold text-emerald-900">
        <p>{town}</p>
        <p>{translateCategory(category)}</p>
        <p>{translateHelpType(helpType)}</p>
      </div>
    </div>
  );
}
