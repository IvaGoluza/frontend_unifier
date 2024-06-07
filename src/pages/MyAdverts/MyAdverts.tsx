import React, { useState } from "react";

import "../MyRequests/myRequests.css";
import CreateNewAdvert from "../../components/MyAdvertsComponents/CreateNewAdvert";
import MyAdvertsList from "../../components/MyAdvertsComponents/MyAdvertsList";

export default function MyRequests() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      {!isFormVisible && (
        <div className={`my-request flex justify-center bg-[#1F2340]`}>
          <MyAdvertsList toggleFormVisibility={toggleFormVisibility} />
        </div>
      )}
      {isFormVisible && (
        <div className={`flex justify-center bg-white sm:bg-[#1F2340]`}>
          <CreateNewAdvert request={true} toggleFormVisibility={toggleFormVisibility} />
        </div>
      )}
    </>
  );
}
