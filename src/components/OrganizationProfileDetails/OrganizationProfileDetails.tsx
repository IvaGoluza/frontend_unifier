import React, { useEffect, useState, useCallback } from "react";

import EditOrganizationProfileModal from "./EditOrganizationProfileModal";
import "./organizationProfileDetails.css";

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
  image?: string;
  workArea: string[];
}

interface OrganizationProfileDetailsProps {
  organizationDetails: OrganizationDetails | null;
  onUpdateOrganizationDetails: (updatedDetails: Partial<OrganizationDetails>) => void;
}

const OrganizationProfileDetails: React.FC<OrganizationProfileDetailsProps> = ({
  organizationDetails,
  onUpdateOrganizationDetails,
  // eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
  const [isSameUser, setIsSameUser] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentField, setCurrentField] = useState<keyof OrganizationDetails | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = storedUser ? JSON.parse(storedUser).id : null;
    setIsSameUser(organizationDetails?.id === storedUserId);
  }, [organizationDetails?.id]);

  const textStyle: React.CSSProperties = {
    wordWrap: "break-word",
    wordBreak: "break-all",
    overflowWrap: "break-word",
  };

  const toggleCardExpansion = (index: number) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  const handleModalOpen = (field: keyof OrganizationDetails) => {
    setCurrentField(field);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentField(null);
  };

  const handleOrganizationDetailsUpdate = (updatedDetails: Partial<OrganizationDetails>) => {
    onUpdateOrganizationDetails(updatedDetails);
  };

  if (!organizationDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container flex flex-col items-center justify-center">
      <div className="profile-header relative mb-8 flex flex-col items-center justify-center">
        {organizationDetails.image && (
          <img
            className="user-image rounded-full border-4 border-white"
            src={`data:image/jpeg;base64,${organizationDetails.image}`}
            alt="Profile"
          />
        )}
        {isSameUser && (
          <img
            src="../../../assets/svgImages/editGallery.svg"
            alt="Edit Profile"
            className={`editProfile absolute h-12 w-12 cursor-pointer ${
              organizationDetails.image ? "editProfileWithImage" : "editProfileWithoutImage"
            }`}
            onClick={() => handleModalOpen("image")}
          />
        )}
        <h1 className="user-name mt-4 text-lg font-bold text-[#09115B]">{organizationDetails.name}</h1>
      </div>
      <div className="details-cards flex flex-wrap justify-evenly px-4 py-12">
        <div
          className={`card bg-[#F8F26C] ${expandedCardIndex === 0 ? "expanded" : ""}`}
          onClick={() => toggleCardExpansion(0)}
        >
          <div className="flex flex-col space-y-2">
            <div>
              <h2 className="title-description font-bold text-[#0F182C]">Kontakt Info</h2>
              <div className="mt-1 h-1 w-32 bg-[#C1B908]"></div>
            </div>
            <div className="space-y-2">
              {organizationDetails.email && (
                <div className="flex items-center">
                  <img src="../../../assets/svgImages/mail.svg" alt="Email" className="user-details-icon" />
                  <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                    {organizationDetails.email}
                  </span>
                </div>
              )}
              {organizationDetails.mobilePhone && (
                <div className="flex items-center">
                  <img src="../../../assets/svgImages/phone.svg" alt="Phone" className="user-details-icon" />
                  <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                    {organizationDetails.mobilePhone}
                  </span>
                </div>
              )}
              {organizationDetails.address && (
                <div className="flex items-center">
                  <img src="../../../assets/svgImages/location.svg" alt="Address" className="user-details-icon" />
                  <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                    {organizationDetails.address.streetName}, {organizationDetails.address.postcode}{" "}
                    {organizationDetails.address.townName}
                  </span>
                </div>
              )}
              {organizationDetails.type && (
                <div className="flex items-center">
                  <img src="../../../assets/svgImages/orgType.svg" alt="Type" className="user-details-icon" />
                  <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
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
          className={`card bg-[#0F182C] text-white ${expandedCardIndex === 1 ? "expanded" : ""}`}
          onClick={() => toggleCardExpansion(1)}
        >
          <h2 className="title-description font-bold">O ORGANIZACIJI...</h2>
          {organizationDetails.profileDescription && (
            <p style={textStyle} className="break-text user-details-text mt-4 overflow-auto">
              {organizationDetails.profileDescription}
            </p>
          )}
          {isSameUser && (
            <img
              src="../../../assets/svgImages/editProfile.svg"
              alt="Edit"
              className="edit-icon absolute right-2 top-2"
              onClick={() => handleModalOpen("profileDescription")}
            />
          )}
        </div>

        <div
          className={`card bg-[#99D7E8] ${expandedCardIndex === 2 ? "expanded" : ""}`}
          onClick={() => toggleCardExpansion(2)}
        >
          <h2 className="title-description font-bold">PODRUČJE RADA</h2>
          <ul className="user-details-text mt-3 list-disc space-y-2 overflow-auto pl-4">
            {organizationDetails.workArea && organizationDetails.workArea.length > 0 ? (
              organizationDetails.workArea.map((area, index) => <li key={index}>{area}</li>)
            ) : (
              <li style={textStyle} className="user-details-text break-words">
                Još uvijek nisu odabrali područja rada.
              </li>
            )}
          </ul>
          {isSameUser && (
            <img
              src="../../../assets/svgImages/editProfile.svg"
              alt="Edit"
              className="edit-icon absolute right-2 top-2"
              onClick={() => handleModalOpen("workArea")}
            />
          )}
        </div>

        <div
          className={`card bg-[#E7F4F8] ${expandedCardIndex === 3 ? "expanded" : ""}`}
          onClick={() => toggleCardExpansion(3)}
        >
          <h2 className="title-description font-bold">OIB</h2>
          <div className="mt-3 list-disc space-y-2 text-sm">
            {organizationDetails.oib && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/tick.svg" alt="OIB" className="user-details-icon" />
                <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                  {organizationDetails.oib}
                </span>
              </div>
            )}
          </div>
          <h2 className="title-description mt-4 font-bold">WEB STRANICA</h2>
          <div>
            {organizationDetails.url && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/tick.svg" alt="URL" className="user-details-icon" />
                <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                  {organizationDetails.url}
                </span>
              </div>
            )}
          </div>
          <img
            src="../../../assets/svgImages/logo.svg"
            alt="Logo"
            className="absolute inset-0 left-16 h-full w-full scale-150 transform object-cover opacity-25"
          />
          {isSameUser && (
            <img
              src="../../../assets/svgImages/editProfile.svg"
              alt="Edit"
              className="edit-icon absolute right-2 top-2"
              onClick={() => handleModalOpen("url")}
            />
          )}
        </div>
      </div>

      {isModalOpen && (
        <EditOrganizationProfileModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          organizationDetails={organizationDetails}
          currentField={currentField}
          onUpdateOrganizationDetails={handleOrganizationDetailsUpdate}
        />
      )}
    </div>
  );
};

export default OrganizationProfileDetails;
