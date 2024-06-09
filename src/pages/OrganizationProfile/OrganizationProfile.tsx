import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./organizationProfile.css";
import api from "../../api/createAxiosClient";
import OrganizationProfileDetails from "../../components/OrganizationProfileDetails/OrganizationProfileDetails";
import Reviews from "../../components/Reviews/Reviews";
import UserGallery from "../../components/UserGallery/UserGallery";

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
  image?: string;
  workArea: string[];
  userRecensions: UserRecension[];
}

const OrganizationProfile = () => {
  const [orgImage, setOrgImage] = useState("");
  const [name, setName] = useState("");
  const [organizationDetails, setOrganizationDetails] = useState<OrganizationDetails | null>(null);
  const [userRecensions, setUserRecensions] = useState<UserRecension[]>([
    {
      recension: "Ovo je tekst recenzije 1...",
    },
    {
      recension: "Ovo je tekst recenzije 2...",
    },
    { recension: "Ovo je tekst recenzije 3..." },
    {
      recension: "Ovo je tekst recenzije 4...",
    },
    { recension: "Ovo je tekst recenzije 5..." },
    { recension: "Ovo je tekst recenzije 6..." },
    { recension: "Ovo je tekst recenzije 7..." },
    { recension: "Ovo je tekst recenzije 8..." },
  ]);
  const { orgId } = useParams<{ orgId: string }>();

  useEffect(() => {
    if (orgId) {
      fetchOrganizationDetails();
    }
  }, [orgId]);

  const fetchOrganizationDetails = async () => {
    try {
      const response = await api.get(`/profile/organization/${orgId}`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;
      setOrganizationDetails(data);
      if (data.image !== null) {
        setOrgImage(data.image);
      }
      setName(data.name);
    } catch (error) {
      console.error("Error fetching organization details:", error);
    }
  };

  return (
    <div className="org-profile relative w-full overflow-hidden">
      <img src="../../../assets/svgImages/profile_wave.svg" className="wave-background" alt="Wave Background" />
      <div className={`content-container relative w-full ${orgImage ? "with-image" : "without-image"}`}>
        {organizationDetails && (
          <OrganizationProfileDetails organizationDetails={{ ...organizationDetails, image: orgImage }} />
        )}
      </div>
      {orgId ? <UserGallery userId={orgId} /> : null}
      <Reviews userRecensions={userRecensions} />
    </div>
  );
};

export default OrganizationProfile;
