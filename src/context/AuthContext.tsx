import React, { createContext, useEffect, useState } from "react";

import { loggedInUserType, IAuth } from "../api/auth/IAuth";
import { LoginCommand, RegisterUser, UserRegisterForm } from "../api/auth/types";

import api from "../api/createAxiosClient";

export const AuthContext = createContext<IAuth | null>(null);

type AuthProp = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: AuthProp) {
  const [currentUser, setCurrentUser] = useState<loggedInUserType | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user === null) {
      setCurrentUser(null);
      return;
    }

    const regUser: loggedInUserType = JSON.parse(user);
    setCurrentUser(regUser);

    //TODO:Ti si ovdje slala password ali on je u hash obliku

    // api
    //   .post("/auth/login", {
    //     email: regUser.email,
    //     password: regUser.password,
    //   })
    //   .then((res) => res.data)
    //   .then((data: loggedInUserType) => {
    //     if (data.blocked) setCurrentUser(null);
    //     else setCurrentUser(data);
    //   })
    //   .catch((err) => {
    //     setCurrentUser(null);
    //     localStorage.removeItem("user");
    //   });
  }, []);

  const signup = async (user: UserRegisterForm) => {
    const personRequest: RegisterUser = {
      baseUserDetails: {
        email: user.email,
        userType: user.userType,
        password: user.password,
        controlPassword: user.controlPassword,
        mobilePhone: user.mobilePhone
      },
      firstName: user.firstName,
      lastName: user.lastName,
    };
    try {
      const userResponse = await api.post("/auth/person-registration", personRequest, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCurrentUser(userResponse.data);
      localStorage.setItem("user", JSON.stringify(userResponse.data));
    } catch (e) {
      return false;
    }
    return true;
  };

  const login = async (user: LoginCommand) => {
    try {
      const userResponse = await api.post("/auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: loggedInUserType = userResponse.data;
      return data;
    } catch (e) {
      return null;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    setCurrentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
