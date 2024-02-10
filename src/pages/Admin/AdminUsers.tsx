import React from "react";

import api from "../../api/createAxiosClient";
import { useQuery } from "react-query";

import { loggedInUserType } from "../../api/auth/IAuth";
import UserCard from "../../components/Card/UserCard";

export default function AdminUsers() {
  const fetchUsers = async () => {
    const response = await api.get("/api/users");
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(["allUsers"], fetchUsers, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{myError.message}</div>;
  }

  return (
    <div className="register min-h-screen">
      <div className="ml-3 mt-6 w-1/2">
        {data.map((user: loggedInUserType) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
      <img src="../../../assets/images/logoMulBack.png" alt="register" className="regImage opacity-70" />
    </div>
  );
}
