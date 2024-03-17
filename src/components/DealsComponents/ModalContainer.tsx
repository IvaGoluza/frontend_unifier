import React, { ReactNode } from "react";

interface ModalContainerProps {
  children: ReactNode;
  mobileCSS?: boolean;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children, mobileCSS }) => {
  return (
    <div
      className={`${
        mobileCSS ? "hidden sm:grid" : "grid"
      } relative mx-5 my-8 h-fit min-h-[90vh] w-full grid-rows-5 rounded-[50px] sm:min-h-[80vh] sm:overflow-hidden sm:border-[0.2px] sm:border-[#B3B0A9] sm:shadow-xl lg:w-4/5`}
    >
      {children}
    </div>
  );
};

export default ModalContainer;
