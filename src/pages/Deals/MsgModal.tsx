import React from "react";

import ModalContainer from "../../components/DealsComponents/ModalContainer";
import NavButton from "../../components/DealsComponents/NavButton";
import TitleTextInModal from "../../components/DealsComponents/TitleTextInModal";

interface MsgModalProps {
  name: string;
  message: string;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
}

const MsgModal: React.FC<MsgModalProps> = ({ name, message, setActiveModal }) => {
  return (
    <ModalContainer>
      <img className="absolute right-2 rotate-12" src="../../../assets/svgs/logo.svg" alt="logo" />
      <div className="h-full w-full self-center p-10 pt-20 sm:p-20">
        <TitleTextInModal title={name} text={message} />
      </div>
      <NavButton leftOnly={true} rightOnly={false} onLeftClick={() => setActiveModal("DEALS_TABLE")} />
    </ModalContainer>
  );
};

export default MsgModal;
