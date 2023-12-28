import React from "react";

import "./FormsContainer.css";

type FormsContainerProps = {
  children: React.ReactNode;
};

export default function FormsContainer({ children }: FormsContainerProps) {
  return <div className="forms-container items-center">{children}</div>;
}
