import React from "react";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/createAxiosClient";
import { nanoid } from "nanoid";
import { useQueryClient, useQuery, useMutation } from "react-query";

import HeartxTitle from "./HeartxTitle";
import RequestInfo from "./RequestInfo";
import { loggedInUserType } from "../../api/auth/IAuth";
import { Deal } from "../../api/auth/IForm";

interface dataType {
  id: number;
  association: boolean;
  requestTitle: string;
  user: loggedInUserType;
  town: string;
  category: string;
  helpType: string;
  description: string;
  volunteerNum: number;
}

export default function MyRequestCard({
  id,
  association,
  requestTitle,
  user,
  town,
  category,
  helpType,
  description,
  volunteerNum,
}: dataType) {
  const queryClient = useQueryClient();

  function deleteFunction() {
    api
      .put("/request/my-requests/" + id)
      .then(() => {
        queryClient.refetchQueries(["myRequests"]);
        console.log("deleted" + id);
      })
      .catch((err) => console.log(err));
  }

  const fetchDealsForRequest = async () => {
    const response = await api.get("/deal/all-deals/" + id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(["opportunities", id], fetchDealsForRequest, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  return (
    <div className="request-container w-min-w relative m-4 flex h-fit flex-col  rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-w-xl">
      <div className="border-gray absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2">
        <FontAwesomeIcon icon={faXmark} className="text-xl text-gray-300" onClick={deleteFunction} />
      </div>
      <RequestInfo
        title={requestTitle}
        association={association}
        user={user}
        town={town}
        category={category}
        helpType={helpType}
        description={description}
        volunteerNum={volunteerNum}
        modal={false}
      />
      <div className="bottom-container col-span-3 h-fit">
        <hr className="h-1 bg-gray-50 shadow-lg" />
        <p className="my-3 text-center font-bold text-violet-900">Oglasi prijavljenih volontera</p>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {myError.message}</div>}
        {data && data.length === 0 && <p className="my-3 text-center text-violet-900">Još nema prijava</p>}
        {data && data.length !== 0 && data.map((deal: Deal) => <HeartxTitle key={nanoid()} id={id} deal={deal} />)}
      </div>
    </div>
  );
}
