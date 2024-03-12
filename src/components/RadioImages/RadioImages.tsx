import React from "react";
import { Field, useFormikContext } from "formik";
import "./radioImages.css";
import _ from "lodash";

interface ImagesProps {
  images: string[];
  name: string;
  categories_images: string[];
  eng_names: string[];
  touched: any;
  errors: { [key: string]: string };
}

export default function RadioImages({ images, name, categories_images, eng_names, touched, errors }: ImagesProps) {
  const { setFieldValue } = useFormikContext();
  return (
    <div
      className={
        errors && touched && errors[name] && touched[name]
          ? "border-1 flex w-4/5 items-center justify-center rounded-md border border-red-500 image-container-form-" +
          name
          : `image-container-form lg:h-64 flex items-center justify-center ${name === 'helpType' ? 'w-11/12 sm:w-9/12' : 'w-11/12'}`

      }
    >
      <Field name={name} validateOnChange={false} validateOnBlur={true}>
        {({ field, form }: { field: any; form: any }) => (
          <div className={`image-container flex w-11/12  ${name === 'helpType' ? 'image-container-helpType' : 'image-container-categories'}`}>
            {images.map((image, index) => (
              <label key={image}>
                {name === "category" && (
                  <img
                    src={`../../../assets/images/imagesForForm/${categories_images[index]}.png`}
                    className={field.value === eng_names[index] ? "selected" : ""}
                    onClick={() => setFieldValue(field.name, eng_names[index])}
                  />
                )}

                {name === "helpType" && (
                  <img
                    src={`../../../assets/images/imagesForFormTypeHelp/${categories_images[index]}.png`}
                    className={field.value === eng_names[index] ? "selected" : ""}
                    onClick={() => setFieldValue(field.name, eng_names[index])}
                  />
                )}

                <div className="image-desc">{image}</div>
              </label>
            ))}
            {_.get(form.errors, name) && _.get(form.touched, name) && <div>{_.get(form.touched, name)}</div>}
          </div>
        )}
      </Field>
    </div>
  );
}
