import React, { useRef } from "react";

import { Formik, FormikHelpers, Form, Field, FormikProps } from "formik";
import * as Yup from "yup";

import api from "../../api/createAxiosClient";
import ModalBodyContainer from "../../components/DealsComponents/ModalBodyContainer";
import ModalContainer from "../../components/DealsComponents/ModalContainer";
import ModalFooterContainer from "../../components/DealsComponents/ModalFooterContainer";
import NavButton from "../../components/DealsComponents/NavButton";

interface ContractFormProps {
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  dealId?: number;
}

type ContractData = {
  volunteerPosition: string;
  volunteerWorkDescription: string;
};

const ValidationSchema = Yup.object().shape({
  volunteerPosition: Yup.string().required("Naziv je obavezan."),
  volunteerWorkDescription: Yup.string().required("Opis aktivnosti je obavezan."),
});

const initialValues: ContractData = {
  volunteerPosition: "",
  volunteerWorkDescription: "",
};

const ContractForm: React.FC<ContractFormProps> = ({ setActiveModal, dealId }) => {
  const formRef = useRef<FormikProps<ContractData>>(null);

  const onSubmit = async (values: ContractData, actions: FormikHelpers<ContractData>) => {
    const data = {
      volunteerPosition: values.volunteerPosition,
      volunteerWorkDescription: values.volunteerWorkDescription,
    };
    api
      .put(`/deal/volunteer-description/${dealId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setActiveModal("DEALS_TABLE");
        actions.resetForm();
      })
      .catch((err) => console.log(err));
  };

  const handleButtonClick = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <ModalContainer>
      <ModalBodyContainer padding="5">
        <img className="absolute right-2 rotate-12" src="../../../assets/svgs/logo.svg" alt="logo" />
        <h1 className="text-wrap mt-10 text-3xl font-black uppercase text-[#B0A9F9] sm:w-96 sm:text-4xl">
          ugovor o volontiranju
        </h1>
        <p className="mt-1 font-semibold italic text-[#07169B]">
          Ispunite i pošaljite potvrdu volontiranja volonteru Pero Perić.
        </p>
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="mt-6 box-content flex w-full flex-col">
              <div className="my-2 flex w-full flex-col items-start justify-start lg:w-4/5">
                <label htmlFor="volunteerPosition" className="italic text-[#07169B]">
                  Naziv volonterske pozicije
                </label>
                <div className="relative w-full rounded-md lg:w-2/3">
                  <Field
                    type="text"
                    name="volunteerPosition"
                    id="volunteerPosition"
                    className={
                      touched && touched.volunteerPosition && errors && errors.volunteerPosition
                        ? "input-error box-border"
                        : "regInput box-border bg-white"
                    }
                  />
                  {touched && touched.volunteerPosition && errors && errors.volunteerPosition && (
                    <p className="error">{errors.volunteerPosition}</p>
                  )}
                </div>
              </div>
              <div className="my-2 flex w-full flex-col items-start justify-start lg:w-4/5">
                <label htmlFor="volunteerWorkDescription" className="italic text-[#07169B]">
                  Opišite volontersku aktivnost ugovora
                </label>
                <div className="relative w-full rounded-md lg:w-2/3">
                  <Field
                    as="textarea"
                    name="volunteerWorkDescription"
                    id="volunteerWorkDescription"
                    className={
                      touched && touched.volunteerWorkDescription && errors && errors.volunteerWorkDescription
                        ? "input-error h-40 "
                        : "regInput h-40"
                    }
                  />
                  {touched && touched.volunteerWorkDescription && errors && errors.volunteerWorkDescription && (
                    <p className="error">{errors.volunteerWorkDescription}</p>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </ModalBodyContainer>
      <ModalFooterContainer>
        <NavButton leftOnly={true} rightOnly={false} onLeftClick={() => setActiveModal("DEALS_TABLE")} />
        <button
          type="button"
          onClick={handleButtonClick}
          className="absolute left-10 w-32 cursor-pointer rounded-full bg-[#5422E1] px-3 py-4 text-center font-bold uppercase text-white hover:tracking-widest sm:left-16 sm:px-10"
        >
          pošalji
        </button>
      </ModalFooterContainer>
    </ModalContainer>
  );
};

export default ContractForm;
