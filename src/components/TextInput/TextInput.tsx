import React from "react";

import { Field, FormikErrors, FormikTouched } from "formik";
import _ from "lodash";

export type FormikTextInputType = "text" | "password" | "number";

interface TextInputProps<T> {
  name: string;
  className?: string;
  errors?: FormikErrors<T>;
  type?: FormikTextInputType;
  label?: string;
  placeholder?: string;
  touched?: FormikTouched<T>;
}

export default function TextInput<T>({
  name,
  className,
  errors,
  type,
  label,
  placeholder,
  touched,
}: TextInputProps<T>) {
  const hasErrors = errors && _.get(errors, name) && touched && _.get(touched, name);

  return (
    <div className="max-w-80 w-2/4">
      {label && (
        <label htmlFor={name as string} className="inputLabel">
          {label}
        </label>
      )}
      <div className="relative rounded-md">
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className={touched && hasErrors ? "input-error" : className}
        />
        {hasErrors && <p className="error">{_.get(errors, name) as string}</p>}
      </div>
    </div>
  );
}
