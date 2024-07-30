import React, { useState } from "react";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik, FormikHelpers, FieldArray } from "formik";
import Modal from "react-modal";

import api from "../../api/createAxiosClient";

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
  url: string;
  image?: string;
  workArea: string[];
}

interface EditOrganizationProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  organizationDetails: OrganizationDetails;
  currentField: keyof OrganizationDetails | null;
  onUpdateOrganizationDetails: (updatedDetails: Partial<OrganizationDetails>) => void;
}

Modal.setAppElement("#root");

const EditOrganizationProfileModal: React.FC<EditOrganizationProfileModalProps> = ({
  isOpen,
  onRequestClose,
  organizationDetails,
  currentField,
  onUpdateOrganizationDetails,
}) => {
  const initialValues: Partial<OrganizationDetails> = {
    profileDescription: organizationDetails.profileDescription,
    url: organizationDetails.url,
    workArea: organizationDetails.workArea,
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (values: Partial<OrganizationDetails>, field: keyof OrganizationDetails) => {
    const orgId = organizationDetails?.id;

    if (!orgId) return;

    try {
      const data: Partial<OrganizationDetails> = {};
      if (field === "profileDescription") {
        data.profileDescription = values.profileDescription;
      } else if (field === "url") {
        data.url = values.url;
      } else if (field === "workArea") {
        data.workArea = values.workArea;
      }

      await api.put(`/profile/organization-profile/${orgId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      onUpdateOrganizationDetails(data);
      setErrorMessage(null);
      onRequestClose();
    } catch (error) {
      setErrorMessage("Došlo je do greške. Pokušajte ponovo.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
    setSelectedFile(file);
  };

  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const orgId = organizationDetails?.id;
    if (!selectedFile || !orgId) {
      setErrorMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await api.put(`/profile/update-profile-image/${orgId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setErrorMessage(null);
      onRequestClose();
      window.location.reload();
    } catch (error) {
      setErrorMessage("Došlo je do greške prilikom učitavanja slike. Pokušajte ponovo.");
    }
  };

  const getFieldComponent = (field: keyof OrganizationDetails) => {
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
      case "url":
        return (
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-gray-700">
              URL
            </label>
            <Field name="url" type="text" className={inputStyle} />
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
      case "image":
        return (
          <div>
            <label htmlFor="file" className="block text-sm font-semibold text-gray-700">
              Profilna slika
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-[#3d4488] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#2e3467]"
            />
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
        <h2 className="mb-4 text-2xl font-bold">Uredi organizacijski profil</h2>
        {errorMessage && <div className="mb-4 text-red-500">{errorMessage}</div>}
        {currentField === "image" ? (
          <form onSubmit={handleImageUpload} className="space-y-4">
            {getFieldComponent(currentField)}
            <div className="flex justify-end">
              <button
                type="submit"
                className="letter-spacing-0-06 font-krub flex h-[1.5rem] w-2/5 items-center justify-center rounded-[35px] bg-[#3d4488] p-2 text-xs font-bold text-white hover:bg-[#2e3467] lg:text-sm"
              >
                Spremi
              </button>
            </div>
          </form>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={async (
              values: Partial<OrganizationDetails>,
              formikHelpers: FormikHelpers<Partial<OrganizationDetails>>
            ) => {
              await handleFormSubmit(values, currentField as keyof OrganizationDetails);
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
        )}
      </div>
    </Modal>
  );
};

export default EditOrganizationProfileModal;
