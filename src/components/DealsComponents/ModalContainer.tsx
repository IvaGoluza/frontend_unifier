import React, { ReactNode } from "react";

interface ModalContainerProps {
  children: ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
  return (
    <div className="relative mx-5 my-8 min-h-[80vh] w-full overflow-hidden rounded-[50px] border border-[0.2px] border-[#B3B0A9] pb-20 shadow-xl lg:w-4/5">
      {children}
    </div>
  );
};

export default ModalContainer;
