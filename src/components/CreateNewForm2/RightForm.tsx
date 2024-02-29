import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import RadioImages from "../RadioImages/RadioImages";
import Options from "../CheckBox/CheckBox";

import "./CreateNewForm2.css"

interface FormFieldSectionProps {
   touched: any;
   errors: any;
   isSubmitting: boolean;
   categories: string[];
   categories_images: string[];
   helpTypes: string[];
   categories_images_helpTypes: string[];
   request?: boolean;
}

const ERROR = "input-error-form mt-3";

const FormFieldSection: React.FC<FormFieldSectionProps> = ({
   touched,
   errors,
   isSubmitting,
   helpTypes,
   categories_images_helpTypes,
}) => {
   return (
      <div>
         <div className="my-2 flex w-2/3 max-w-sm flex-col justify-end">
            <label htmlFor="description" className="formTitle">
               Opis potrebne pomoći
            </label>
            <Field
               name="description"
               as="textarea"
               className={touched.description && errors.description ? ERROR : "regInput input-form-description mt-3 pb-0"}
               placeholder="Dodajte opis svom oglasu"
            />
            {touched.description && errors.description && <p className="error">{errors.description}</p>}
         </div>
         <div className="my-4 flex w-2/3 max-w-sm flex-col justify-end">
            <label htmlFor="description" className="formTitle">
               Potrebna znanja i vještine
            </label>
            <Field
               name="description"
               as="textarea"
               className={touched.description && errors.description ? ERROR : "regInput mt-3 pb-0"}
               placeholder="Dodajte potrebna znanja i vještine potrebne za ovaj zahtjev"
            ></Field>
            {touched && touched.description && errors && errors.description && (
               <p className="error">{errors.description}</p>
            )}
         </div>

         <div className={"my-3 w-9/12"}>
            <p className={"my-2 text-xl font-bold text-emerald-900 formTitle mb-4"}>Kategorija vrste pomoći</p>
            <RadioImages images={helpTypes} categories_images={categories_images_helpTypes} name={"helpType"} />
            {touched.helpType && errors.helpType && <p className="error">{errors.helpType}</p>}
         </div>

         <div className="flex button-create-request">
            <button
               disabled={isSubmitting}
               type={"submit"}
               className="font-krub font-bold letter-spacing-0-06 text-white"
            >
               KREIRAJ ZAHTJEV
            </button>
         </div>
      </div>

   );
};

export default FormFieldSection;
