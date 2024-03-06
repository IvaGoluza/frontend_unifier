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
    <div className="flex justify-center items-center my-request">
      {!isFormVisible && <MyRequestList toggleFormVisibility={toggleFormVisibility} />}
      {isFormVisible && <CreateNewForm2 request={true} toggleFormVisibility={toggleFormVisibility} />}

    </div>
  );
}
