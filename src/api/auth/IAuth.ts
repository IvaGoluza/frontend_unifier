import { Dispatch, SetStateAction } from "react";

import { LoginCommand, RegisterUser } from "./types";

export type loggedInUserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  oib: string;
  profileDescription: string;
  role: string | undefined;
  userType: string | undefined;
  password: string;
  blocked: boolean;
  authToken: string;
  refreshToken: string;
};

export interface IAuth {
  currentUser: loggedInUserType | null;
  signup: (user: RegisterUser) => Promise<boolean>;
  login: (user: LoginCommand) => Promise<loggedInUserType | null>;
  logout: () => void;
  setCurrentUser: Dispatch<SetStateAction<loggedInUserType | null>>;
}
