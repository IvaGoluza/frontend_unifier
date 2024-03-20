import React from "react";

import { Field, useFormikContext } from "formik";
import "./radioImages.css";
import _ from "lodash";

interface images {
  images: string[];
  name: string;
}

export default function RadioImages({ images, name }: images) {
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      <Field name={name} validateOnChange={false} validateOnBlur={true}>
        {({ field, form }: { field: any; form: any }) => (
          <div className="image-container">
            {images.map((image) => (
              <label key={image}>
                <img
                  src={"../../../assets/images/optionsImages/" + image.toLowerCase() + ".png"}
                  alt={image}
                  className={field.value === image ? "selected" : ""}
                  onClick={() => setFieldValue(field.name, image)}
                />
              </label>
            ))}
            {_.get(form.errors, name) && _.get(form.touched, name) && <div>{_.get(form.touched, name)}</div>}
          </div>
        )}
      </Field>
    </div>
  );
}
