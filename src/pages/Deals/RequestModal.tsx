import React from "react";

import ModalContainer from "../../components/DealsComponents/ModalContainer";
import NavButton from "../../components/DealsComponents/NavButton";
import PersonPlaceTimeNumInfo from "../../components/DealsComponents/PersonPlaceTimeNumInfo";
import TitleCategories from "../../components/DealsComponents/TitleCategories";
import TitleTextInModal from "../../components/DealsComponents/TitleTextInModal";

export interface RequestType {
  requestTitle: string;
  location: string;
  time: string;
  helpType: string;
  category: string;
  typeOfAction: string;
  description: string;
  skillSet: string;
  volunteerCenter: string;
  numOfVolunteers: number;
}
interface RequestModalProps {
  request: RequestType;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
}

const RequestModal: React.FC<RequestModalProps> = ({ request, setActiveModal }) => {
  return (
    <ModalContainer>
      <div className="my-10 ml-6 flex h-full w-full flex-col sm:m-10">
        <img className="absolute right-2 rotate-12" src="../../../assets/svgs/logo.svg" alt="logo" />
        <TitleCategories
          title={request.requestTitle}
          categories={[request.category, request.helpType, request.typeOfAction, request.volunteerCenter]}
          textColor={"FFFFFF"}
          bgColor={"8278F8"}
        />
        <PersonPlaceTimeNumInfo
          location={request.location}
          time={request.time}
          volunteerNumber={request.numOfVolunteers}
          textColor={"1F2340"}
        />
        <TitleTextInModal title={"Potrebna znanja i vještine volontera"} text={request.skillSet} />
        <TitleTextInModal title={"Opis potrebne pomoći"} text={request.description} />
      </div>
      <NavButton leftOnly={true} rightOnly={false} onLeftClick={() => setActiveModal("DEALS_TABLE")} />
    </ModalContainer>
  );
};

export default RequestModal;
