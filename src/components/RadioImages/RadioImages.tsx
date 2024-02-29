import React from "react";
import { Field, useFormikContext } from "formik";
import "./radioImages.css";
import _ from "lodash";

interface ImagesProps {
  images: string[];
  name: string;
  categories_images: string[];
}

export default function RadioImages({ images, name, categories_images }: ImagesProps) {
  const { setFieldValue } = useFormikContext();

  return (
    <div className={"image-container-form image-container-form-" + name}>
      <Field name={name} validateOnChange={false} validateOnBlur={true}>
        {({ field, form }: { field: any; form: any }) => (
          <div className="image-container flex">
            {images.map((image, index) => (
              <label key={image}>
                {(name === "category") && (
                  <img
                    src={`../../../assets/images/imagesForForm/${categories_images[index]}.png`}
                    className={field.value === image ? "selected" : ""}
                    onClick={() => setFieldValue(field.name, image)}
                  />
                )}

                {(name === "helpType") && (
                  <img
                    src={`../../../assets/images/imagesForFormTypeHelp/${categories_images[index]}.png`}
                    className={field.value === image ? "selected" : ""}
                    onClick={() => setFieldValue(field.name, image)}
                  />
                )}

                <div className="image-desc">{image}</div>
              </label>
            ))}
            {_.get(form.errors, name) && _.get(form.touched, name) && (
              <div>{_.get(form.touched, name)}</div>
            )}
          </div>
        )}
      </Field>
    </div>
  );
}
