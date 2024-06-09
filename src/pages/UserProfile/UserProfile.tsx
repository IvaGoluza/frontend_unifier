import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import "./userProfile.css";
import api from "../../api/createAxiosClient";
import Reviews from "../../components/Reviews/Reviews";
import UserGallery from "../../components/UserGallery/UserGallery";
import UserProfileDetails from "../../components/UserProfileDetails/UserProfileDetails";

interface UserRecension {
  recension: string;
}

interface UserDetails {
  id: number;
  name: string;
  email: string;
  mobilePhone: string;
  profileDescription: string;
  workArea: string[];
  hasHealthCertificate: boolean;
  hasCertificateOfGoodConduct: boolean;
  userRecensions: UserRecension[];
  image?: string;
}

const UserProfile = () => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
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
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const fetchUserDetails = async () => {
    try {
      const response = await api.get(`/profile/volunteer/${userId}`, {
        headers: { "Content-Type": "application/json" },
      });
      const data = response.data;
      console.log(data.hasHealthCertificate);
      setUserDetails(data);
      if (data.image !== null) {
        setUserImage(data.image);
      }
      setName(data.name);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="user-profile relative w-full overflow-hidden">
      <img src="../../../assets/svgImages/profile_wave.svg" className="wave-background" alt="Wave Background" />
      <div className={`content-container relative w-full ${userImage ? "with-image" : "without-image"}`}>
        {userDetails && <UserProfileDetails userDetails={{ ...userDetails, image: userImage }} />}
      </div>
      {userId ? <UserGallery userId={userId} /> : null}
      <Reviews userRecensions={userRecensions} />
    </div>
  );
};

export default UserProfile;
