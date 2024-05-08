import React from "react";

import { Field } from "formik";

import RadioImages from "../RadioImages/RadioImages";

import "./CreateNewForm.css";

interface FormFieldSectionProps {
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
  isSubmitting: boolean;
  categories: string[];
  categories_images: string[];
  helpTypes: string[];
  categories_images_helpTypes: string[];
  request?: boolean;
  helpTypes_eng: string[];
}

const FormFieldSection: React.FC<FormFieldSectionProps> = ({
  touched,
  errors,
  helpTypes,
  categories_images_helpTypes,
  helpTypes_eng,
}) => {
  return (
    <div className="h-full w-11/12 min-[1100px]:mt-8 2xl:ml-10 2xl:ml-5 2xl:w-full">
      <div className="flex w-full flex-col flex-col items-start justify-end">
        <label htmlFor="description" className="formTitle">
          Opis potrebne pomoći
        </label>
        <Field
          name="description"
          as="textarea"
          className={
            touched.description && errors.description
              ? "mt-1 h-[10.3vh] w-11/12 rounded-lg border border-rose-400 px-1 py-1 pb-0 text-base text-gray-500 outline-none min-[640px]:w-9/12"
              : "mt-1 h-[10.6vh] w-11/12 rounded-lg border border-gray-300 px-1 py-1 pb-0 text-base text-gray-500 outline-none min-[640px]:w-9/12 "
          }
          placeholder="Treba mi pomoć iz matematike. Razred 7. osnovne. Muči me gradivo vektora..."
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
          className={
            touched.skillSet && errors.skillSet
              ? "mt-1 h-[10.3vh] w-11/12 rounded-lg border border-rose-400 px-1 py-1 pb-0 text-base text-gray-500 outline-none min-[640px]:w-9/12"
              : "mt-1 h-[10.6vh] w-11/12 rounded-lg border border-gray-300 px-1 py-1 pb-0 text-base text-gray-500 outline-none min-[640px]:w-9/12"
          }
          placeholder="U tijeku ili završena srednja škola. Dobro razumijevanje matematike..."
        ></Field>
        {touched && touched.skillSet && errors && errors.skillSet && <p className="error">{errors.skillSet}</p>}
      </div>

      <div className="my-4 flex w-full flex-col justify-end">
        <p className={"formTitle mb-2"}>Kategorija vrste pomoći</p>
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
          KREIRAJ ZAHTJEV
        </button>
      </div>
    </div>
  );
};

export default FormFieldSection;
