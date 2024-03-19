import React, { useState } from "react";

import "./MyRequests2.css";
import CreateNewForm2 from "../../components/CreateNewForm2/CreateNewForm2";
import MyRequestList from "../../components/MyRequestList/MyRequestList";

export default function MyRequests2() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      {!isFormVisible && (
        <div className={`my-request flex justify-center bg-[#1F2340]`}>
          <MyRequestList toggleFormVisibility={toggleFormVisibility} />
        </div>
      )}
      {isFormVisible && (
        <div className={`my-request-form flex h-screen justify-center bg-white sm:bg-[#1F2340]`}>
          <CreateNewForm2 request={true} toggleFormVisibility={toggleFormVisibility} />
        </div>
      )}
    </>
  );
}
