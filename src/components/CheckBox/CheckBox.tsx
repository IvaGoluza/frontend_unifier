import React from "react";

import "./CheckBox.css";
import { Field } from "formik";

interface OptionsProps {
  touched: any;
  errors: any;
  isSubmitting: boolean;
  ERROR: string;
}

const Options: React.FC<OptionsProps> = ({ touched, errors, isSubmitting, ERROR }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="option my-1 lg:m-2">
        <Field
          type="radio"
          id="jednokratna"
          name="typeOfAction"
          value="ONE_TIME"
          className={touched && touched.typeOfAction && errors && errors.typeOfAction ? ERROR : ""}
        />
        <label htmlFor="jednokratna" className={touched && touched.typeOfAction && errors && errors.typeOfAction ? "option-label-error" : "option-label"}></label>
        <span className="formTitle pl-2 text-base lg:text-xl">Jednokratna opcija</span>
      </div>
      <div className="option my-1 lg:m-2">
        <Field
          type="radio"
          id="dvokratna"
          name="typeOfAction"
          value="MULTIPLE_TIMES"
          className={touched && touched.typeOfAction && errors && errors.typeOfAction ? ERROR : " "}
        />
        <label htmlFor="dvokratna" className={touched && touched.typeOfAction && errors && errors.typeOfAction ? "option-label-error" : "option-label"}></label>
        <span className="pl-2 text-base lg:text-xl">Višekratna opcija</span>
      </div>
      {touched && touched.typeOfAction && errors && errors.typeOfAction && (
        <p className="error ml-1">{errors.typeOfAction}</p>
      )}
    </div>
  );
};

export default Options;
