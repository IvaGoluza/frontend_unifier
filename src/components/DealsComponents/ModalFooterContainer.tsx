import React, { ReactNode } from "react";

interface ModalFooterContainerProps {
  children: ReactNode;
}

const ModalFooterContainer: React.FC<ModalFooterContainerProps> = ({ children }) => {
  return (
    <div className="relative row-span-1 flex h-32 w-full flex-row items-center lg:items-end lg:pb-10"> {children} </div>
  );
};

export default ModalFooterContainer;
