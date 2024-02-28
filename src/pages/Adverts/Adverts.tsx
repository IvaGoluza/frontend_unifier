import React, { useContext, useState } from "react";

import { useQuery } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { AdvertType } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import OpportunityCard from "../../components/Card/OpportunityCard";
import AdvertsFilter from "../../components/Filters/AdvertsFilter";
import { AuthContext } from "../../context/AuthContext";

export default function Adverts() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchAdverts = async () => {
    const response = await api.get("/request/my-requests/" + currentUser?.id);
    return response.data;
  };

  const {
    data: requests,
    isLoading: isLoadingA,
    isError: isErrorA,
    error: errorA,
  } = useQuery("requests", fetchAdverts, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!currentUser,
  });

  const myErrorA = errorA as Error;

  const fetchRequests = async () => {
    const response = await api.get("advert/all-adverts");
    return response.data;
  };

  const [filteredAdverts, setFilteredAdverts] = useState<AdvertType[]>([]);
  const { data, isLoading, isError, error } = useQuery("adverts", fetchRequests, {
    refetchOnMount: true,
    onSuccess: (data) => setFilteredAdverts(data),
  });

  const myError = error as Error;

  if (isLoading || isLoadingA) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {myError.message}</div>;
  }

  if (isErrorA) {
    return <div>Error: {myErrorA.message}</div>;
  }
  return (
    <>
      <img src="../../../assets/images/volunteer-chances.png" alt="helpRequests" className="h-full object-cover" />
      <div className="custom-container relative mt-0 pt-0">
        <AdvertsFilter data={data} setFilteredAdverts={setFilteredAdverts} />
        {filteredAdverts.map((advert: AdvertType) => (
          <OpportunityCard
            key={advert.id}
            id={advert.id}
            requestTitle={advert.advertTitle}
            user={advert.user}
            town={advert.town}
            category={advert.category}
            helpType={advert.helpType}
            description={advert.description}
            requests={requests}
          />
        ))}
      </div>
    </>
  );
}
