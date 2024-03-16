import React, { ReactNode } from "react";

interface ButtonsContainerProps {
  children: ReactNode;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
  return (
    <div className="col-span-3 flex items-center bg-[#EAFAFF] pl-2 sm:col-span-1 sm:justify-center sm:bg-transparent sm:pl-0">
      {children}
    </div>
  );
};

export default ButtonsContainer;
