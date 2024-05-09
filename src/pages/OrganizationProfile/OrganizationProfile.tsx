import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import "./organizationProfile.css";
import api from "../../api/createAxiosClient";
import OrganizationProfileDetails from "../../components/OrganizationProfileDetails/OrganizationProfileDetails";
import Reviews from "../../components/Reviews/Reviews";
import UserGallery from "../../components/UserGallery/UserGallery";
import UserProfileDetails from "../../components/UserProfileDetails/UserProfileDetails";

interface UserRecension {
  recension: string;
}

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
  userType: string;
  url: string;
  image: string;
  workArea: string[];
  userRecensions: UserRecension[];
}

const OrganizationProfile = () => {
  const [orgImage, setOrgImage] = useState("");
  const [name, setName] = useState("");
  const [organizationDetails, setOrganizationDetails] = useState<OrganizationDetails | null>(null);
  const [userRecensions, setUserRecensions] = useState<UserRecension[]>([
    {
      recension:
        "Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.Ovo je tekst recenzije 1.",
    },
    {
      recension:
        "Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.",
    },
    { recension: "Ovo je tekst recenzije 3." },
    { recension: "Ovo je tekst recenzije 4." },
    { recension: "Ovo je tekst recenzije 5." },
    { recension: "Ovo je tekst recenzije 6." },
    { recension: "Ovo je tekst recenzije 7." },
    { recension: "Ovo je tekst recenzije 9." },
  ]);
  const { orgId } = useParams<{ orgId: string }>();

  useEffect(() => {
    console.log(orgId);
    if (orgId) {
      fetchOrganizationDetails();
    }
  }, [orgId]);

  const fetchOrganizationDetails = async () => {
    try {
      const response = await api.get(`/profile/organization/${orgId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setOrganizationDetails(response.data);
      if (response.data.image !== null) {
        setOrgImage(response.data.image);
      }
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  };

  return (
    <div className="org-profile relative w-full overflow-hidden">
      <img src="../../../assets/svgImages/profile_wave.svg" className="wave-background-org " alt="Wave Background" />
      <div className="content-container-org relative w-full">
        <div className="profile-image-container-org flex flex-col items-center justify-center ">
          {orgImage && (
            <img
              className="user-image-org rounded-full border-4 border-white "
              src={`data:image/jpeg;base64,${orgImage}`}
              alt="Profile"
            />
          )}
          <h1
            style={{ marginTop: orgImage ? "" : "18vw" }}
            className="user-name-org mt-4 text-lg font-bold text-[#09115B]"
          >
            {name}
          </h1>
        </div>
        <OrganizationProfileDetails organizationDetails={organizationDetails} />
      </div>
      {orgId ? <UserGallery userId={orgId} /> : null}
      <Reviews userRecensions={userRecensions} />
    </div>
  );
};

export default OrganizationProfile;
