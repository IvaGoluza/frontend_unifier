import React, { useContext } from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useQueryClient } from "react-query";
import * as Yup from "yup";

import { IAuth } from "../../api/auth/IAuth";
import { FormTypes } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import { AuthContext } from "../../context/AuthContext";

import Options from "../CheckBox/CheckBox";
import RadioImages from "../../components/RadioImages/RadioImages";
import { CreateNewFormValidationSchema } from "../Validation/Validation";

import "./CreateNewForm2.css";
import FormFieldSection from "./RightForm";

interface CreateNewFormProps {
  request?: boolean;
}

export default function CreateNewForm2({ request }: CreateNewFormProps) {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext) as IAuth;

  const initialValues: FormTypes = {
    requestTitle: "",
    category: "",
    helpType: "",
    numOfVolunteers: "0",
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
    "SUPPORT",
    "REPAIRS",
    "WORKSHOPS",
    "HEALTH",
    "PHYSICAL_WORK",
    "ENTERTAINMENT",
    "OTHER",
  ];
  const ERROR = "input-error-form mt-3";

  const ValidationSchema = CreateNewFormValidationSchema;

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
    console.log(data);
    api
      .post("/request", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        //queryClient.refetchQueries(["myRequests"]);
        console.log(res);
        formikHelpers.resetForm();
        formikHelpers.setErrors({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        //validationSchema={ValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex-col justify-center text-sm lg:grid lg:grid-cols-2 lg:text-xl">
            <div className="mr-5">
              <div className="title-input-container my-2 flex w-full max-w-sm items-start justify-end">
                <label htmlFor="title" className="formTitle ml-1 mt-1">
                  Naziv zahtjeva za pomoć
                </label>
                <div className="input-form relative w-full rounded-md">
                  <Field
                    type="text"
                    name="requestTitle"
                    placeholder="Upišite naziv oglasa"
                    className={
                      touched && touched.requestTitle && errors && errors.requestTitle ? ERROR : " regInputCreateForm"
                    }
                  />
                  {touched && touched.requestTitle && errors && errors.requestTitle && (
                    <p className="error">{errors.requestTitle}</p>
                  )}
                </div>
              </div>
              <div className="title-input-container my-2 flex w-full max-w-sm items-start justify-end">
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
                    placeholder="Upišite lokaciju"
                    className={touched && touched.location && errors && errors.location ? ERROR : " regInputCreateForm"}
                  />
                  {touched && touched.location && errors && errors.location && (
                    <p className="error">{errors.location}</p>
                  )}
                </div>
              </div>
              <div className="title-input-container my-2 flex w-full max-w-sm items-start justify-end">
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
                    placeholder="Upišite vrijeme"
                    className={touched && touched.time && errors && errors.time ? ERROR : " regInputCreateForm"}
                  />
                  {touched && touched.time && errors && errors.time && <p className="error">{errors.time}</p>}
                </div>
              </div>
              <div className="mt-3">
                <p className="formTitle mb-5 ml-1 mt-1">Skupina ljudi kojoj se pomoć pruža</p>
                <RadioImages
                  images={categories}
                  categories_images={categories_images}
                  eng_names={categories_eng}
                  name={"category"}
                />
                {touched && touched.category && errors && errors.category && <p className="error">{errors.category}</p>}
              </div>
              {request && (
                <div className="title-input-container my-2 mt-5 flex w-full max-w-sm items-start justify-end">
                  <label htmlFor="volunteerNum" className="formTitle">
                    Broj potrebnih volontera
                  </label>
                  <div className="title-input-container">
                    <div className="relative w-1/3 rounded-md">
                      <Field
                        type="text"
                        name="numOfVolunteers"
                        placeholder="Upišite broj"
                        className={
                          touched && touched.numOfVolunteers && errors && errors.numOfVolunteers
                            ? ERROR
                            : "regInputCreateForm inputNumOfVol"
                        }
                      />
                      {touched && touched.numOfVolunteers && errors && errors.numOfVolunteers && (
                        <p className="error">{errors.numOfVolunteers}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="my-2 mb-10 mt-10 flex w-full max-w-sm justify-start">
                <Options />
              </div>
            </div>
            <div className="">
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
              <div className="button-create-request flex justify-end">
                <button
                  type={"submit"}
                  disabled={isSubmitting}
                  className="font-krub letter-spacing-0-06 mb-5 flex items-center justify-center p-2 font-bold text-white lg:p-4"
                >
                  KREIRAJ ZAHTJEV
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
