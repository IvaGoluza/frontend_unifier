import React from "react";

import { useQuery, useQueryClient } from "react-query";

import { RequestTypeDeals } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import BasicCard from "../../components/Card/BasicCard";

export default function AdminRequests() {
  const queryClient = useQueryClient();
  const fetchRequests = async () => {
    const response = await api.get("/request/all-requests");
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery("allRequests", fetchRequests, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  function deleteHandler(id: number) {
    api
      .put("/request/change-delete-status/" + id)
      .then(() => {
        queryClient.refetchQueries(["allRequests"]);
        console.log("deleted" + id);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="custom-container">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {myError.message}</div>}
      {data &&
        data.map((request: RequestTypeDeals) => (
          <BasicCard
            key={request.id}
            id={request.id}
            title={request.requestTitle}
            association={request.association}
            user={request.user}
            town={request.town}
            category={request.category}
            helpType={request.helpType}
            volunteerNum={request.volunteerNum}
            description={request.description}
            modal={true}
            deleteHandler={deleteHandler}
          />
        ))}
    </div>
  );
}
