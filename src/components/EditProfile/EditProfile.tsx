import React, { ChangeEvent, useContext, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import api from "../../api/createAxiosClient";
import "./editProfile.css";
import { useMutation } from "react-query";

import { IAuth, loggedInUserType } from "../../api/auth/IAuth";
import { AuthContext } from "../../context/AuthContext";

interface profileDataType {
  id?: number;
  profileDescription?: string;
  mobilePhone?: string;
}

const EditProfile = () => {
  const { currentUser, setCurrentUser, login } = useContext(AuthContext) as IAuth;

  const [mobile, setMobile] = useState(currentUser?.mobilePhone);
  const [description, setDescription] = useState('Treba dohvatit profil');

  const handleMobile = (event: ChangeEvent<HTMLInputElement>) => {
    setMobile(event.target.value);
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const updateData = async (data: profileDataType) => {
    const response = await api.put("/profile", data);
    return response.data;
  };

  const updateMutation = useMutation(updateData);

  const editProfile = async () => {
    const data = {
      id: currentUser?.id,
      profileDescription: description,
      mobilePhone: mobile,
    };
    try {
      console.log(data);
      await updateMutation.mutateAsync(data);
      console.log(currentUser);
      if (currentUser) {
        //TODO Da li se ovo može dogodit?

        // const result: loggedInUserType | null = await login({
        //   email: currentUser.email,
        //   password: currentUser.password,
        // });
        // setCurrentUser(result);
        // localStorage.setItem("user", JSON.stringify(result));
      }
      console.log(currentUser);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">uredi profil</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">Uredi podatke svog profila</Dialog.Title>
          <Dialog.Description className="DialogDescription">Napravi željene promjene i spremi ih.</Dialog.Description>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="mobilePhone">
              Broj mobitela
            </label>
            <input className="Input" id="mobilePhone" defaultValue={currentUser?.mobilePhone} onChange={handleMobile} />
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="profileDescription">
              Opis profila
            </label>
            <textarea
              defaultValue={'Treba dodati poziv'}
              className="Input"
              id="profileDescription"
              onChange={handleDescription}
            ></textarea>
          </fieldset>
          <div style={{ display: "flex", marginTop: 25, justifyContent: "flex-end" }}>
            <Dialog.Close asChild>
              <button className="Button green" onClick={editProfile}>
                spremi promjene
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditProfile;
