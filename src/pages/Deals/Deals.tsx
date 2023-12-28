import React, { useContext } from "react";

import axios from "axios";
import { nanoid } from "nanoid";
import { useQuery } from "react-query";

import { IAuth } from "../../api/auth/IAuth";
import { DealAdvertType, DealRequestType } from "../../api/auth/IForm";
import DealAdvertCard from "../../components/Card/DealAdvertCard";
import DealRequestCard from "../../components/Card/DealRequestCard";
import DealsText from "../../components/Card/DealsText";
import { AuthContext } from "../../context/AuthContext";

export default function Deals() {
  const { currentUser } = useContext(AuthContext) as IAuth;

  const fetchDealsRequests = async () => {
    let response;
    if (currentUser?.userType === "VOLUNTEER")
      response = await axios.get("http://localhost:8080/api/my-deals-requests/" + currentUser?.id);
    else if (currentUser?.userType !== "VOLUNTEER")
      response = await axios.get("http://localhost:8080/api/my-deals-adverts/" + currentUser?.id);
    return response?.data;
  };

  const { data, isLoading, isError, error } = useQuery("deals-adverts", fetchDealsRequests, {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!currentUser,
  });

  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error}</>;

  return (
    <>
      <div className={"relative"}>
        <img src="../../../assets/images/deals1.png" alt="helpRequests" className="h-full object-cover" />
        {currentUser?.userType === "VOLUNTEER" && (
          <DealsText
            h1={"NE ZABORAVI SVOJE"}
            h2={"VOLONTERSKE PRILIKE"}
            p1={"+ sve već dogovorene akcije pružanja pomoći"}
            p2={"+ akcije na koje ste ste prijavili, ali ste još na čekanju"}
            p3={"O onima kojima ste već pružili pomoć napišite neke korisne informacije"}
            p4={"za druge volontere koji će im pomagati u budućnosti."}
          />
        )}
        {currentUser?.userType !== "VOLUNTEER" && (
          <DealsText
            h1={"VAŠI"}
            h2={"VOLONTERI"}
            p1={"+ oglasi volontera s kojima ste dogovorili pomoć"}
            p2={"+ oglasi na koje ste prijavljeni, ali volonter još nije potvrdio pomoć"}
            p3={"Napišite recenzije volontera koji su Vam već pomogli"}
            p4={"kako bi i ostali upoznali njihov rad."}
          />
        )}
      </div>
      <div className="custom-container">
        {data &&
          currentUser?.userType === "VOLUNTEER" &&
          data.map((deal: DealRequestType) => <DealRequestCard key={nanoid()} request={deal} dealId={deal.id} />)}
        {data &&
          currentUser?.userType !== "VOLUNTEER" &&
          data.map((deal: DealAdvertType) => <DealAdvertCard key={nanoid()} advert={deal} dealId={deal.id} />)}
      </div>
    </>
  );
}
