import React from "react";

import { Field, FormikTouched } from "formik";

import RadioImages from "../RadioImages/RadioImages";

import "./CreateNewForm2.css";

interface FormFieldSectionProps {
  touched: any;
  errors: any;
  isSubmitting: boolean;
  categories: string[];
  categories_images: string[];
  helpTypes: string[];
  categories_images_helpTypes: string[];
  request?: boolean;
  helpTypes_eng: string[];
}

const ERROR = "input-error-form mt-3";

const FormFieldSection: React.FC<FormFieldSectionProps> = ({
  touched,
  errors,
  helpTypes,
  categories_images_helpTypes,
  helpTypes_eng,
}) => {
  return (
    <div className="w-full">
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
          name="skillSet"
          as="textarea"
          className={touched.skillSet && errors.skillSet ? ERROR : "regInput input-form-description mt-3 pb-0"}
          placeholder="Dodajte potrebna znanja i vještine potrebne za ovaj zahtjev"
        ></Field>
        {touched && touched.skillSet && errors && errors.skillSet && <p className="error">{errors.skillSet}</p>}
      </div>

      <div className={"my-3 w-9/12"}>
        <p className={"formTitle my-2 mb-4 text-xl font-bold text-emerald-900"}>Kategorija vrste pomoći</p>
        <RadioImages
          images={helpTypes}
          categories_images={categories_images_helpTypes}
          eng_names={helpTypes_eng}
          name={"helpType"}
        />
        {touched.helpType && errors.helpType && <p className="error">{errors.helpType}</p>}
      </div>
    </div>
  );
};

export default FormFieldSection;
