import React, { createContext, useEffect, useState } from "react";

import axios from "axios";

import { loggedInUserType, IAuth } from "../api/auth/IAuth";
import { LoginCommand, RegisterUser } from "../api/auth/types";
import { backend_paths } from "../api/backend_paths";

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

    axios
      .post("http://localhost:8080/api/login", {
        email: regUser.email,
        password: regUser.password,
      })
      .then((res) => res.data)
      .then((data: loggedInUserType) => {
        if (data.blocked) setCurrentUser(null);
        else setCurrentUser(data);
      })
      .catch((err) => {
        setCurrentUser(null);
        localStorage.removeItem("user");
      });
  }, []);

  const signup = async (user: RegisterUser) => {
    try {
      const userResponse = await axios.post("http://localhost:8080/api/registration", user, {
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
      const userResponse = await axios.post("http://localhost:8080/api/login", user, {
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
