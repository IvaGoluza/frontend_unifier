import React, { useState } from "react";
import "./AccordionCardAdvert.css";
import AccordionCardAdvertTSX from "./AccordionCardAdvertTSX";

interface UserRequest {
  requestId: number;
  requestTitle: string;
  category: string;
  helpType: string;
  archived: boolean;
}

interface Data {
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
  userRequests: UserRequest[];
  onSubmitApplication: (advertId: number, requestId: number | null, message: string, receiverId:number) => void;
  advertId: number;
  receiverId: number; 
  status: string;
}

const AccordionCard = ({
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
  userRequests,
  onSubmitApplication,
  advertId,
  receiverId,
  status,
}: Data) => {
  const [activeTab, setActiveTab] = useState("Info");
  const [message, setMessage] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState("");

  const openTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleSendApplication = () => {
    if (selectedRequestId || message) {
      onSubmitApplication(advertId, selectedRequestId ? parseInt(selectedRequestId) : null, message, receiverId);
    } else {
      alert("Please select a request or enter a message.");
    }
  };
  //const status = "Prijava";
  return (
    <div className="request-container relative m-5 h-64 overflow-hidden rounded-[18px] border bg-white shadow-xl md:max-w-xl">
      <AccordionCardAdvertTSX
        activeTab={activeTab}
        openTab={openTab}
        status={status}
        title={title}
        town={town}
        category={category}
        helpType={helpType}
        location={location}
        time={time}
        description={description}
        name={name}
        phoneNumber={phoneNumber}
        email={email}
        receiverId={receiverId}
      />

      <div id="Opis" className={`tabcontent ${activeTab === "Opis" && "active"} flex w-full p-5 transition-all duration-1000 ease-in-out ${activeTab === "Opis" ? "grid" : "hidden"} grid-cols-2 gap-10`}>
        <div>{description}</div>
      </div>

      <div id="Volonter" className={`tabcontent ${activeTab === "Volonter" && "active"} transition-all duration-1000 ease-in-out ${activeTab === "Volonter" ? "grid" : "hidden"} grid-cols-2 gap-10`}>
        <div className="Infoimage m-5 md:shrink-0 lg:col-span-1">
          <img src="../../../assets/images/optionsImages/profileImage.jpg" className="rounded-lg" />
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

      <div id="Prijava" className={`tabcontent ${activeTab === "Prijava" && "active"} prijava flex flex-col w-full h-full p-2 bg-[#E8F1F0]`}>
        <div className="text-[#07169B] font-semibold w-full">
          Želite se prijaviti na ovaj volonterski oglas?
        </div>
        <div className="text-[#07169B] font-normal">
          <div>Kao prijavu, volonteru pošaljite poruku:</div>
          <textarea name="poruka" className="w-full" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        </div>
        <div className="">
          <div className="text-[#07169B] font-normal">Ili odaberite neki od svojih zahtjeva za pomoć:</div>
          <select id="zahtjeviSelect" value={selectedRequestId} onChange={(e) => setSelectedRequestId(e.target.value)}>
            <option value="">Odaberite naslov zahtjeva</option>
            {userRequests.map((request) => (
              <option key={request.requestId} value={request.requestId}>{request.requestTitle}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end w-full">
          <button onClick={handleSendApplication} className="bg-[#09115B] text-white font-semibold py-1 px-8 rounded-lg border-4 border-[#43CEBD]">POŠALJI PRIJAVU</button>
        </div>
      </div>
    </div>
  );
};

export default AccordionCard;
