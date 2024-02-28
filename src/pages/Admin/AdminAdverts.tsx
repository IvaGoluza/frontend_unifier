import React from "react";

import { useQuery, useQueryClient } from "react-query";

import { AdvertType } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import BasicCard from "../../components/Card/BasicCard";

export default function AdminAdverts() {
  const queryClient = useQueryClient();
  const fetchRequests = async () => {
    const response = await api.get("/advert/all-adverts");
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery("allAdverts", fetchRequests, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  function deleteHandler(id: number) {
    api
      .put("/advert/change-delete-status/" + id)
      .then(() => {
        queryClient.refetchQueries(["allAdverts"]);
        console.log("deleted" + id);
      })
      .catch((err) => console.log(err));
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {myError.message}</div>;
  }

  return (
    <div className="custom-container">
      {data.map((advert: AdvertType) => (
        <BasicCard
          key={advert.id}
          id={advert.id}
          title={advert.advertTitle}
          user={advert.user}
          town={advert.town}
          category={advert.category}
          helpType={advert.helpType}
          description={advert.description}
          modal={true}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
}
