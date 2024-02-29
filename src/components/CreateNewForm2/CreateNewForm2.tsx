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

import "./CreateNewForm2.css"
import FormFieldSection from "./RightForm";

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
   const helpTypes = ["OBRAZOVANJE", "DONACIJE", "POPRAVCI", "RADIONICE", "ZDRAVLJE", "FIZIČKI POSLOVI", "ZABAVA", "OSTALO"];
   const categories_images_helpTypes = ["obrazovanje", "donacije", "popravci", "radionice", "zdravlje", "fizicki_poslovi", "zabava", "ostalo"];
   const ERROR = "input-error-form mt-3";

   const ValidationSchema = CreateNewFormValidationSchema;

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
               <Form className="grid grid-cols-2 new-form-container">
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
                     <div className="title-input-container my-2 flex w-full max-w-sm items-center justify-end">
                        <label htmlFor="title" className="formTitle mt-1 ml-1">
                           Vrijeme
                        </label>
                        <div className="title-input-desc ml-1">Definirajte vremenski interval u kojem Vam je pomoć potrebna.</div>
                        <div className="input-form relative w-full rounded-md">
                           <Field
                              type="text"
                              name="title"
                              placeholder="Upišite vrijeme"
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
                     {request && (
                        <div className="title-input-container my-2 flex w-full max-w-sm items-center justify-end mt-5">
                           <label htmlFor="volunteerNum" className="formTitle">
                              Broj potrebnih volontera
                           </label>
                           <div className="title-input-container-numberOfVol">
                              <div className="relative w-1/3 rounded-md">
                                 <Field
                                    type="text"
                                    name="volunteerNum"
                                    placeholder="Upišite broj"
                                    className={touched && touched.volunteerNum && errors && errors.volunteerNum ? ERROR : "regInputCreateForm inputNumOfVol"}
                                 />
                                 {touched && touched.volunteerNum && errors && errors.volunteerNum && (
                                    <p className="error">{errors.volunteerNum}</p>
                                 )}
                              </div>

                           </div>

                        </div>
                     )}
                     <div className="my-2 flex w-full max-w-sm justify-start mt-10">
                        <Options />
                     </div>

                  </div>
                  <div><FormFieldSection
                     touched={touched}
                     errors={errors}
                     isSubmitting={isSubmitting}
                     categories={categories}
                     categories_images={categories_images}
                     helpTypes={helpTypes}
                     categories_images_helpTypes={categories_images_helpTypes}
                     request={request}
                  /></div>
               </Form>
            )}
         </Formik>
      </>
   );
}
