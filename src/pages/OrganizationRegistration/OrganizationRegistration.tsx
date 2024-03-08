import React, { useContext, useState } from "react";

import { Formik, FormikHelpers, Form, Field, ErrorMessage, FormikErrors, FormikTouched } from "formik";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

import { IAuth } from "../../api/auth/IAuth";
import "./organizationRegistration.css";
import { OrganizationRegistrationForm } from "../../api/auth/types";
import { routes } from "../../api/paths";
import TextInput from "../../components/TextInput/TextInput";
import { AuthContext } from "../../context/AuthContext";

const ValidationSchema = (step: number) => {
  switch (step) {
    case 1:
      return Yup.object().shape({
        name: Yup.string().required("Naziv organizacije je obavezan"),
        oib: Yup.string().required("OIB organizacije je obavezan"),
        type: Yup.string().required("Vrsta organizacije je obavezna"),
        email: Yup.string().email("Email adresa nije valjana").required("Email je obavezan"),
        mobilePhone: Yup.string().when("userType", {
          is: (val: string) => !!val,
          then: Yup.string().required("Broj mobitela je obavezan"),
        }),
      });
    case 2:
      return Yup.object().shape({
        address: Yup.object().shape({
          townName: Yup.string().required("Ime mjesta je obavezno"),
          postcode: Yup.string().required("Poštanski broj je obavezan"),
          streetName: Yup.string().required("Ime ulice je obavezno"),
        }),
        volunteerCenter: Yup.string()
          .oneOf(
            [
              "OSIJEK",
              "RIJEKA",
              "SPLIT",
              "ZADAR",
              "ZAGREB",
              "BELISCE",
              "DUBROVNIK",
              "SLAVONSKI_BROD",
              "SISAK",
              "MEDJIMURJE",
            ],
            "Odabir volonterskog centra je obavezan"
          )
          .required("Odabir volonterskog centra je obavezan"),
      });
    case 3:
      return Yup.object().shape({
        password: Yup.string().required("Lozinka je obavezna").min(8, "Lozinka mora imati barem 8 znakova"),
        controlPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Lozinke moraju biti iste")
          .required("Ponovljena lozinka je obavezna"),
        url: Yup.string().url("URL nije valjan"),
      });
    default:
      return Yup.object();
  }
};

const initialValues: OrganizationRegistrationForm = {
  name: "",
  oib: "",
  type: "",
  email: "",
  mobilePhone: "",
  volunteerCenter: "",
  password: "",
  controlPassword: "",
  address: {
    townName: "",
    postcode: "",
    streetName: "",
  },
  userType: {
    volunteer: false,
    helpRecipient: false,
  },
  url: "",
};

const roles = [
  { id: "VOLUNTEER", label: "organizirati volonterske akcije i pružati pomoć" },
  { id: "VOLUNTEER_AND_PERSON_IN_NEED", label: "volontirati, ali i potražiti pomoć drugih volontera" },
  { id: "PERSON_IN_NEED", label: "pronaći volontere za svoje volonterske akcije" },
];

