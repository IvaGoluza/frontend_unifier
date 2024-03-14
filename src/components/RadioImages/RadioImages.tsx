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
          ? `flex items-center justify-center rounded-[15px] border-[1px] border-solid border-rose-400 p-4w-11/12 min-[700px]:w-8/12  ${name === "helpType" ? "min-[1000px]:w-5/12 min-[1200px]:w-9/12" : ""}`
          : `flex items-center justify-center rounded-[15px] border-[1px] border-solid border-[#07169B] p-4 w-11/12  min-[700px]:w-8/12 min-[1100px]:w-11/12  ${name === "helpType" ? "min-[1000px]:w-5/12 min-[1200px]:w-9/12" : ""
          }`
      }
    >
      <Field name={name} validateOnChange={false} validateOnBlur={true}>
        {({ field, form }: { field: any; form: any }) => (
          <div className={"image-container flex h-full w-full flex-wrap content-around justify-around"}>
            {images.map((image, index) => (
              <label
                key={image}
                className={`text-wrap mr-1 flex flex-col items-center justify-start text-center xl:px-2 mb-1  min-[1200px]:w-[4rem] min-[1200px]:h-[4.5rem] min-[1300px]:w-[4.5rem] min-[1300px]:h-[5rem] min-[1400px]:w-[5rem] min-[1400px]:h-[5.5rem] min-[1500px]:w-[5.8rem] min-[1500px]:h-[6rem] min-[1650px]:w-[7rem] min-[1650px]:h-[7rem] ${name === "helpType" ? "w-16 min-[480px]:w-[5rem] min-[580px]:w-[5.5rem] min-[620px]:w-[5.5rem]  min-[730px]:w-[5.8rem] min-[760px]:w-[6rem] min-[500px]:h-[5rem]" : "w-[3.5rem] min-[900px]:w-[4.5rem]"
                  }`}
              >
                {name === "category" && (
                  <img
                    src={`../../../assets/images/imagesForForm/${categories_images[index]}.png`}
                    className={
                      field.value === eng_names[index]
                        ? "selected h-[4rem] w-[6.5rem]"
                        : "h-[4.5rem] w-[6.5rem]"
                    }
                    onClick={() => setFieldValue(field.name, eng_names[index])}
                  />
                )}

                {name === "helpType" && (
                  <img
                    src={`../../../assets/images/imagesForFormTypeHelp/${categories_images[index]}.png`}
                    className={
                      field.value === eng_names[index]
                        ? "selected h-[4.5rem] w-[6.5rem]"
                        : "h-[4.5rem] w-[6.5rem]"
                    }
                    onClick={() => setFieldValue(field.name, eng_names[index])}
                  />
                )}

                <div className="h-fit w-[60px] text-center text-[8px] font-[720] leading-tight text-[9px] 2xl:text-xs lg:w-[100px]">
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
