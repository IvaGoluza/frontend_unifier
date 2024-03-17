import React, { useEffect, useState } from "react";

import api from "../../api/createAxiosClient";

import "./userProfileDetails.css";
import { string } from "yup";

interface UserDetails {
  id: number;
  name: string;
  email: string;
  mobilePhone: string;
  profileDescription: string;
  workArea: string[];
  hasHealthCertificate: boolean;
  hasCertificateOfGoodConduct: boolean;
}

const UserProfileDetails = ({ userId }: { userId: string }) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const textStyle: React.CSSProperties = {
    wordWrap: "break-word",
    wordBreak: "break-all",
    overflowWrap: "break-word",
  };

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(`/profile/volunteer/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setUserDetails(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-30 flex justify-evenly py-12">
      <div className="relative flex h-[20vw] w-[20vw] flex-col items-start justify-start overflow-hidden rounded-2xl bg-[#F8F26C] p-4 shadow-2xl">
        <div className="flex flex-col space-y-2">
          <div className="">
            <h2 className="title-description font-bold text-[#0F182C] ">Kontakt Info</h2>
            <div className="mt-1 h-1 w-32 bg-[#C1B908]"></div>
          </div>
          <div className="space-y-2 ">
            {userDetails.email && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/mail.svg" alt="Email" className="user-details-icon " />
                <span style={textStyle} className="user-details-text ml-2 break-words text-[#0F182C]">
                  {userDetails.email}
                </span>
              </div>
            )}
            {userDetails.mobilePhone && (
              <div className="flex items-center">
                <img src="../../../assets/svgImages/phone.svg" alt="Phone" className="user-details-icon " />
                <span style={textStyle} className="user-details-text ml-2 break-words  text-[#0F182C]">
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
        className="flex h-[20vw] w-[20vw] flex-col items-start justify-start rounded-2xl p-4 text-white shadow-2xl"
        style={{ backgroundColor: "#0F182C" }}
      >
        <h2 className="title-description font-bold">O VOLONTERU...</h2>
        {userDetails.profileDescription && (
          <p style={textStyle} className="break-text user-details-text mt-4 overflow-auto">
            {userDetails.profileDescription}
          </p>
        )}
      </div>

      <div
        className="relative flex h-[20vw] w-[20vw] flex-col items-start justify-start rounded-2xl p-4 text-[#0F182C] shadow-2xl"
        style={{ backgroundColor: "#99D7E8" }}
      >
        <h2 className="title-description font-bold">PODRUČJE RADA</h2>
        <ul className="user-details-text mt-3 list-disc space-y-2 overflow-auto pl-4">
          {userDetails?.workArea?.length > 0 ? (
            userDetails.workArea.map((area, index) => <li key={index}>{area}</li>)
          ) : (
            <li style={textStyle} className="user-details-text break-words ">
              Još uvijek nije odabrao područja rada.
            </li>
          )}
        </ul>
        <img
          src="../../../assets/svgImages/logo.svg"
          alt="Logo"
          className="absolute right-2 top-2 h-8 w-8 transform"
          style={{ zIndex: 10 }}
        />
      </div>
      <div
        className="relative flex h-[20vw] w-[20vw] flex-col items-start justify-start overflow-hidden rounded-2xl p-4 text-[#0F182C] shadow-2xl"
        style={{ backgroundColor: "#E7F4F8" }}
      >
        <h2 className="title-description font-bold">PRILOŽENE POTVRDE</h2>
        <div className="mt-3 list-disc space-y-2 text-sm">
          {userDetails?.hasHealthCertificate && (
            <div className="flex items-center">
              <img src="../../../assets/svgImages/tick.svg" alt="Email" className="user-details-icon " />
              <span style={textStyle} className="user-details-text ml-2 break-words  text-[#0F182C]">
                Lječnička potvrda
              </span>
            </div>
          )}
          {userDetails?.hasCertificateOfGoodConduct && (
            <div className="flex items-center">
              <img src="../../../assets/svgImages/tick.svg" alt="Phone" className="user-details-icon" />
              <span style={textStyle} className="user-details-text ml-2 break-words  text-[#0F182C]">
                Potvrda o nekažnjavanju
              </span>
            </div>
          )}
        </div>
        <img
          src="../../../assets/svgImages/logo.svg"
          alt="Logo"
          className="absolute inset-0 left-16 h-full w-full scale-150 transform object-cover opacity-25"
          style={{ zIndex: 10 }}
        />
      </div>
    </div>
  );
};

export default UserProfileDetails;
