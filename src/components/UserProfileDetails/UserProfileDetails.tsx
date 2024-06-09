import React, { useEffect, useState } from "react";
import "./userProfileDetails.css";

interface UserDetails {
  id: number;
  name: string;
  email: string;
  mobilePhone: string;
  profileDescription: string;
  workArea: string[];
  hasHealthCertificate: boolean;
  hasCertificateOfGoodConduct: boolean;
  image?: string;
}

interface UserProfileDetailsProps {
  userDetails: UserDetails | null;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({ userDetails }) => {
  const [isSameUser, setIsSameUser] = useState(false);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = storedUser ? JSON.parse(storedUser).id : null;
    setIsSameUser(userDetails?.id === storedUserId);
  }, [userDetails?.id]);

  const textStyle: React.CSSProperties = {
    wordWrap: "break-word",
    wordBreak: "break-all",
    overflowWrap: "break-word",
  };

  const toggleCardExpansion = (index: number) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-details-container flex flex-col items-center justify-center">
      <div className="profile-header mb-8 flex flex-col items-center justify-center">
        {userDetails.image && (
          <img
            className="user-image rounded-full border-4 border-white"
            src={`data:image/jpeg;base64,${userDetails.image}`}
            alt="Profile"
          />
        )}
        <h1 className="user-name mt-4 text-lg font-bold text-[#09115B]">{userDetails.name}</h1>
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
              {userDetails.email && (
                <div className="flex items-center">
                  <img src="../../../assets/svgImages/mail.svg" alt="Email" className="user-details-icon" />
                  <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                    {userDetails.email}
                  </span>
                </div>
              )}
              {userDetails.mobilePhone && (
                <div className="flex items-center">
                  <img src="../../../assets/svgImages/phone.svg" alt="Phone" className="user-details-icon" />
                  <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                    {userDetails.mobilePhone}
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
          <h2 className="title-description font-bold">O VOLONTERU...</h2>
          {userDetails.profileDescription && (
            <p style={textStyle} className="break-text user-details-text mt-4 overflow-auto">
              {userDetails.profileDescription}
            </p>
          )}
          {isSameUser && (
            <img
              src="../../../assets/svgImages/editProfile.svg"
              alt="Edit"
              className="edit-icon absolute right-2 top-2"
            />
          )}
        </div>

        <div
          className={`card bg-[#99D7E8] ${expandedCardIndex === 2 ? "expanded" : ""}`}
          onClick={() => toggleCardExpansion(2)}
        >
          <h2 className="title-description font-bold">PODRUČJE RADA</h2>
          <ul className="user-details-text mt-3 list-disc space-y-2 overflow-auto pl-4">
            {userDetails.workArea && userDetails.workArea.length > 0 ? (
              userDetails.workArea.map((area, index) => <li key={index}>{area}</li>)
            ) : (
              <li style={textStyle} className="user-details-text break-words">
                Još uvijek nije odabrao područja rada.
              </li>
            )}
          </ul>
          {isSameUser ? (
            <img
              src="../../../assets/svgImages/editProfile.svg"
              alt="Edit"
              className="edit-icon absolute right-2 top-2"
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
          className={`card bg-[#E7F4F8] ${expandedCardIndex === 3 ? "expanded" : ""}`}
          onClick={() => toggleCardExpansion(3)}
        >
          <h2 className="title-description font-bold">PRILOŽENE POTVRDE</h2>
          <div className="mt-3 list-disc space-y-2 text-sm">
            {userDetails.hasHealthCertificate && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/tick.svg" alt="Email" className="user-details-icon" />
                <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                  Lječnička potvrda
                </span>
              </div>
            )}
            {userDetails.hasCertificateOfGoodConduct && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/tick.svg" alt="Phone" className="user-details-icon" />
                <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                  Potvrda o nekažnjavanju
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
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileDetails;
