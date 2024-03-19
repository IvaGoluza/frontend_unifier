import React, { useContext } from "react";

import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useQueryClient } from "react-query";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import FormFieldSection from "./RightForm";
import { IAuth } from "../../api/auth/IAuth";
import { FormTypes } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import RadioImages from "../../components/RadioImages/RadioImages";
import { AuthContext } from "../../context/AuthContext";
import Options from "../CheckBox/CheckBox";
import { CreateNewFormValidationSchemaForCreatingRequest } from "../Validation/Validation";

import "./CreateNewForm2.css";

interface CreateNewFormProps {
  request?: boolean;
  toggleFormVisibility: () => void;
}

export default function CreateNewForm2({ request, toggleFormVisibility }: CreateNewFormProps) {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext) as IAuth;

  const initialValues: FormTypes = {
    requestTitle: "",
    category: "",
    helpType: "",
    numOfVolunteers: "",
    description: "",
    location: "",
    time: "",
    typeOfAction: "",
    skillSet: "",
  };

  const categories = [
    "DJECA I MLADI",
    "STARIJI",
    "OBITELJI",
    "BESKUĆNICI",
    "OVISNICI",
    "OSOBE S INVALIDITETOM",
    "RANJIVE SKUPINE",
    "OKOLIŠ",
    "ŽIVOTINJE",
    "OSTALO",
  ];
  const categories_images = [
    "djeca_i_mladi",
    "stariji",
    "obitelji",
    "beskucnici",
    "ovisnici",
    "osobe_s_inv",
    "ranjive_skupine",
    "okolis",
    "zivotinje",
    "ostalo",
  ];
  const helpTypes = [
    "OBRAZOVANJE",
    "DONACIJE",
    "POPRAVCI",
    "RADIONICE",
    "ZDRAVLJE",
    "FIZIČKI POSLOVI",
    "ZABAVA",
    "OSTALO",
  ];
  const categories_images_helpTypes = [
    "obrazovanje",
    "donacije",
    "popravci",
    "radionice",
    "zdravlje",
    "fizicki_poslovi",
    "zabava",
    "ostalo",
  ];
  const categories_eng = [
    "CHILDREN_AND_YOUNGER",
    "ELDERLY",
    "FAMILY",
    "HOMELESS",
    "ADDICTS",
    "DISABLED",
    "VULNERABLE_GROUPS",
    "ENVIRONMENT",
    "ANIMALS",
    "OTHER",
  ];
  const helpTypes_eng = [
    "EDUCATION",
    "DONNATION",
    "REPAIRS",
    "WORKSHOPS",
    "HEALTH",
    "PHYSICAL_WORK",
    "ENTERTAINMENT",
    "OTHER",
  ];
  const ERROR = "input-error-form mt-3";
  const widthOfInput = "regInputCreateForm w-11/12 sm:px-1 sm:py-1 min-[640px]:w-9/12 sm:text-base text-xs p-1";

  const ValidationSchema = CreateNewFormValidationSchemaForCreatingRequest;

  const onSubmit = async (values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) => {
    const data = {
      requestTitle: values.requestTitle,
      helpType: values.helpType,
      category: values.category,
      description: values.description,
      numOfVolunteers: parseInt(values.numOfVolunteers, 10),
      location: values.location,
      time: values.time,
      skillSet: values.skillSet,
      typeOfAction: values.typeOfAction,
      userId: currentUser?.id,
    };
    api
      .post("/request", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        queryClient.refetchQueries(["myRequests"]);
        toast.success("Uspješno kreiran zahtjev!", {
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
        toast.error("Ponovo pokušajte stvoriti zahtjev", {
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
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting }) => (
          <Form className="request-form h-dvh sm:border-bold relative mb-4 ml-5 flex w-full flex-col items-center bg-gray-200 bg-white text-base sm:ml-0 sm:mt-4 sm:h-fit sm:w-10/12 sm:rounded-[25px] sm:border-[3px] sm:border-customBlueLight md:mb-1 min-[1100px]:grid min-[1100px]:grid-cols-2 min-[1100px]:pl-16 min-[1100px]:text-xl">
            <FontAwesomeIcon
              icon={faCircleXmark}
              onClick={toggleFormVisibility}
              className="absolute right-3 top-3 text-3xl text-gray-400 hover:scale-110"
            />
            <div className="mt-8 h-full flex  flex-col items-center w-11/12">
              <div className="title-input-container flex w-full items-start justify-end">
                <label htmlFor="title" className="formTitle ml-1 mt-1">
                  Naziv zahtjeva za pomoć
                </label>
                <div className="input-form relative w-full rounded-md">
                  <Field
                    type="text"
                    name="requestTitle"
                    placeholder="Instrukcije iz matematike"
                    className={touched && touched.requestTitle && errors && errors.requestTitle ? ERROR : widthOfInput}
                  />
                  {touched && touched.requestTitle && errors && errors.requestTitle && (
                    <p className="error">{errors.requestTitle}</p>
                  )}
                </div>
              </div>
              <div className="title-input-container mb-1 mt-1 flex w-full items-start justify-end sm:my-2">
                <label htmlFor="location" className="formTitle ml-1 mt-1">
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
                <label htmlFor="time" className="formTitle ml-1 mt-1">
                  Vrijeme
                </label>
                <div className="title-input-desc ml-1">
                  Definirajte vremenski interval u kojem Vam je pomoć potrebna.
                </div>
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
              <div className="mt-3 w-full">
                <p className="formTitle mb-2 ml-1 mt-1">Skupina ljudi kojoj se pomoć pruža</p>
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
              <div className="mt-5 flex w-full flex-col min-[1100px]:h-[8rem] min-[1000px]:flex-row">
                <div className="my-2 mr-5 flex w-8/12 sm:w-10/12 flex-col items-start justify-start">
                  <label htmlFor="numOfVolunteers" className="formTitle mb-2">
                    Broj potrebnih volontera
                  </label>
                  <div className="title-input-container">
                    <div className="relative w-1/3 rounded-md">
                      <Field
                        type="text"
                        name="numOfVolunteers"
                        placeholder="1"
                        className={
                          touched && touched.numOfVolunteers && errors && errors.numOfVolunteers
                            ? "inputNumOfVol-error text-center"
                            : "inputNumOfVol text-center sm:w-[2vw] w-[6vw]"
                        }
                      />
                      {touched && touched.numOfVolunteers && errors && errors.numOfVolunteers && (
                        <p className="error w-48">{errors.numOfVolunteers}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="sm:my-2 mb-4 flex w-full items-center justify-start lg:justify-center">
                  <Options touched={touched} errors={errors} isSubmitting={isSubmitting} ERROR={ERROR} />
                </div>
              </div>
            </div>
            <FormFieldSection
              touched={touched}
              errors={errors}
              isSubmitting={isSubmitting}
              categories={categories}
              categories_images={categories_images}
              helpTypes={helpTypes}
              categories_images_helpTypes={categories_images_helpTypes}
              request={request}
              helpTypes_eng={helpTypes_eng}
            />
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
}
