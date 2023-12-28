import React from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "react-query";

import InfoWithModal from "./InfoWithModal";
import { RequestType } from "../../api/auth/IForm";

interface data {
  id: number;
  request: RequestType;
  advertTitle: string;
}

export default function RequestCard({ id, request, advertTitle }: data) {
  const queryClient = useQueryClient();
  const updateData = async () => {
    const response = await axios.put("http://localhost:8080/api/deals/" + id);
    return response.data;
  };

  const updateMutation = useMutation(updateData);

  const acceptDeal = async () => {
    try {
      await updateMutation.mutateAsync();
      toast.success("Prihvatili ste zahtjev za pomoć " + request.requestTitle, {
        position: "bottom-center",
        duration: 3000,
        className: "scale-125",
      });
      await queryClient.refetchQueries(["help_requests"]);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const deleteData = async () => {
    const response = await axios.delete("http://localhost:8080/api/deals/" + id);
    return response.data;
  };

  const deleteMutation = useMutation(deleteData);

  const rejectDeal = async () => {
    try {
      await deleteMutation.mutateAsync();
      await queryClient.refetchQueries(["help_requests"]);
      toast.success("Odbili ste zahtjev " + request.requestTitle, {
        position: "bottom-center",
        duration: 3000,
        className: "scale-125",
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="request-container w-min-w m-4 grid grid-cols-3 grid-rows-1 gap-4 rounded-lg border bg-white px-6 py-7 shadow-md hover:bg-gray-50 md:max-h-fit md:max-w-xl">
      <InfoWithModal
        title={request.requestTitle}
        town={request.town}
        association={request.association}
        helpType={request.helpType}
        category={request.category}
        user={request.user}
      />
      <div className="right-container col-span-2 flex flex-col justify-between">
        <p className="text-s">{request.description}</p>

        <div className="mt-2">
          <div className="volNum-container">
            <span className="font-semibold text-gray-400">Broj potrebnih volontera: {request.volunteerNum}</span>
          </div>
          <p className="font-semibold text-gray-400">
            Prijavljen na oglas: <span> {advertTitle}</span>
          </p>

          <div className="button-container mt-3">
            <button
              className="mx-3 rounded-3xl bg-orange-500 px-6 py-2 font-bold text-white hover:bg-green-600"
              onClick={acceptDeal}
            >
              PRIHVATI
            </button>
            <button
              className="mx-3 rounded-3xl bg-gray-200 px-7 py-2 font-bold text-white hover:bg-red-600"
              onClick={rejectDeal}
            >
              ODBACI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
