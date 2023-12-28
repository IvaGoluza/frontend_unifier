import React, { useContext, useState } from "react";

import axios from "axios";
import { useQuery } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { RequestTypeDeals } from "../../api/auth/IForm";
import OpportunityCard from "../../components/Card/OpportunityCard";
import RequestsFilter from "../../components/Filters/RequestsFilter";
import { AuthContext } from "../../context/AuthContext";

export default function HelpRequests() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchAdverts = async () => {
    const response = await axios.get("http://localhost:8080/api/my-adverts/" + currentUser?.id);
    return response.data;
  };

  const {
    data: adverts,
    isLoading: isLoadingA,
    isError: isErrorA,
    error: errorA,
  } = useQuery("adverts", fetchAdverts, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!currentUser,
  });

  const myErrorA = errorA as Error;

  const fetchRequests = async () => {
    const response = await axios.get("http://localhost:8080/api/opportunities");
    return response.data;
  };

  const [filteredRequests, setFilteredRequests] = useState<RequestTypeDeals[]>([]);
  const { data, isLoading, isError, error } = useQuery("opportunities", fetchRequests, {
    refetchOnMount: true,
    onSuccess: (data) => setFilteredRequests(data),
  });

  if (isLoading || isLoadingA) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  if (isErrorA) {
    return <div>Error: {myErrorA.message}</div>;
  }

  return (
    <>
      <img src="../../../assets/images/volunteer-chances.png" alt="helpRequests" className="h-full object-cover" />
      <div className="custom-container relative">
        <RequestsFilter data={data} setFilteredRequests={setFilteredRequests} />
        {filteredRequests.map((request: RequestTypeDeals) => (
          <OpportunityCard
            key={request.id}
            id={request.id}
            association={request.association}
            requestTitle={request.requestTitle}
            user={request.user}
            town={request.town}
            category={request.category}
            helpType={request.helpType}
            description={request.description}
            volunteerNum={request.volunteerNum}
            adverts={adverts}
          />
        ))}
      </div>
    </>
  );
}
