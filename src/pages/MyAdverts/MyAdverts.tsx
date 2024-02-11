import React, { useContext } from "react";

import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/createAxiosClient";
import { useQuery, useQueryClient } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { AdvertType } from "../../api/auth/IForm";
import BasicCard from "../../components/Card/BasicCard";
import CreateNewForm from "../../components/CreateNewForm/CreateNewForm";
import { AuthContext } from "../../context/AuthContext";
import "./myAdverts.css";

export default function MyAdverts() {
  const queryClient = useQueryClient();
  const TEXT_STYLE = "font-bold text-emerald-900";

  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchData = async () => {
    const response = await api.get("/advert/my-adverts/" + currentUser?.id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery(["myAdverts"], fetchData, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  function deleteHandler(id: number) {
    api
      .put("/advert/change-delete-status/" + id)
      .then(() => {
        queryClient.refetchQueries(["myAdverts"]);
        console.log("deleted" + id);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className={"myAdverts flex w-full"}>
        <div className={"new-advert mx-7 my-12 flex w-1/2 flex-col"}>
          <div className={"mb-6 flex"}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={"mx-4 h-10 w-10 rounded-full bg-orange-400 px-0 text-gray-100 shadow-lg"}
            />
            <div className={"make-new"}>
              <p className={"text-xl font-bold text-orange-400"}>Stvori svoj novi oglas</p>
              <p className={TEXT_STYLE}>Tražiš priliku za pomoć? Ispuni obrazac, a ostalo prepusti nama!</p>
            </div>
          </div>
          <CreateNewForm />
        </div>
        <div className={"new-advert mx-7 my-12 flex w-2/5 flex-col"}>
          <div className={"ml-4"}>
            <p className={"text-xl font-bold text-orange-400"}>Vaši oglasi</p>
            <p className={TEXT_STYLE}>Svi Vaši do sada stvoreni oglasi na jednom mjestu.</p>
            <p className={TEXT_STYLE}>Više ne možete pružiti neku pomoć? Jednostavno obrišite svoj oglas.</p>
          </div>
          <div className={"adverts-container flex flex-col-reverse"}>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {myError.message}</div>}
            {data &&
              data.map((advert: AdvertType) => (
                <BasicCard
                  key={advert.id}
                  id={advert.id}
                  title={advert.advertTitle}
                  user={advert.user}
                  town={advert.town}
                  category={advert.category}
                  helpType={advert.helpType}
                  description={advert.description}
                  modal={false}
                  deleteHandler={deleteHandler}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
