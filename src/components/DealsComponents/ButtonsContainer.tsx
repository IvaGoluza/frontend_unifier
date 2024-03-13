import React, { ReactNode } from "react";

interface ButtonsContainerProps {
  children: ReactNode;
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ children }) => {
  return <div className="flex flex-row items-center justify-center">{children}</div>;
};

export default ButtonsContainer;
