import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCircleXmark, faLocationDot, faClock, faCircleCheck } from '@fortawesome/free-solid-svg-icons';

import "./AccordionCardJustMess.css";

import "../AccordionCard/AccordionCard.css";

interface Data {
   message: string;
   name: string;
   email: string;
   phoneNumber: string;
}

const AccordionCardJustMess = ({ message, name, phoneNumber, email }: Data) => {
   const [activeTab, setActiveTab] = useState("Poruka");
   const [showCircleCheck, setShowCircleCheck] = useState(false);

   const handleClick = () => {
      setShowCircleCheck(!showCircleCheck);
   };

   const openTab = (tabName: string) => {
      setActiveTab(tabName);
   };

   return (
      <div className="request-container h-64 relative m-5 rounded-[18px] border bg-white pt-2 shadow-xl overflow-hidden md:max-w-xl">
         <div className="w-full grid grid-cols-3 pb-2 place-items-center border-b-2">
            <button className={`tablinks ${activeTab === 'Poruka' && 'active'} w-full text-center`} onClick={() => openTab('Poruka')}>
               <p className="border-r-2" data-title="Poruka">PORUKA</p>
            </button>
            <button className={`tablinks ${activeTab === 'Volonter' && 'active'} w-full text-center`} onClick={() => openTab('Volonter')}>
               <p className="border-r-2" data-title="Volonter">VOLONTER</p>
            </button>
            <div>
               {showCircleCheck ? (
                  <FontAwesomeIcon className="px-2 text-2xl" icon={faCircleCheck} style={{ color: "#63E6BE" }} />
               ) : (
                  <div className="grid grid-cols-2 gap-2">
                     <div onClick={handleClick}>
                        <FontAwesomeIcon icon={faHeart} className="px-2 text-xl text-green-500 hover:text-green-900" />
                     </div>
                     <div onClick={handleClick}>
                        <FontAwesomeIcon icon={faCircleXmark} className="text-xl text-red-500 hover:text-red-900" />
                     </div>
                  </div>
               )}

            </div>
         </div>
         <div id="Poruka" className={`tabcontent ${activeTab === 'Poruka' && 'active'} w-full p-5 flex`}>
            <div>{message} </div>
         </div>

         <div id="Volonter" className={`tabcontent ${activeTab === 'Volonter' && 'active'}`}>
            <div className="Infoimage m-5 lg:col-span-1 md:shrink-0">
               <img src="../../../assets/images/optionsImages/profileImage.jpg" className="rounded-lg" />
            </div>
            <div className="grid grid-cols-1 grid-rows-4 lg:col-span-1 md:max-h-48 mt-3 md:max-w-2xl">
               <div className="infoTitle span-2">{name}</div>
               <div id="gmail" className="infoDetails row-span-0.5 mt-5">
                  {email}
               </div>
               <div className="infoDetails mb-5">
                  {phoneNumber}
               </div>
               <button className="volonterGumb">profil</button>
            </div>
         </div>
      </div>
   );
};

export default AccordionCardJustMess;
