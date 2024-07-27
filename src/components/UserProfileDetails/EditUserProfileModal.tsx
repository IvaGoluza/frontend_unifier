import React, { useState } from "react";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik, FormikHelpers, FieldArray } from "formik";
import Modal from "react-modal";

import { UserDetails, PartialUserDetails } from "./UserProfileDetails";
import api from "../../api/createAxiosClient";

interface EditUserProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  userDetails: UserDetails;
  currentField: keyof UserDetails | null;
  onUpdateUserDetails: (updatedDetails: PartialUserDetails) => void;
}

Modal.setAppElement("#root");

const EditUserProfileModal: React.FC<EditUserProfileModalProps> = ({
  isOpen,
  onRequestClose,
  userDetails,
  currentField,
  onUpdateUserDetails,
}) => {
  const initialValues: Partial<UserDetails> & { file?: File | null } = {
    profileDescription: userDetails.profileDescription,
    workArea: userDetails.workArea,
    hasHealthCertificate: userDetails.hasHealthCertificate,
    hasCertificateOfGoodConduct: userDetails.hasCertificateOfGoodConduct,
    file: null,
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    setSelectedFile(file);
  };

  const handleFormSubmit = async (values: Partial<UserDetails> & { file?: File | null }, field: keyof UserDetails) => {
    const userId = userDetails?.id;

    if (!userId) return;

    try {
      if (field === "profileDescription" || field === "workArea") {
        const data = {
          profileDescription: values.profileDescription,
          workArea: values.workArea,
        };

        await api.put(`/profile/user-profile/${userId}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        onUpdateUserDetails(data);
      } else if (field === "hasHealthCertificate") {
        const formData = new FormData();
        if (values.file) {
          formData.append("file", values.file);

          await api.put(`/profile/update-healthcare-certificate/${userId}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          onUpdateUserDetails({ hasHealthCertificate: true });
        }
      }
      setErrorMessage(null);
      onRequestClose();
    } catch (error: any) {
      if (error.response && error.response.status === 415) {
        setErrorMessage("Datoteka mora biti u pdf obliku!");
      } else {
        setErrorMessage("Došlo je do greške. Pokušajte ponovo.");
      }
    }
  };

  const getFieldComponent = (field: keyof UserDetails) => {
    const inputStyle =
      "mt-1 block w-full rounded-md border border-[#5422E1] shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-2";

    switch (field) {
      case "profileDescription":
        return (
          <div>
            <label htmlFor="profileDescription" className="block text-sm font-semibold text-gray-700">
              Opis profila
            </label>
            <Field name="profileDescription">
              {({ field }: { field: any }) => (
                <textarea
                  {...field}
                  className={`${inputStyle} max-h-screen`}
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = "auto";
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                  style={{ overflow: "auto", maxHeight: "50vh" }}
                />
              )}
            </Field>
          </div>
        );
      case "workArea":
        return (
          <div>
            <label htmlFor="workArea" className="block text-sm font-semibold text-gray-700">
              Područja rada
            </label>
            <FieldArray name="workArea">
              {({ push, remove, form }) => (
                <div>
                  {form.values.workArea &&
                    form.values.workArea.length > 0 &&
                    form.values.workArea.map((area: string, index: number) => (
                      <div key={index} className="mt-2 flex items-center space-x-2">
                        <Field name={`workArea.${index}`} type="text" className={inputStyle} />
                        <button type="button" onClick={() => remove(index)} className="text-red-500 hover:text-red-700">
                          Ukloni
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => push("")}
                    className="mt-2 rounded bg-[#3d4488] px-2 py-1 text-white hover:bg-[#2e3467]"
                  >
                    Dodaj područje rada
                  </button>
                </div>
              )}
            </FieldArray>
          </div>
        );
      case "hasHealthCertificate":
        return (
          <div>
            <label className="block text-sm font-semibold text-gray-700">Učitaj zdravstvenu potvrdu</label>
            <div className="mt-1 flex items-center">
              <input type="file" name="file" id="file-upload" className="hidden" onChange={handleFileChange} />
              <label
                htmlFor="file-upload"
                className="cursor-pointer rounded-[35px] bg-[#3d4488] px-4 py-2 text-center text-white hover:bg-[#2e3467]"
              >
                Odaberi datoteku
              </label>
              <span className="ml-2">{selectedFile ? selectedFile.name : "Nije odabrana niti jedna datoteka."}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 z-50 flex items-center justify-center outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="relative w-full max-w-2xl rounded-lg bg-white p-6">
        <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faCircleXmark} size="2x" />
        </button>
        <h2 className="mb-4 text-2xl font-bold">Uredi profil</h2>
        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
        <Formik
          initialValues={initialValues}
          onSubmit={async (
            values: Partial<UserDetails> & { file?: File | null },
            formikHelpers: FormikHelpers<Partial<UserDetails>>
          ) => {
            await handleFormSubmit(values, currentField as keyof UserDetails);
            if (!errorMessage) {
              formikHelpers.resetForm();
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              {currentField && getFieldComponent(currentField)}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="letter-spacing-0-06 font-krub flex h-[1.5rem] w-2/5 items-center justify-center rounded-[35px] bg-[#3d4488] p-2 text-xs font-bold text-white hover:bg-[#2e3467] lg:text-sm"
                >
                  Spremi
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditUserProfileModal;