const OrganizationRegistration = () => {
  const { signupOrganization } = useContext(AuthContext) as IAuth;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const onSubmit = async (
    values: OrganizationRegistrationForm,
    actions: FormikHelpers<OrganizationRegistrationForm>
  ) => {
    setServerError(false);
    const userType = {
      volunteer: selectedRole === "VOLUNTEER" || selectedRole === "VOLUNTEER_AND_PERSON_IN_NEED",
      helpRecipient: selectedRole === "PERSON_IN_NEED" || selectedRole === "VOLUNTEER_AND_PERSON_IN_NEED",
    };

    const organizationData = {
      ...values,
      userType,
    };
    console.log(organizationData.address);
    console.log("aaa" + organizationData);
    const result = await signupOrganization(organizationData);
    if (result.valueOf()) {
      navigate("/login");
      actions.resetForm();
    } else {
      setServerError(true);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  function renderStepOne(
    errors: FormikErrors<OrganizationRegistrationForm>,
    touched: FormikTouched<OrganizationRegistrationForm>
  ) {
    return (
      <>
        <div className="max-w-80 w-2/4">
          <label htmlFor="userType" className="inputLabel">
            Uloga
          </label>
          {roles.map((role) => (
            <label key={role.id} className="checkboxContainer">
              <input
                type="checkbox"
                name="userType"
                checked={selectedRole === role.id}
                onChange={() => setSelectedRole(selectedRole === role.id ? "" : role.id)}
              />
              {role.label}
              <span className="checkmark"></span>
            </label>
          ))}
          <ErrorMessage name="userType" component="p" className="error" />
        </div>
        <TextInput
          name="name"
          className="regInput"
          label="Naziv organizacije"
          type="text"
          errors={errors}
          placeholder="Unesite naziv organizacije"
          touched={touched}
        />
        <TextInput
          name="oib"
          className="regInput"
          label="OIB organizacije"
          type="text"
          errors={errors}
          placeholder="Unesite OIB organizacije"
          touched={touched}
        />
        <TextInput
          name="type"
          className="regInput"
          label="Vrsta organizacije"
          type="text"
          errors={errors}
          placeholder="Unesite vrstu organizacije"
          touched={touched}
        />
      </>
    );
  }

  function renderStepTwo(
    errors: FormikErrors<OrganizationRegistrationForm>,
    touched: FormikTouched<OrganizationRegistrationForm>
  ) {
    return (
      <>
        <h3 className="address-title text-blue-700">Adresa organizacije</h3>
        <div className="address-container text-blue-700">
          <TextInput
            name="address.townName"
            className="regInput"
            label="Mjesto"
            type="text"
            errors={errors}
            placeholder="Unesite mjesto"
            touched={touched}
            style={{ width: "85%" }}
          />

          <TextInput
            name="address.postcode"
            className="regInput"
            label="Poštanski broj"
            type="text"
            errors={errors}
            placeholder="Unesite poštanski broj"
            touched={touched}
            style={{ width: "85%" }}
          />

          <TextInput
            name="address.streetName"
            className="regInput"
            label="Ulica"
            type="text"
            errors={errors}
            placeholder="Unesite ulicu"
            touched={touched}
            style={{ width: "85%" }}
          />

          <div className="max-w-80 w-2/4" style={{ width: "85%" }}>
            <label htmlFor="volunteerCenter" className="inputLabel">
              Volonterski centar
            </label>
            <div style={{ width: "100%" }}>
              <Field
                name="volunteerCenter"
                as="select"
                className={touched.userType && errors.userType ? "input-error" : "regInput"}
                style={{ width: "104%" }}
              >
                <option value="">Odaberite volonterski centar</option>
                <option value="OSIJEK">Osijek</option>
                <option value="RIJEKA">Rijeka</option>
                <option value="SPLIT">Split</option>
                <option value="ZADAR">Zadar</option>
                <option value="ZAGREB">Zagreb</option>
                <option value="BELISCE">Belišće</option>
                <option value="DUBROVNIK">Dubrovnik</option>
                <option value="SLAVONSKI_BROD">Slavonski Brod</option>
                <option value="SISAK">Sisak</option>
                <option value="MEDJIMURJE">Međimurje</option>
              </Field>
            </div>
            {touched.volunteerCenter && errors.volunteerCenter && <p className="error">{errors.volunteerCenter}</p>}
          </div>
        </div>
      </>
    );
  }

  function renderStepThree(
    errors: FormikErrors<OrganizationRegistrationForm>,
    touched: FormikTouched<OrganizationRegistrationForm>
  ) {
    return (
      <>
        <TextInput
          name="url"
          className="regInput"
          label="Web stranica organizacije"
          type="text"
          errors={errors}
          placeholder="Unesite web stranicu organizacije"
          touched={touched}
        />
        <TextInput
          name="email"
          className="regInput"
          label="Email adresa"
          type="text"
          errors={errors}
          placeholder="Unesite Email adresu"
          touched={touched}
        />
        <TextInput
          name="mobilePhone"
          className="regInput"
          label="Mobitel"
          type="text"
          errors={errors}
          placeholder="Unesite kontakt broj"
          touched={touched}
        />
        <TextInput
          name="password"
          className="regInput"
          label="Lozinka"
          type="password"
          errors={errors}
          placeholder="Unesite lozinku"
          touched={touched}
        />
        <TextInput
          name="controlPassword"
          className="regInput"
          label="Ponovljena lozinka"
          type="password"
          errors={errors}
          placeholder="Ponovite lozinku"
          touched={touched}
        />
      </>
    );
  }

  function renderPrevButton(currentStep: number, prevStep: () => void) {
    if (currentStep === 2 || currentStep === 3) {
      return (
        <button type="button" className="registerButton" onClick={prevStep}>
          <FaAngleLeft />
        </button>
      );
    } else if (currentStep === 1) {
      return (
        <button type="button" className="registerButton" onClick={() => navigate("/registration")}>
          <FaAngleLeft />
        </button>
      );
    }
    return null;
  }

  function renderNextButton(currentStep: number, nextStep: () => void) {
    if (currentStep === 1 || currentStep === 2) {
      return (
        <button type="button" className="registerButton" onClick={nextStep}>
          <FaAngleRight />
        </button>
      );
    }
    return null;
  }

  function renderSubmitButton(currentStep: number) {
    if (currentStep === 3) {
      return (
        <button type="submit" className="registerButton">
          Registracija
        </button>
      );
    }
    return null;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema(currentStep)}
      onSubmit={onSubmit}
      validateOnBlur={false}
    >
      {({ errors, touched }) => (
        <Form className="register">
          <div className="imageWithTextWrapper">
            <img src="../../../assets/images/register.png" alt="register" className="regImage" />
            <div className="customText">organization</div>
          </div>
          <div className="regForm">
            <div className="content" style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
              <div className="stepIndicators">
                <div className={`stepIndicator ${currentStep === 1 ? "current" : ""}`}>1</div>
                <div className="separator"></div>
                <div className={`stepIndicator ${currentStep === 2 ? "current" : ""}`}>2</div>
                <div className="separator"></div>
                <div className={`stepIndicator ${currentStep === 3 ? "current" : ""}`}>3</div>
              </div>
              {currentStep === 1 && renderStepOne(errors, touched)}
              {currentStep === 2 && renderStepTwo(errors, touched)}
              {currentStep === 3 && renderStepThree(errors, touched)}
              {serverError && <p className="error">{"Email adresa ili broj mobitela je zauzet"}</p>}
              <div className="buttons">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {renderPrevButton(currentStep, prevStep)}
                  {renderSubmitButton(currentStep)}
                  {renderNextButton(currentStep, nextStep)}
                </div>
                <Link to={routes.USER_LOGIN_URL} className="text-blue-700">
                  Već ste registrirani? Prijavite se.
                </Link>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default OrganizationRegistration;
