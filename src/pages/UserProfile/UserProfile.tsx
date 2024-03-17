import React, { useEffect, useRef, useState } from "react";

import "./userProfile.css";
import api from "../../api/createAxiosClient";
import Reviews from "../../components/Reviews/Reviews";
import UserGallery from "../../components/UserGallery/UserGallery";
import UserProfileDetails from "../../components/UserProfileDetails/UserProfileDetails";

const UserProfile = () => {
  const [userImage, setUserImage] = useState("");

  let userId = "";
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    userId = user.id;
  }

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
      setUserImage(response.data.image);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  return (
    <div className="user-profile relative w-full overflow-hidden">
      <img src="../../../assets/svgImages/profile_wave.svg" className="wave-background " alt="Wave Background" />
      <div className="content-container relative w-full">
        <div className="profile-image-container flex flex-col items-center justify-center ">
          {userImage && (
            <img
              className="user-image rounded-full border-4 border-white "
              src={`data:image/jpeg;base64,${userImage}`}
              alt="Profile"
            />
          )}
          <h1 className=" user-name mt-4 text-lg font-bold text-[#09115B]">Maria Lovrić</h1>
        </div>
        <UserProfileDetails userId={userId} />
      </div>
      <UserGallery userId={userId} />
      <Reviews userId={userId} />
    </div>
  );
};

export default UserProfile;
