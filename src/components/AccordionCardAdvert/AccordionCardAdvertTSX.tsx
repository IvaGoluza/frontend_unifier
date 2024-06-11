import React from "react";
import { faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


interface AccordionCardAdvertProps {
  activeTab: string;
  openTab: (tabName: string) => void;
  status: string;
  title: string;
  town: string;
  category: string;
  helpType: string;
  location: string;
  time: string;
  description: string;
  name: string;
  phoneNumber: string;
  email: string;
  receiverId: number;
}

const AccordionCardAdvertTSX: React.FC<AccordionCardAdvertProps> = ({
  activeTab,
  openTab,
  status,
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
  receiverId
}) => {
  const getBorderClass = (tabName: string) => {
    return activeTab !== tabName ? "border-r-2" : "";
  };

  const getStatusTitle = (status: string): string => {
    switch (status) {
      case "Prijava":
        return "PRIJAVA";
      case "Na čekanju":
        return "NA ČEKANJU";
      case "Prijavljeno":
        return "PRIJAVLJENO";
      default:
        return "";
    }
  };

  const statusTitle = getStatusTitle(status);

  type Status = "Prijava" | "Na čekanju" | "Prijavljeno";

  const statusColors: Record<Status, string> = {
    Prijava: "",
    "Na čekanju": "bg-[#278B7F]",
    Prijavljeno: "bg-[#525AA2]"
  };

  const getStatusBackgroundColor = (status: Status): string => {
    return statusColors[status] || "bg-white";
  };

  const userString = localStorage.getItem("user");
  let senderId = null;
  if (userString) {
    const user = JSON.parse(userString);
    senderId = user.id;
  }
  const backgroundClass = getStatusBackgroundColor(status as Status);
  const isButtonDisabled = status === "Na čekanju" || status === "Prijavljeno" || receiverId == senderId;
  const isTextSmall = status === "Prijavljeno" ? "text-sm" : "";
  
   
  return (
    <>
      <div className="grid w-full grid-cols-4 place-items-center border-b-2 h-10">
        <button
          className={`tablinks ${activeTab === "Info" && "active"} w-full text-center h-full text-[#807D78]`}
          onClick={() => openTab("Info")}
        >
          <p data-title="Info" className={`${getBorderClass("Info")}`}>
            INFO
          </p>
        </button>

        <button
          className={`tablinks ${activeTab === "Opis" && "active"} w-full text-center h-full text-[#807D78]`}
          onClick={() => openTab("Opis")}
        >
          <p data-title="Opis" className={`${getBorderClass("Opis")}`}>
            OPIS
          </p>
        </button>
        <button
          className={`tablinks ${activeTab === "Volonter" && "active"} w-full text-center h-full text-[#807D78]`}
          onClick={() => openTab("Volonter")}
        >
          <p data-title="Volonter" className={`${getBorderClass("Volonter")}`}>
            VOLONTER
          </p>
        </button>
        <button
          className={`prijava ${activeTab === "Prijava" && "active"} w-full text-center h-full ${status === 'Prijava' ? "text-[#807D78]": "text-white"} ${backgroundClass} tablinks ${isTextSmall}`}
          onClick={() => openTab("Prijava")}
          disabled={isButtonDisabled}
        >
          <p data-title={statusTitle} className={isTextSmall}>{statusTitle}</p>
        </button>
      </div>
      <div
        id="Info"
        className={`tabcontent ${activeTab === "Info" && "active"} h-48 md:flex transition-all duration-1000 ease-in-out ${
          activeTab === "Info" ? "grid" : "hidden"
        } grid-cols-2 gap-10`}
      >
        <div className="Infoimage m-5 md:shrink-0 lg:col-span-1">
          <img
            src="../../../assets/images/optionsImages/education.png"
            className="rounded-lg"
          />
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
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{ marginRight: "5px" }}
            />
            {location}
          </div>
          <div className="infoDetails mb-5">
            <FontAwesomeIcon icon={faClock} style={{ marginRight: "5px" }} />
            {time}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccordionCardAdvertTSX;
