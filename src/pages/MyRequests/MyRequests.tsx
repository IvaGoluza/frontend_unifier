import React, { useState } from "react";

import "./MyRequests.css";
import CreateNewForm from "../../components/CreateNewForm/CreateNewForm";
import MyRequestsList from "../../components/MyRequestsList/MyRequestsList";

export default function MyRequests() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <>
      {!isFormVisible && (
        <div className={`my-request flex justify-center bg-[#1F2340]`}>
          <MyRequestsList toggleFormVisibility={toggleFormVisibility} />
        </div>
      )}
      {isFormVisible && (
        <div className={`my-request-form flex h-screen justify-center bg-white sm:bg-[#1F2340]`}>
          <CreateNewForm request={true} toggleFormVisibility={toggleFormVisibility} />
        </div>
      )}
    </>
  );
}
