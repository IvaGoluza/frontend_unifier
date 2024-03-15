import React from "react";

import ModalBodyContainer from "../../components/DealsComponents/ModalBodyContainer";
import ModalContainer from "../../components/DealsComponents/ModalContainer";
import ModalFooterContainer from "../../components/DealsComponents/ModalFooterContainer";
import NavButton from "../../components/DealsComponents/NavButton";
import TitleTextInModal from "../../components/DealsComponents/TitleTextInModal";

export interface MessageType {
  name: string;
  text: string;
}

interface MsgModalProps {
  message: MessageType | undefined;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
}

const MsgModal: React.FC<MsgModalProps> = ({ message, setActiveModal }) => {
  return (
    <ModalContainer>
      <ModalBodyContainer>
        <img className="absolute right-2 rotate-12" src="../../../assets/svgs/logo.svg" alt="logo" />
        {message !== undefined ? (
          <div className="h-full w-full self-center p-10 pt-20 sm:p-20">
            <TitleTextInModal title={message.name} text={message.text} />
          </div>
        ) : (
          <p className="m-4">No message data.</p>
        )}
      </ModalBodyContainer>
      <ModalFooterContainer>
        <NavButton leftOnly={true} rightOnly={false} onLeftClick={() => setActiveModal("DEALS_TABLE")} />
      </ModalFooterContainer>
    </ModalContainer>
  );
};

export default MsgModal;
