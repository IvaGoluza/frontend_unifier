import React, { useState } from "react";
import { faHeart, faCircleXmark, faLocationDot, faClock, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/createAxiosClient";
import "./AccordionCard.css";

interface Data {
  dealId: number;
  title: string;
  town: string;
  category: string;
  helpType: string;
  location: string;
  time: string;
  description: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const AccordionCard = ({
  dealId,
  title,
  town,
  category,
  helpType,
  location,
  time,
  description,
  name,
  phoneNumber,
  email,
}: Data) => {
  const [activeTab, setActiveTab] = useState("Info");
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
    <div className="request-container relative m-5 h-64 overflow-hidden rounded-[18px] border bg-white shadow-xl md:max-w-xl z-10">
      <div className="grid w-full grid-cols-4 place-items-center h-10 border-b-2">
        <button
          className={`tablinks ${activeTab === "Info" && "active"} w-full text-center h-full text-[#807D78]`}
          onClick={() => openTab("Info")}
        >
          <p className={`${getBorderClass("Info")}`} data-title="Info">
            INFO
          </p>
        </button>
        <button
          className={`tablinks ${activeTab === "Opis" && "active"} w-full text-center h-full text-[#807D78]`}
          onClick={() => openTab("Opis")}
        >
          <p className={`${getBorderClass("Opis")}`} data-title="Opis">
            OPIS
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

      <div
        id="Info"
        className={`tabcontent ${activeTab === "Info" && "active"} h-48 md:flex transition-all duration-1000 ease-in-out ${activeTab === "Info" ? "grid" : "hidden"} grid-cols-2 gap-10`}
      >
        <div className="Infoimage m-5 md:shrink-0 lg:col-span-1">
          <img src="../../../assets/images/optionsImages/education.png" className="rounded-lg" alt="Education" />
        </div>
        <div className="mt-3 grid grid-cols-1 grid-rows-4 md:max-h-48 lg:col-span-1 ">
          <div className="infoTitle text-[#8278F8] text-[1.5vh] uppercase font-bold">{title}</div>
          <div className="infoDetails row-span-2">
            <div className="infoDetails row-span-2">
              <div className="item">{category}</div>
              <div className="item helptype">{helpType}</div>
              <div className="item town">{town}</div>
            </div>
          </div>
          <div className="infoDetails row-span-0.5 mt-2">
            <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "5px" }} />
            {location}
          </div>
          <div className="infoDetails mb-5">
            <FontAwesomeIcon icon={faClock} style={{ marginRight: "5px" }} />
            {time}
          </div>
        </div>
      </div>

      <div
        id="Opis"
        className={`tabcontent ${activeTab === "Opis" && "active"} flex w-full p-5 transition-all duration-1000 ease-in-out ${activeTab === "Opis" ? "grid" : "hidden"} grid-cols-2 gap-10`}
      >
        <div>{description} </div>
      </div>

      <div
        id="Volonter"
        className={`tabcontent ${activeTab === "Volonter" && "active"} transition-all duration-1000 ease-in-out ${activeTab === "Volonter" ? "grid" : "hidden"} grid-cols-2 gap-10`}
      >
        <div className="Infoimage m-5 md:shrink-0 lg:col-span-1">
          <img src="../../../assets/images/optionsImages/profileImage.jpg" className="rounded-lg" alt="Profile" />
        </div>
        <div className="mt-3 grid grid-cols-1 grid-rows-4 md:max-h-48 md:max-w-2xl lg:col-span-1">
          <div className="infoTitle text-[#8278F8] text-[1.5vh] uppercase font-bold span-2">{name}</div>
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

export default AccordionCard;
