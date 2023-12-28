import React, { useContext } from "react";

import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useQuery } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { RequestTypeDeals } from "../../api/auth/IForm";
import MyRequestCard from "../../components/Card/MyRequestCard";
import CreateNewForm from "../../components/CreateNewForm/CreateNewForm";
import { AuthContext } from "../../context/AuthContext";
import "./myRequests.css";

export default function MyRequests() {
  const TEXT_STYLE = "font-bold text-emerald-900";

  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8080/api/my-requests/" + currentUser?.id);
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery("myRequests", fetchData, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const myError = error as Error;

  return (
    <>
      <div className={"myRequests flex w-full"}>
        <div className={"new-advert mx-7 my-12 flex w-1/2 flex-col"}>
          <div className={"mb-12 flex"}>
            <FontAwesomeIcon
              icon={faCirclePlus}
              className={"mx-4 h-10 w-10 rounded-full bg-orange-400 px-0 text-gray-100 shadow-lg"}
            />
            <div className={"make-new"}>
              <p className={"text-xl font-bold text-orange-400"}>Stvori svoj novi zahtjev za pomoć</p>
              <p className={TEXT_STYLE}>Potreban ti je volonter? Ispuni obrazac, a ostalo prepusti nama!</p>
            </div>
          </div>
          <CreateNewForm request={true} />
        </div>
        <div className={"new-request mx-7 my-12 flex w-2/5 flex-col"}>
          <div className={"ml-4 mt-0"}>
            <p className={"text-xl font-bold text-orange-400"}>Vaši zahtjev</p>
            <p className={TEXT_STYLE}>Svi Vaši do sada stvoreni zahtjevi na jednom mjestu.</p>
            <p className={"font-bold text-emerald-800"}>
              Pregledajte prijavljene volontere, njihove oglase i profile. Prihvatite ih ili odbijte.
            </p>
            <p className={"font-bold text-emerald-700"}>
              Više vam nisu potrebni volonteri za neku vrsu pomoći? Jednostavno obrišite svoj zahtjev.
            </p>
          </div>
          <div className={"requests-container flex flex-col-reverse"}>
            {isLoading && <div>Loading...</div>}
            {isError && <div>Error: {myError.message}</div>}
            {data &&
              data.map((request: RequestTypeDeals) => (
                <MyRequestCard
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
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
