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
}

const UserProfile = () => {
  const [userImage, setUserImage] = useState("");
  const [name, setName] = useState("");
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
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
    {
      recension:
        "Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.Ovo je tekst recenzije 2.",
    },
    { recension: "Ovo je tekst recenzije 5." },
    { recension: "Ovo je tekst recenzije 6." },
    { recension: "Ovo je tekst recenzije 7." },
    { recension: "Ovo je tekst recenzije 9." },
  ]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    console.log(userId);
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
      if (response.data.image !== null) {
        setUserImage(response.data.image);
      }
      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="user-profile relative w-full overflow-hidden">
      <img src="../../../assets/svgImages/profile_wave.svg" className="wave-background" alt="Wave Background" />
      <div className="content-container relative w-full">
        <div className="profile-image-container flex flex-col items-center justify-center">
          {userImage && (
            <img
              className="user-image rounded-full border-4 border-white"
              src={`data:image/jpeg;base64,${userImage}`}
              alt="Profile"
            />
          )}
          <h1
            style={{ marginTop: userImage ? "" : "18vw" }}
            className="user-name mt-4 text-lg font-bold text-[#09115B]"
          >
            {name}
          </h1>
        </div>
        <UserProfileDetails userDetails={userDetails} />
      </div>
      {userId ? <UserGallery userId={userId} /> : null}
      <Reviews userRecensions={userRecensions} />
    </div>
  );
};

export default UserProfile;
