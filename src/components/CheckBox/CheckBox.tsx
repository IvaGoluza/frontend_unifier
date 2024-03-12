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
    <div className="grid grid-rows-2 h-24 md:h-16">
      <div className="option">
        <Field
          type="radio"
          id="jednokratna"
          name="typeOfAction"
          value="ONE_TIME"
          className={touched && touched.typeOfAction && errors && errors.typeOfAction ? ERROR : ""}
        />
        <label htmlFor="jednokratna"></label>
        <span className="pl-2 text-base">Jednokratna opcija</span>
      </div>
      <div className="option">
        <Field
          type="radio"
          id="dvokratna"
          name="typeOfAction"
          value="MULTIPLE_TIMES"
          className={touched && touched.typeOfAction && errors && errors.typeOfAction ? ERROR : " "}
        />
        <label htmlFor="dvokratna"></label>
        <span className="pl-2 text-base">Višekratna opcija</span>
      </div>
      {touched && touched.typeOfAction && errors && errors.typeOfAction && (
        <p className="error">{errors.typeOfAction}</p>
      )}
    </div>
  );
};

export default Options;
