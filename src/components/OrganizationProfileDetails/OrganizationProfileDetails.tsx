import React, { useEffect, useState } from "react";

import api from "../../api/createAxiosClient";

import "./organizationProfileDetails.css";
import { string } from "yup";

interface Address {
  townName: string;
  postcode: string;
  streetName: string;
}

interface OrganizationDetails {
  id: number;
  name: string;
  oib: string;
  type: string;
  email: string;
  mobilePhone: string;
  profileDescription: string;
  address: Address;
  url: string;
  image: string;
  workArea: string[];
}

interface OrganizationProfileDetailsProps {
  organizationDetails: OrganizationDetails | null;
}

const OrganizationProfileDetails: React.FC<OrganizationProfileDetailsProps> = ({ organizationDetails }) => {
  const [isSameUser, setIsSameUser] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = storedUser ? JSON.parse(storedUser).id : null;
    setIsSameUser(organizationDetails?.id === storedUserId);
    console.log(isSameUser);
  }, [organizationDetails?.id]);

  const textStyle: React.CSSProperties = {
    wordWrap: "break-word",
    wordBreak: "break-all",
    overflowWrap: "break-word",
  };

  if (!organizationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-30 flex justify-evenly py-12">
      <div className="relative flex h-[20vw] w-[20vw] flex-col items-start justify-start overflow-hidden rounded-2xl bg-[#F8F26C] p-4 shadow-2xl">
        <div className="flex flex-col space-y-2">
          <div className="">
            <h2 className="title-description-org font-bold text-[#0F182C] ">Kontakt Info</h2>
            <div className="mt-1 h-1 w-32 bg-[#C1B908]"></div>
          </div>
          <div className="space-y-2 ">
            {organizationDetails.email && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/mail.svg" alt="Email" className="org-details-icon " />
                <span style={textStyle} className="org-details-text ml-2 break-words text-[#0F182C]">
                  {organizationDetails.email}
                </span>
              </div>
            )}
            {organizationDetails.mobilePhone && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/phone.svg" alt="Phone" className="org-details-icon " />
                <span style={textStyle} className="org-details-text ml-2 break-words  text-[#0F182C]">
                  {organizationDetails.mobilePhone}
                </span>
              </div>
            )}
            {organizationDetails.address && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/location.svg" alt="Phone" className="org-details-icon " />
                <span style={textStyle} className="org-details-text ml-2 break-words  text-[#0F182C]">
                  {organizationDetails.address.streetName}, {organizationDetails.address.postcode}{" "}
                  {organizationDetails.address.townName}
                </span>
              </div>
            )}
            {organizationDetails.type && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/orgHeart.svg" alt="Phone" className="org-details-icon " />
                <span style={textStyle} className="org-details-text ml-2 break-words  text-[#0F182C]">
                  {organizationDetails.type}
                </span>
              </div>
            )}
          </div>
        </div>
        <img
          src="../../../assets/svgImages/logo.svg"
          alt="Logo"
          className="absolute left-24 top-32 h-2/3 w-2/3 rotate-[30deg] opacity-30"
        />
      </div>

      <div
        className="relative flex h-[20vw] w-[20vw] flex-col items-start justify-start rounded-2xl p-4 text-white shadow-2xl"
        style={{ backgroundColor: "#0F182C" }}
      >
        <h2 className="title-description-org font-bold">O ORGANIZACIJI...</h2>
        {organizationDetails.profileDescription && (
          <p style={textStyle} className="break-text org-details-text mt-4 overflow-auto">
            {organizationDetails.profileDescription}
          </p>
        )}
        {isSameUser && (
          <img
            src="../../../assets/svgImages/editProfile.svg"
            alt="Edit"
            className="absolute right-2 top-2 scale-75 transform sm:scale-90 md:scale-100"
            style={{ zIndex: 10 }}
          />
        )}
      </div>

      <div
        className="relative flex h-[20vw] w-[20vw] flex-col items-start justify-start rounded-2xl p-4 text-[#0F182C] shadow-2xl"
        style={{ backgroundColor: "#99D7E8" }}
      >
        <h2 className="title-description-org font-bold">PODRUČJE RADA</h2>
        <ul className="org-details-text mt-3 list-disc space-y-2 overflow-auto pl-4">
          {organizationDetails?.workArea?.length > 0 ? (
            organizationDetails.workArea.map((area, index) => <li key={index}>{area}</li>)
          ) : (
            <li style={textStyle} className="org-details-text break-words ">
              Još uvijek nije odabrao područja rada.
            </li>
          )}
        </ul>
        {isSameUser ? (
          <img
            src="../../../assets/svgImages/editProfile.svg"
            alt="Edit"
            className="absolute right-2 top-2 scale-75 transform sm:scale-90 md:scale-100"
            style={{ zIndex: 10 }}
          />
        ) : (
          <img
            src="../../../assets/svgImages/logo.svg"
            alt="Logo"
            className="absolute right-2 top-2 h-8 w-8 transform"
            style={{ zIndex: 10 }}
          />
        )}
      </div>
      <div
        className="relative flex h-[20vw] w-[20vw] flex-col items-start justify-start overflow-hidden rounded-2xl p-4 text-[#0F182C] shadow-2xl"
        style={{ backgroundColor: "#E7F4F8" }}
      >
        {organizationDetails?.oib && (
          <div style={{ marginBottom: "20px" }}>
            <h2 className="title-description-org font-bold">OIB organizacije</h2>
            <div className="mt-3 list-disc space-y-2 text-sm">
              <div className="flex items-center">
                <img src="../../../assets/svgImages/tick.svg" alt="Email" className="org-details-icon " />
                <span style={textStyle} className="org-details-text ml-2 break-words  text-[#0F182C]">
                  {organizationDetails.oib}
                </span>
              </div>
            </div>
          </div>
        )}
        {organizationDetails?.url && (
          <div>
            <h2 className="title-description-org top-32 font-bold">WEB stranica</h2>
            <div className="mt-3 list-disc space-y-2 text-sm">
              {organizationDetails?.url && (
                <div className="flex items-center">
                  <img src="../../../assets/svgImages/tick.svg" alt="Email" className="org-details-icon " />
                  <span style={textStyle} className="org-details-text ml-2 break-words  text-[#0F182C]">
                    {organizationDetails.url}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
        <img
          src="../../../assets/svgImages/logo.svg"
          alt="Logo"
          className="absolute inset-0 left-16 h-full w-full scale-150 transform object-cover opacity-25"
          style={{ zIndex: 10 }}
        />
        {isSameUser && (
          <img
            src="../../../assets/svgImages/editProfile.svg"
            alt="Edit"
            className="absolute right-2 top-2 scale-75 transform sm:scale-90 md:scale-100"
            style={{ zIndex: 10 }}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationProfileDetails;
