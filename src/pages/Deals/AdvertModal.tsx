import React from "react";

import ModalContainer from "../../components/DealsComponents/ModalContainer";
import NavButton from "../../components/DealsComponents/NavButton";
import PersonPlaceTimeNumInfo from "../../components/DealsComponents/PersonPlaceTimeNumInfo";
import TitleCategories from "../../components/DealsComponents/TitleCategories";
import TitleTextInModal from "../../components/DealsComponents/TitleTextInModal";

export interface AdvertType {
  advertTitle: string;
  location: string;
  time: string;
  helpType: string;
  category: string;
  description: string;
  advertImage?: string;
  volunteerCenter: string;
}
interface AdvertModalProps {
  volunteer: string;
  advert?: AdvertType;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
}

const RequestModal: React.FC<AdvertModalProps> = ({ volunteer, advert, setActiveModal }) => {
  return (
    <ModalContainer>
      {advert ? (
        <div className="grid grid-cols-1 min-[768px]:grid-cols-3">
          {advert.advertImage && (
            <img
              className="order-2 col-span-1 mb-10 mt-0 h-96 w-10/12 justify-self-center rounded-xl sm:w-80 md:order-1 md:ml-8 md:mt-16 lg:ml-12 lg:mt-10 xl:ml-12 xl:mt-16"
              src="../../../assets/images/dean.jpg"
              alt="advert image"
            />
          )}
          <div className="order-1 col-span-1 m-10 flex h-full w-full flex-col md:order-2 min-[768px]:col-span-2 min-[768px]:ml-12 lg:my-4 xl:my-10">
            <img className="absolute right-2 rotate-12" src="../../../assets/svgs/logo.svg" alt="logo" />
            <TitleCategories
              title={advert.advertTitle}
              categories={[advert.category, advert.helpType, advert.volunteerCenter]}
              textColor={"FFFFFF"}
              bgColor={"8278F8"}
            />
            <PersonPlaceTimeNumInfo
              person={volunteer}
              location={advert.location}
              time={advert.time}
              textColor={"1F2340"}
            />
            <TitleTextInModal title={"Opis volonterske aktivnosti"} text={advert.description} />
          </div>
        </div>
      ) : (
        <p className="m-4">No advert data available.</p>
      )}
      <NavButton leftOnly={true} rightOnly={false} onLeftClick={() => setActiveModal("DEALS_TABLE")} />
    </ModalContainer>
  );
};

export default RequestModal;
