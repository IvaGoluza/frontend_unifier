import { Dispatch, SetStateAction } from "react";

import { LoginCommand, RegisterUser, UserRegisterForm } from "./types";

export type loggedInUserType = {
  id: number;
  email: string;
  mobilePhone: string;
  role: string | undefined;
  userType: string | undefined;
  blocked: boolean;
  auth: {
    accessToken: string;
    refreshToken: string;
  }
};

export interface IAuth {
  currentUser: loggedInUserType | null;
  signup: (user: UserRegisterForm) => Promise<boolean>;
  login: (user: LoginCommand) => Promise<loggedInUserType | null>;
  logout: () => void;
  setCurrentUser: Dispatch<SetStateAction<loggedInUserType | null>>;
}
