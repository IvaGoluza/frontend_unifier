import React, { useContext, useState } from "react";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useQueryClient } from "react-query";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import SearchVolunteers from "./SearchVolunteers";
import { IAuth } from "../../api/auth/IAuth";
import api from "../../api/createAxiosClient";
import { AuthContext } from "../../context/AuthContext";
import {
  categories_images,
  categories,
  categories_eng,
  categories_images_helpTypes,
  helpTypes_eng,
  helpTypes,
} from "../CreateNewForm/CreateNewForm";
import RadioImages from "../RadioImages/RadioImages";
import { CreateNewFormValidationSchemaForCreatingAdvert } from "../Validation/Validation";

import "../CreateNewForm/CreateNewForm.css";

interface CreateNewFormProps {
  toggleFormVisibility: () => void;
}

export interface NewAdvertFormTypes {
  advertTitle: string;
  location: string;
  helpType: string;
  category: string;
  description: string;
  time: string;
  helpersId?: number[];
}

export default function CreateNewAdvert({ toggleFormVisibility }: CreateNewFormProps) {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext) as IAuth;

  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setImage(file);
    setImageName(file ? file.name : "");
  };

  const initialValues: NewAdvertFormTypes = {
    advertTitle: "",
    location: "",
    helpType: "",
    category: "",
    description: "",
    time: "",
    helpersId: [],
  };

  const ERROR = "input-error-form mt-3";
  const widthOfInput = "regInputCreateForm w-11/12 sm:px-1 sm:py-1 min-[640px]:w-9/12 sm:text-base text-xs p-1";

  const ValidationSchema = CreateNewFormValidationSchemaForCreatingAdvert;

  const onSubmit = async (values: NewAdvertFormTypes, formikHelpers: FormikHelpers<NewAdvertFormTypes>) => {
    const data = {
      advertTitle: values.advertTitle,
      location: values.location,
      helpType: values.helpType,
      category: values.category,
      description: values.description,
      time: values.time,
      userId: currentUser?.id,
      helpersId: values.helpersId,
    };

    if (image === null) {
      api
        .post("/advert", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          queryClient.refetchQueries(["myRequests"]);
          toast.success("Uspješno kreiran oglas!", {
            // eslint-disable-next-line sonarjs/no-duplicate-string
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          formikHelpers.resetForm();
          formikHelpers.setErrors({});
          setTimeout(() => {
            toggleFormVisibility();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ponovno pokušajte stvoriti oglas.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    } else {
      const formData = new FormData();
      console.log(data);
      formData.append("advertDTO", new Blob([JSON.stringify(data)], { type: "application/json" }));

      if (image) {
        formData.append("file", image);
      }
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      api
        .post("/advert/with-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          queryClient.refetchQueries(["myRequests"]);
          toast.success("Uspješno kreiran oglas!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          formikHelpers.resetForm();
          formikHelpers.setErrors({});
          setTimeout(() => {
            toggleFormVisibility();
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Ponovno pokušajte stvoriti oglas.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        });
    }
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={onSubmit}>
        {}
        {({ errors, touched }) => (
          <Form className="request-form h-dvh sm:border-bold sm:border-customBlueLight relative mb-4 ml-5 flex w-full flex-col items-center bg-gray-200 bg-white pt-12 text-base sm:ml-0 sm:mt-4 sm:h-fit sm:w-10/12 sm:rounded-[25px] sm:border-[3px] md:mb-1 min-[1100px]:grid min-[1100px]:grid-cols-2 min-[1100px]:px-10 min-[1100px]:text-xl">
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={toggleFormVisibility}
              className="absolute right-3 top-3 text-3xl text-gray-400 hover:scale-110"
            />
            <div className="mt-8 flex h-full w-11/12 flex-col items-start lg:pl-12">
              <div className="title-input-container flex w-full items-start justify-end">
                <label htmlFor="advertTitle" className="inputLabel ml-1 mt-1">
                  Naziv oglasa za pomoć
                </label>
                <div className="input-form relative w-full rounded-md">
                  <Field
                    type="text"
                    name="advertTitle"
                    placeholder="Instrukcije iz matematike"
                    className={touched && touched.advertTitle && errors && errors.advertTitle ? ERROR : widthOfInput}
                  />
                  {touched && touched.advertTitle && errors && errors.advertTitle && (
                    <p className="error">{errors.advertTitle}</p>
                  )}
                </div>
              </div>
              <div className="title-input-container mb-1 mt-1 flex w-full items-start justify-end sm:my-2">
                <label htmlFor="location" className="inputLabel ml-1 mt-1">
                  Lokacija
                </label>
                <div className="title-input-desc ml-1">
                  Definirajte lokaciju specifičnosti vlastitog izbora (npr. kvart).
                </div>
                <div className="input-form relative w-full rounded-md">
                  <Field
                    type="text"
                    name="location"
                    placeholder="Jarun"
                    className={touched && touched.location && errors && errors.location ? ERROR : widthOfInput}
                  />
                  {touched && touched.location && errors && errors.location && (
                    <p className="error">{errors.location}</p>
                  )}
                </div>
              </div>
              <div className="title-input-container mb-1 mt-1 flex w-full items-start justify-end sm:my-2">
                <label htmlFor="time" className="inputLabel ml-1 mt-1">
                  Vrijeme
                </label>
                <div className="title-input-desc ml-1">Definirajte vremenski interval u kojem možete pomoći.</div>
                <div className="input-form relative w-full rounded-md">
                  <Field
                    type="text"
                    name="time"
                    placeholder="20.-28. veljače 2024."
                    className={touched && touched.time && errors && errors.time ? ERROR : widthOfInput}
                  />
                  {touched && touched.time && errors && errors.time && <p className="error">{errors.time}</p>}
                </div>
              </div>
              <div className="flex w-full flex-col flex-col items-start justify-end">
                <label htmlFor="description" className="inputLabel">
                  Opis volonterske aktivnosti
                </label>
                <Field
                  name="description"
                  as="textarea"
                  className={
                    touched.description && errors.description
                      ? "mt-1 h-[10.3vh] w-11/12 rounded-lg border border-rose-400 px-1 py-1 pb-0 text-base text-gray-500 outline-none min-[640px]:w-9/12"
                      : "mt-1 h-[10.6vh] w-11/12 rounded-lg border border-gray-300 px-1 py-1 pb-0 text-base text-gray-500 outline-none min-[640px]:w-9/12 "
                  }
                  placeholder="Nudim pomoć u obliku instrukcija iz predmeta osnovne i srednje škole..."
                />
                {touched.description && errors.description && <p className="error">{errors.description}</p>}
              </div>

              <div className="flex w-full flex-col flex-col items-start justify-end">
                <label htmlFor="criminalRecordCertificate" className="inputLabel">
                  Prigodna slika oglasa
                </label>
                <div className="fileInputContainer">
                  <input
                    type="file"
                    name="certificate"
                    id="certificate"
                    className="fileInput"
                    onChange={(e) => handleFileChange(e)}
                  />
                  <label
                    htmlFor="certificate"
                    className="rounded-lg p-2 text-sm"
                    style={{ backgroundColor: "#ccc", color: "#010159" }}
                  >
                    Odaberi sliku
                  </label>
                  {imageName && <div className="fileName">{imageName}</div>}
                </div>
                <div className="max-w-80 mt-3 w-2/4">
                  <label htmlFor="criminalRecordCertificate" className="inputLabel">
                    Dodajte volontere
                  </label>
                  <SearchVolunteers userId={currentUser?.id} />
                </div>
              </div>
              <div className="mt-5 flex w-full flex-col min-[1000px]:flex-row min-[1100px]:h-[8rem]"></div>
            </div>
            <div className="h-full w-11/12 min-[1100px]:mt-8 2xl:ml-10 2xl:ml-5 2xl:w-full">
              <div className="mt-3 w-full">
                <p className="inputLabel mb-2 ml-1 mt-1">Skupina ljudi kojoj se pomoć pruža</p>
                <RadioImages
                  images={categories}
                  categories_images={categories_images}
                  eng_names={categories_eng}
                  touched={touched}
                  errors={errors}
                  name={"category"}
                />
                {touched && touched.category && errors && errors.category && <p className="error">{errors.category}</p>}
              </div>
              <div className="my-4 flex w-full flex-col justify-end">
                <p className={"inputLabel mb-2"}>Kategorija vrste pomoći</p>
                <RadioImages
                  images={helpTypes}
                  categories_images={categories_images_helpTypes}
                  eng_names={helpTypes_eng}
                  name={"helpType"}
                  touched={touched}
                  errors={errors}
                />
                {touched.helpType && errors.helpType && <p className="error">{errors.helpType}</p>}
              </div>
              <div className="button-create-request mb-5 mr-10 mt-10 flex w-11/12 justify-center lg:w-9/12 lg:justify-end">
                <button
                  type={"submit"}
                  className="letter-spacing-0-06 font-krub flex h-[2rem] w-2/5 items-center justify-center rounded-[35px] bg-[#5422E1] p-2 text-xs font-bold text-white lg:p-4 lg:text-sm min-[1100px]:w-6/12 min-[1400px]:h-[2rem] min-[1400px]:w-5/12 2xl:text-lg"
                >
                  KREIRAJ OGLAS
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}
