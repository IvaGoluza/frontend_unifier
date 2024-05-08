import React, { useEffect, useState } from "react";

import api from "../../api/createAxiosClient";
import ModalBodyContainer from "../../components/DealsComponents/ModalBodyContainer";
import ModalContainer from "../../components/DealsComponents/ModalContainer";
import ModalFooterContainer from "../../components/DealsComponents/ModalFooterContainer";
import NavButton from "../../components/DealsComponents/NavButton";
import PersonPlaceTimeNumInfo from "../../components/DealsComponents/PersonPlaceTimeNumInfo";
import TitleCategories from "../../components/DealsComponents/TitleCategories";
import TitleTextInModal from "../../components/DealsComponents/TitleTextInModal";

export interface AdvertType {
  advertId: number;
  advertTitle: string;
  location: string;
  time: string;
  helpType: string;
  category: string;
  description: string;
  hasImage?: boolean;
  image?: string;
  volunteerCenter: string;
}
interface AdvertModalProps {
  volunteer: string;
  advert?: AdvertType;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
}

const RequestModal: React.FC<AdvertModalProps> = ({ volunteer, advert, setActiveModal }) => {
  const [image, setImage] = useState();
  useEffect(() => {
    if (advert?.hasImage === true) {
      try {
        api
          .get(`/advert/${advert?.advertId}/advert-image`, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            setImage(response.data.image);
          })
          .then(() => {
            setActiveModal("ADVERT_MODAL");
          });
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    }
  }, []);
  return (
    <ModalContainer>
      <ModalBodyContainer>
        {advert ? (
          <div className="grid grid-cols-1 min-[768px]:grid-cols-3">
            {advert.hasImage && image && (
              <img
                className="order-2 col-span-1 mb-10 mt-0 h-96 w-10/12 justify-self-center rounded-xl sm:w-80 md:order-1 md:ml-8 md:mt-16 lg:ml-12 lg:mt-10 xl:ml-12 xl:mt-16"
                src={`data:image/jpeg;base64,${image}`}
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
      </ModalBodyContainer>
      <ModalFooterContainer>
        <NavButton leftOnly={true} rightOnly={false} onLeftClick={() => setActiveModal("DEALS_TABLE")} />
      </ModalFooterContainer>
    </ModalContainer>
  );
};

export default RequestModal;
