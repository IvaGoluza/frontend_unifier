import React, { useContext } from "react";

import "./MyRequests2.css";
import CreateNewForm2 from "../../components/CreateNewForm2/CreateNewForm2";

export default function MyRequests2() {
  return (
    <>
      <div className="h-full mt-2 lg:mt-2 lg:mr-5 lg:ml-10">
        <CreateNewForm2 request={true} />
      </div>
    </>
  );
}
