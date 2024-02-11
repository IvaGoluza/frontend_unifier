import React from "react";

import { faLock, faLockOpen, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/createAxiosClient";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";

import { loggedInUserType } from "../../api/auth/IAuth";
import UserModal from "../../pages/Admin/ProfileModals/UserModal";
import VolunteerModal from "../../pages/Admin/ProfileModals/VolunteerModal";

interface UserCardProps {
  user: loggedInUserType;
}

export default function UserCard({ user }: UserCardProps) {
  const queryClient = useQueryClient();

  const changeBlockStatus = async () => {
    const response = await api.put("/user/change-block-status/" + user.id);
    return response.data;
  };

  const updateMutation = useMutation(changeBlockStatus);

  const blockStatusHandler = async () => {
    try {
      await updateMutation.mutateAsync();
      toast.success(
        "Korisnik je" + (user.blocked ? "odblokiran" : "blokiran"),
        {
          position: "bottom-center",
          duration: 3000,
          className: "scale-125",
        }
      );
      await queryClient.refetchQueries(["allUsers"]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const color = "pt-1 font-bold " + (user.blocked ? "text-red-700" : "");
  const user_type =
    user.userType === "VOLUNTEER"
      ? "VOLONTER"
      : user.userType === "ASSOCIATION"
      ? "VODITELJ UDRUGE"
      : "OSOBA U POTREBI";

  return (
    <div className="mx-5 my-2 ml-16 grid w-4/5 grid-cols-3 rounded-lg bg-gray-100 px-6 hover:bg-indigo-100">
      <p className={color}>
        {user.email}
      </p>
      <p className="justify-self-center pt-1 font-semibold text-blue-700">{user_type}</p>
      <div className="flex justify-self-end">
        {user.userType === "VOLUNTEER" && (
          <VolunteerModal user={user}>
            <div className="mx-3 flex items-center justify-center text-gray-400">
              <FontAwesomeIcon icon={faUser} />
              <div className="flex flex-col">
                <p className="text-s font-semibold">INFO</p>
              </div>
            </div>
          </VolunteerModal>
        )}
        {user.userType !== "VOLUNTEER" && (
          <UserModal user={user}>
            <div className="mx-3 flex items-center justify-center text-gray-400">
              <FontAwesomeIcon icon={faUser} />
              <div className="flex flex-col">
                <p className="text-s font-semibold">INFO</p>
              </div>
            </div>
          </UserModal>
        )}
        {user.blocked && (
          <FontAwesomeIcon icon={faLock} className="m-2 ml-6 text-red-700" onClick={blockStatusHandler} />
        )}
        {!user.blocked && (
          <FontAwesomeIcon icon={faLockOpen} className="my-2 ml-6 mr-1 text-green-700" onClick={blockStatusHandler} />
        )}
      </div>
    </div>
  );
}
