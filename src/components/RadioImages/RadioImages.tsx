import React from "react";

import { Field, useFormikContext } from "formik";
import "./radioImages.css";
import _ from "lodash";

interface ImagesProps {
  images: string[];
  name: string;
  categories_images: string[];
  eng_names: string[];
  touched: { [key: string]: boolean };
  errors: { [key: string]: string };
}

export default function RadioImages({ images, name, categories_images, eng_names, touched, errors }: ImagesProps) {
  const { setFieldValue } = useFormikContext();

  const calculateImageContainerWidth = () => {
    if (name === "category") {
      return "w-1/6";
    } else if (name === "helpType") {
      return "w-1/5";
    }
  };

  return (
    <div
      className={
        errors && touched && errors[name] && touched[name]
          ? ` flex h-[15rem] items-center justify-center rounded-[15px] border-[1px] border-solid border-rose-400  ${
              name === "helpType" ? "w-11/12 sm:w-9/12" : "w-11/12 min-[640px]:w-9/12 min-[1100px]:w-11/12"
            }`
          : `flex h-[15rem] items-center justify-center rounded-[15px] border-[1px] border-solid border-[#07169B]  ${
              name === "helpType" ? "w-11/12 sm:w-9/12" : "w-11/12 min-[640px]:w-9/12 min-[1100px]:w-11/12"
            }`
      }
    >
      <Field name={name} validateOnChange={false} validateOnBlur={true}>
        {({ field, form }: { field: any; form: any }) => (
          <div className={"image-container flex h-full w-full flex-wrap content-around justify-around"}>
            {images.map((image, index) => (
              <label
                key={image}
                className={`text-wrap mb-1 mr-1 flex flex-col items-center justify-start px-1 text-center xl:px-2 ${calculateImageContainerWidth()}`}
              >
                {name === "category" && (
                  <img
                    src={`../../../assets/images/imagesForForm/${categories_images[index]}.png`}
                    className={
                      field.value === eng_names[index] ? "selected h-[4.5rem] w-[6.5rem]" : "h-[4.5rem] w-[6.5rem]"
                    }
                    onClick={() => setFieldValue(field.name, eng_names[index])}
                    alt={field.name}
                  />
                )}
                {name === "helpType" && (
                  <img
                    src={`../../../assets/images/imagesForFormTypeHelp/${categories_images[index]}.png`}
                    className={
                      field.value === eng_names[index] ? "selected h-[4.5rem] w-[6.5rem]" : "h-[4.5rem] w-[6.5rem]"
                    }
                    onClick={() => setFieldValue(field.name, eng_names[index])}
                    alt={field.name}
                  />
                )}

                <div className="h-fit w-[60px] text-center text-[9px] font-[720] leading-tight lg:w-[100px] 2xl:text-xs">
                  {image}
                </div>
              </label>
            ))}
            {_.get(form.errors, name) && _.get(form.touched, name) && <div>{_.get(form.touched, name)}</div>}
          </div>
        )}
      </Field>
    </div>
  );
}
