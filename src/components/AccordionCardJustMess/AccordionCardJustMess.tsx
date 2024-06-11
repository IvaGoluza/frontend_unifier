import React, { useState } from "react";
import { faHeart, faCircleXmark, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/createAxiosClient"; // Import your API client here
import "./AccordionCardJustMess.css";
import "../AccordionCard/AccordionCard.css";

interface Data {
  message: string;
  name: string;
  email: string;
  phoneNumber: string;
  dealId: number; // Add dealId to the interface
}

const AccordionCardJustMess = ({ message, name, phoneNumber, email, dealId }: Data) => {
  const [activeTab, setActiveTab] = useState("Poruka");
  const [showCircleCheck, setShowCircleCheck] = useState(false);

  const handleAccept = async () => {
    try {
      await api.put(`/deal/accepted/${dealId}`);
      setShowCircleCheck(true);
    } catch (error) {
      console.error("Error accepting the deal:", error);
    }
  };

  const handleReject = async () => {
    try {
      await api.delete(`/deal/${dealId}`);
      setShowCircleCheck(true);
    } catch (error) {
      console.error("Error rejecting the deal:", error);
    }
  };

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };
  const getBorderClass = (tabName: string) => {
    return activeTab !== tabName ? "border-r-2" : "";
  };

  return (
    <div className="request-container relative m-5 h-64 overflow-hidden rounded-[18px] border bg-white shadow-xl md:max-w-xl">
      <div className="grid w-full grid-cols-3 place-items-center border-b-2 h-10">
        <button
          className={`tablinks ${activeTab === "Poruka" && "active"} w-full text-center h-full text-[#807D78]`}
          onClick={() => openTab("Poruka")}
        >
          <p className={`${getBorderClass("Poruka")}`} data-title="Poruka">
            PORUKA
          </p>
        </button>
        <button
          className={`tablinks ${activeTab === "Volonter" && "active"} w-full text-center h-full text-[#807D78]`}
          onClick={() => openTab("Volonter")}
        >
          <p className={`${getBorderClass("Volonter")}`} data-title="Volonter">
            VOLONTER
          </p>
        </button>
        <div>
          {showCircleCheck ? (
            <FontAwesomeIcon className="px-2 text-2xl" icon={faCircleCheck} style={{ color: "#63E6BE" }} />
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <div onClick={handleAccept}>
                <FontAwesomeIcon icon={faHeart} className="px-2 text-xl text-green-500 hover:text-green-900" />
              </div>
              <div onClick={handleReject}>
                <FontAwesomeIcon icon={faCircleXmark} className="text-xl text-red-500 hover:text-red-900" />
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="Poruka" className={`tabcontent ${activeTab === "Poruka" && "active"} flex w-full p-5`}>
        <div>{message} </div>
      </div>

      <div id="Volonter" className={`tabcontent ${activeTab === "Volonter" && "active"}`}>
        <div className="Infoimage m-5 md:shrink-0 lg:col-span-1">
          <img src="../../../assets/images/optionsImages/profileImage.jpg" className="rounded-lg" alt="Profile" />
        </div>
        <div className="mt-3 grid grid-cols-1 grid-rows-4 md:max-h-48 md:max-w-2xl lg:col-span-1">
          <div className="infoTitle span-2">{name}</div>
          <div id="gmail" className="infoDetails row-span-0.5 mt-5">
            {email}
          </div>
          <div className="infoDetails mb-5">{phoneNumber}</div>
          <button className="volonterGumb">profil</button>
        </div>
      </div>
    </div>
  );
};

export default AccordionCardJustMess;
