import React, { ReactNode } from "react";

interface ModalBodyContainerProps {
  padding?: string;
  children: ReactNode;
}

const ModalBodyContainer: React.FC<ModalBodyContainerProps> = ({ padding, children }) => {
  const paddingCSS: React.CSSProperties = {
    paddingInline: `${padding}%`,
  };

  return (
    <div className="row-span-4 w-full" style={paddingCSS}>
      {children}
    </div>
  );
};

export default ModalBodyContainer;
