import React, { useRef, useState } from "react";

import hr from "date-fns/locale/hr";
import { Formik, FormikHelpers, Form, Field, FormikProps } from "formik";
import DatePicker, { registerLocale } from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";

import { DealType } from "./Deals";
import api from "../../api/createAxiosClient";
import ModalBodyContainer from "../../components/DealsComponents/ModalBodyContainer";
import ModalContainer from "../../components/DealsComponents/ModalContainer";
import ModalFooterContainer from "../../components/DealsComponents/ModalFooterContainer";
import NavButton from "../../components/DealsComponents/NavButton";

registerLocale("hr", hr);

interface CertificateFormProps {
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  dealData?: DealType;
}

type CertificateData = {
  volunteerRecension: string;
};

const ValidationSchema = Yup.object().shape({
  volunteerRecension: Yup.string().required("Recenzija je obavezna."),
});

const initialValues: CertificateData = {
  volunteerRecension: "",
};

const CertificateForm: React.FC<CertificateFormProps> = ({ setActiveModal, dealData }) => {
  const formRef = useRef<FormikProps<CertificateData>>(null);
  const [serverError, setServerError] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const onSubmit = async (values: CertificateData, actions: FormikHelpers<CertificateData>) => {
    const formattedStartDate = startDate
      ? startDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
      : "";
    let [month, day, year] = formattedStartDate.split("/");
    const formattedStartDateISO = `${year}-${month}-${day}`;

    const formattedEndDate = endDate
      ? endDate.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" })
      : "";
    [month, day, year] = formattedEndDate.split("/");
    const formattedEndDateISO = `${year}-${month}-${day}`;

    const data = {
      recension: values.volunteerRecension,
      startDate: formattedStartDateISO,
      endDate: formattedEndDateISO,
      dealId: dealData?.dealId,
      reviewingUserId: dealData?.volunteerId,
    };

    api
      .post("/recension", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setActiveModal("DEALS_TABLE");
        actions.resetForm();
      })
      .catch((err) => {
        setServerError(err.response.data);
      });
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
          Potvrda volontiranja
        </h1>
        <p className="mt-1 font-semibold italic text-[#07169B]">
          Ispunite i pošaljite potvrdu volontiranja volonteru {dealData?.volunteerName}.
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
                <label htmlFor="volunteerRecension" className="italic text-[#07169B]">
                  Opišite način rada volontera (ova poruka prikazivat će se javno na volonterskom profilu)
                </label>
                <div className="relative w-full rounded-md lg:w-2/3">
                  <Field
                    as="textarea"
                    id="volunteerRecension"
                    name="volunteerRecension"
                    className={
                      touched && touched.volunteerRecension && errors && errors.volunteerRecension
                        ? "input-error h-40 "
                        : "regInput h-40"
                    }
                  />
                  {touched && touched.volunteerRecension && errors && errors.volunteerRecension && (
                    <p className="error">{errors.volunteerRecension}</p>
                  )}
                </div>
              </div>
              <div className="my-2 flex w-full flex-col items-start justify-start lg:w-4/5">
                <label htmlFor="startDate" className="italic text-[#07169B]">
                  Odaberite datum početka volonterske aktivnosti
                </label>
                <div className="relative w-full rounded-md lg:w-2/3">
                  <DatePicker
                    id="startDate"
                    className="cursor-pointer rounded-lg bg-[#EAFAFF] text-center shadow-lg"
                    locale="hr"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="my-2 flex w-full flex-col items-start justify-start lg:w-4/5">
                <label htmlFor="endDate" className="italic text-[#07169B]">
                  Odaberite datum kraja volonterske aktivnosti
                </label>
                <div className="relative w-full rounded-md lg:w-2/3">
                  <DatePicker
                    id="endDate"
                    className="cursor-pointer rounded-lg bg-[#EAFAFF] text-center shadow-lg"
                    locale="hr"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
                {serverError.length > 0 && <p className="error">{serverError}</p>}
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

export default CertificateForm;
