import React, { useContext } from "react";

import api from "../../api/createAxiosClient";

import { useQuery } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { Deal } from "../../api/auth/IForm";
import RequestCard from "../../components/Card/RequestCard";
import { AuthContext } from "../../context/AuthContext";
import "./requests.css";

export default function Requests() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchRequests = async () => {
    const response = await api.get("/help-requests/" + currentUser?.id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery("help_requests", fetchRequests, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!currentUser,
  });

  const myError = error as Error;

  return (
    <>
      <img src="../../../assets/images/helpRequests1.png" alt="helpRequests" className="h-full object-cover" />
      <div className="custom-container">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {myError.message}</div>}
        {data &&
          data.map((deal: Deal) => (
            <RequestCard key={deal.id} id={deal.id} request={deal.request} advertTitle={deal.advert.advertTitle} />
          ))}
      </div>
    </>
  );
}
