import React, { useContext } from "react";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useQueryClient } from "react-query";
import * as Yup from "yup";

import { IAuth } from "../../api/auth/IAuth";
import { FormTypes } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import RadioImages from "../../components/RadioImages/RadioImages";
import { AuthContext } from "../../context/AuthContext";

import "./CreateNewForm2.css"

interface CreateNewFormProps {
   request?: boolean;
}

export default function CreateNewForm2({ request }: CreateNewFormProps) {
   const queryClient = useQueryClient();
   const { currentUser } = useContext(AuthContext) as IAuth;

   const initialValues: FormTypes = {
      title: "",
      town: "",
      category: "",
      helpType: "",
      volunteerNum: 0,
      description: "",
   };

   const categories = ["DJECA I MLADI", "STARIJI", "OBITELJI", "BESKUĆNICI", "OVISNICI", "OSOBE S INVALIDITETOM", "RANJIVE SKUPINE",
      "OKOLIŠ", "ŽIVOTINJE", "OSTALO"];
   const categories_images = ["djeca_i_mladi", "stariji", "obitelji", "beskucnici", "ovisnici", "osobe_s_inv", "ranjive_skupine",
      "okolis", "zivotinje", "ostalo"];
   const categories_type_help = ["OBRAZOVANJE", "DONACIJE", "POPRAVCI", "RADIONICE", "ZDRAVLJE", "FIZIČKI POSLOVI", "ZABAVA", "OSTALO"];
   const categories_images_type_help = ["obrazovanje", "donacije", "popravci", "radionice", "zdravlje", "fizicki_poslovi", "zabava", "ostalo"];
   const helpTypes = ["EDUCATION", "SUPPORT", "HEALTH", "REPAIRS", "WORKSHOPS", "REST"];
   const ERROR = "input-error-form mt-3";

   const ValidationSchema = Yup.object().shape({
      title: Yup.string().required("Naziv oglasa je obavezan"),
      town: Yup.string()
         .oneOf(["ZAGREB", "SPLIT", "RIJEKA", "OSIJEK", "DUBROVNIK"], "Odabir grada je obavezan")
         .required("Odabir grada je obavezan"),
      category: Yup.string().required("Odabir kategorije obavezan"),
      helpType: Yup.string().required("Odabir vrste pomoći je obavezan"),
      volunteerNum: Yup.number().required("Broj potrebnih volontera je obavezan"),
      description: Yup.string().required("Opis je obavezan"),
   });

   const onSubmit = async (values: FormTypes, formikHelpers: FormikHelpers<FormTypes>) => {
      /*if (!request) {
         const data = {
            advertTitle: values.title,
            town: values.town,
            helpType: values.helpType,
            category: values.category,
            description: values.description,
            userId: currentUser?.id,
         };
         api({
            method: "post",
            url: "/advert",
            data: data,
         })
            .then((res) => {
               queryClient.refetchQueries(["myAdverts"]);
               console.log(res);
               formikHelpers.resetForm();
               formikHelpers.setErrors({});
            })
            .catch((err) => console.log(err));
      } else {
         const data = {
            association: currentUser?.userType === "ASSOCIATION",
            requestTitle: values.title,
            town: values.town,
            helpType: values.helpType,
            category: values.category,
            description: values.description,
            volunteerNum: values.volunteerNum,
            userId: currentUser?.id,
         };
         api({
            method: "post",
            url: "/request",
            data: data,
         })
            .then((res) => {
               queryClient.refetchQueries(["myRequests"]);
               console.log(res);
               formikHelpers.resetForm();
               formikHelpers.setErrors({});
            })
            .catch((err) => console.log(err));
      }*/
   };

   return (
      <>
         <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
               <Form className="grid grid-cols-2">
                  <div>
                     <div className="title-input-container my-2 flex w-full max-w-sm items-center justify-end">
                        <label htmlFor="title" className="formTitle mt-1 ml-1">
                           Naziv zahtjeva za pomoć
                        </label>
                        <div className="input-form relative w-full rounded-md">
                           <Field
                              type="text"
                              name="title"
                              placeholder="Upišite naziv oglasa"
                              className={touched && touched.title && errors && errors.title ? ERROR : " regInputCreateForm"}
                           />
                           {touched && touched.title && errors && errors.title && <p className="error">{errors.title}</p>}
                        </div>
                     </div>
                     <div className="title-input-container my-2 flex w-full max-w-sm items-center justify-end">
                        <label htmlFor="title" className="formTitle mt-1 ml-1">
                           Lokacija
                        </label>
                        <div className="title-input-desc ml-1">Definirajte lokaciju specifičnosti vlastitog izbora (npr. kvart).</div>
                        <div className="input-form relative w-full rounded-md">
                           <Field
                              type="text"
                              name="title"
                              placeholder="Upišite lokaciju"
                              className={touched && touched.title && errors && errors.title ? ERROR : " regInputCreateForm"}
                           />
                           {touched && touched.title && errors && errors.title && <p className="error">{errors.title}</p>}
                        </div>
                     </div>

                     <div className="mt-3">
                        <p className="formTitle mt-1 ml-1 mb-5">Skupina ljudi kojoj se pomoć pruža</p>
                        <RadioImages images={categories} categories_images={categories_images} name={"category"} />

                        {touched && touched.category && errors && errors.category && <p className="error">{errors.category}</p>}
                     </div>
                  </div>




                  <div className={"my-3 w-9/12"}>
                     <p className={"my-2 text-xl font-bold text-emerald-900"}>Kategorija vrste pomoći</p>
                     <RadioImages images={helpTypes} categories_images={categories_images} name={"helpType"} />
                     {touched && touched.helpType && errors && errors.helpType && <p className="error">{errors.helpType}</p>}
                  </div>
                  {request && (
                     <div className="my-2 flex w-2/3 max-w-sm items-center justify-end">
                        <label htmlFor="volunteerNum" className="pr-1 text-xl font-bold text-emerald-900">
                           Broj potrebnih volontera
                        </label>
                        <div className="relative w-2/3 rounded-md">
                           <Field
                              type="text"
                              name="volunteerNum"
                              placeholder="Upišite broj"
                              className={touched && touched.volunteerNum && errors && errors.volunteerNum ? ERROR : " regInput"}
                           />
                           {touched && touched.volunteerNum && errors && errors.volunteerNum && (
                              <p className="error">{errors.volunteerNum}</p>
                           )}
                        </div>
                     </div>
                  )}
                  <div className="flex w-11/12 items-end justify-between">
                     <div className="my-4 flex w-2/3 max-w-sm flex-col justify-end">
                        <label htmlFor="description" className="text-xl font-bold text-emerald-900">
                           Detaljniji opis pomoći
                        </label>
                        <Field
                           name="description"
                           as="textarea"
                           className={touched.description && errors.description ? ERROR : "regInput mt-3 pb-0"}
                           placeholder="Dodajte opis svom oglasu"
                        ></Field>
                        {touched && touched.description && errors && errors.description && (
                           <p className="error">{errors.description}</p>
                        )}
                     </div>
                     <button
                        disabled={isSubmitting}
                        type={"submit"}
                        className="m-3 rounded-3xl bg-orange-500 px-7 py-3 font-bold text-white hover:bg-orange-300"
                     >
                        STVORI OGLAS
                     </button>
                  </div>
               </Form>
            )}
         </Formik>
      </>
   );
}
