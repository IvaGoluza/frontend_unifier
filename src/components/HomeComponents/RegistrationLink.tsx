import React from "react";

import { Link as ReactRouterLink } from "react-router-dom";

interface RegistrationLinkProps {
  to: string;
  text: string;
}

const RegistrationLink: React.FC<RegistrationLinkProps> = ({ to, text }) => {
  return (
    <ReactRouterLink
      to={to}
      className="mt-5 inline-block rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1F2340] no-underline transition duration-500 ease-in-out hover:bg-indigo-300 sm:text-sm"
    >
      {text}
    </ReactRouterLink>
  );
};

export default RegistrationLink;
