import React from "react";

import { faCircleXmark, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";

import { Deal } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import VolunteerProfile from "../Modals/VolunteerProfile";

interface HeartxTitleProps {
  id: number;
  deal: Deal;
}

export default function HeartxTitle({ id, deal }: HeartxTitleProps) {
  const queryClient = useQueryClient();

  const updateData = async () => {
    const response = await api.put("/deal/accepted/" + deal.id);
    return response.data;
  };

  const updateMutation = useMutation(updateData);

  const acceptDeal = async () => {
    try {
      await updateMutation.mutateAsync();
      toast.success("Prihvatili ste volonterski oglas " + deal.advert.advertTitle, {
        position: "bottom-center",
        duration: 3000,
        className: "scale-125",
      });
      await queryClient.refetchQueries(["myRequests"]);
      await queryClient.refetchQueries(["opportunities", id]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteData = async () => {
    const response = await api.delete("/deal/" + deal.id);
    return response.data;
  };

  const deleteMutation = useMutation(deleteData);

  const rejectDeal = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.refetchQueries(["opportunities"]);
      toast.success("Odbili ste volonterski oglas " + deal.advert.advertTitle, {
        position: "bottom-center",
        duration: 3000,
        className: "scale-125",
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="advert my-2 flex items-center justify-center">
      <VolunteerProfile user={deal.advert.user} advert={deal.advert}>
        <div className="w-1/2 rounded-full bg-gray-100 px-3 text-center hover:bg-white">{deal.advert.advertTitle}</div>
      </VolunteerProfile>
      <FontAwesomeIcon
        icon={faHeart}
        className="px-2 text-xl text-green-500 hover:text-green-900"
        onClick={acceptDeal}
      />
      <FontAwesomeIcon icon={faCircleXmark} className="text-xl text-red-500 hover:text-red-900" onClick={rejectDeal} />
    </div>
  );
}
