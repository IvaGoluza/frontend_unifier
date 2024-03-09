import React from "react";

import { Field } from "formik";

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
    <div className="ml-10 mt-10 h-full lg:w-full md:w-1/2">
      <div className="my-2 flex w-full flex-col flex-col items-start justify-end">
        <label htmlFor="description" className="formTitle">
          Opis potrebne pomoći
        </label>
        <Field
          name="description"
          as="textarea"
          className={touched.description && errors.description ? ERROR : "input-form-description w-9/12 mt-1 pb-0"}
          placeholder="Dodajte opis svom oglasu"
        />
        {touched.description && errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div className="my-4 flex flex-col justify-end">
        <label htmlFor="description" className="formTitle">
          Potrebna znanja i vještine
        </label>
        <Field
          name="skillSet"
          as="textarea"
          className={touched.skillSet && errors.skillSet ? ERROR : "input-form-description w-9/12 mt-1 pb-0"}
          placeholder="Dodajte potrebna znanja i vještine potrebne za ovaj zahtjev"
        ></Field>
        {touched && touched.skillSet && errors && errors.skillSet && <p className="error">{errors.skillSet}</p>}
      </div>

      <div className="my-4 flex w-full flex-col justify-end">
        <p className={"formTitle my-2 mb-2"}>Kategorija vrste pomoći</p>
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
      <div className="button-create-request mb-5 mr-10 mt-5 flex w-9/12 justify-center lg:justify-end">
        <button
          type={"submit"}
          className="font-krub rounded-[35px] sm:w-3/12 text-xs w-3/5 md:text-lg letter-spacing-0-06 bg-customPurple flex items-center justify-center p-2 font-bold text-white lg:p-4"
        >
          KREIRAJ ZAHTJEV
        </button>
      </div>
    </div>
  );
};

export default FormFieldSection;
