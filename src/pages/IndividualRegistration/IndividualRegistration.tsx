import React, { useContext, useState } from "react";

import { Formik, FormikHelpers, Form, Field, ErrorMessage } from "formik";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

import { IAuth } from "../../api/auth/IAuth";
import "./individualRegistration.css";
import { UserRegisterForm } from "../../api/auth/types";
import { routes } from "../../api/paths";
import TextInput from "../../components/TextInput/TextInput";
import { AuthContext } from "../../context/AuthContext";

const ValidationSchema = (step: number) => {
  let schema = Yup.object();
  if (step === 1) {
    schema = schema.shape({
      userType: Yup.string().required("Odabir uloge je obavezan"),
      firstName: Yup.string().required("Ime je obavezno"),
      lastName: Yup.string().required("Prezime je obavezno"),
      email: Yup.string().when("userType", {
        is: (val: string) => !!val,
        then: Yup.string().required("Email je obavezan").email("Email adresa nije valjana"),
      }),
      mobilePhone: Yup.string().when("userType", {
        is: (val: string) => !!val,
        then: Yup.string().required("Broj mobitela je obavezan"),
      }),
    });
  }
  if (step === 2) {
    schema = schema.shape({
      password: Yup.string().required("Lozinka je obavezna"),
      controlPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Lozinke moraju biti iste")
        .required("Ponovljena lozinka je obavezna"),
      volunteerCenter: Yup.string()
        .oneOf(["OSIJEK", "RIJEKA", "SPLIT", "ZADAR", "ZAGREB"], "Odabir volonterskog centra je obavezan")
        .required("Odabir volonterskog centra je obavezan"),
    });
  }
  return schema;
};

const initialValues: UserRegisterForm = {
  userType: "",
  firstName: "",
  lastName: "",
  email: "",
  mobilePhone: "",
  password: "",
  controlPassword: "",
  volunteerCenter: "",
};

const roles = [
  { id: "VOLUNTEER", label: "organizirati volonterske akcije i pružati pomoć" },
  { id: "VOLUNTEER_AND_PERSON_IN_NEED", label: "volontirati, ali i potražiti pomoć drugih volontera" },
  { id: "PERSON_IN_NEED", label: "potražiti volontersku pomoć" },
];

const IndividualRegistration = () => {
  const { signup } = useContext(AuthContext) as IAuth;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [certificate, setCertificate] = useState<File | null>(null);
  const [certificateName, setCertificateName] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setCertificate(file);
    setCertificateName(file ? file.name : ""); // Postavite ime datoteke
  };

  const onSubmit = async (values: UserRegisterForm, actions: FormikHelpers<UserRegisterForm>) => {
    setServerError(false);
    let userType = {
      volunteer: false,
      helpRecipient: false,
    };

    switch (selectedRole) {
      case "VOLUNTEER_AND_PERSON_IN_NEED":
        userType = { volunteer: true, helpRecipient: true };
        break;
      case "VOLUNTEER":
        userType = { volunteer: true, helpRecipient: false };
        break;
      case "PERSON_IN_NEED":
        userType = { volunteer: false, helpRecipient: true };
        break;
      default:
        break;
    }

    const personRegisterDTO = {
      ...values,
      userType: userType,
    };

    const formData = new FormData();
    formData.append("personRegisterDTO", new Blob([JSON.stringify(personRegisterDTO)], { type: "application/json" }));

    if (certificate) {
      formData.append("file", certificate);
    }
    console.log(formData);
    const result = await signup(formData);
    if (result.valueOf()) navigate("/");
    else setServerError(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const renderCertificateUploadSection = () => {
    if (!["VOLUNTEER", "VOLUNTEER_AND_PERSON_IN_NEED"].includes(selectedRole)) return null;

    return (
      <div className="max-w-80 w-2/4">
        <label htmlFor="criminalRecordCertificate" className="inputLabel">
          Potvrda o nekaznjavanju
        </label>
        <div className="fileInputContainer">
          <input type="file" name="certificate" id="certificate" className="fileInput" onChange={handleFileChange} />
          <label htmlFor="certificate" className="uploadButton" style={{ backgroundColor: "#ccc", color: "#010159" }}>
            Odaberi datoteku
          </label>
          {certificateName && <div className="fileName">{certificateName}</div>}
        </div>
      </div>
    );
  };

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
            <div className="customText">individual</div>
          </div>
          <div className="regForm">
            <div className="content" style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
              <div className="stepIndicators">
                <div className={`stepIndicator ${currentStep === 1 ? "current" : ""}`}>1</div>
                <div className="separator"></div>
                <div className={`stepIndicator ${currentStep === 2 ? "current" : ""}`}>2</div>
              </div>
              {currentStep === 1 && (
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
                    name="firstName"
                    className="regInput"
                    label="Ime"
                    type="text"
                    errors={errors}
                    placeholder="Unesite ime"
                    touched={touched}
                  />
                  <TextInput
                    name="lastName"
                    className="regInput"
                    label="Prezime"
                    type="text"
                    errors={errors}
                    placeholder="Unesite prezime"
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
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="max-w-80 w-2/4">
                    <label htmlFor="userType" className="inputLabel">
                      Volonterski centar
                    </label>
                    <Field
                      name="volunteerCenter"
                      as="select"
                      className={touched.userType && errors.userType ? "input-error" : "regInput"}
                      style={{ width: "105%" }}
                    >
                      <option value="">Odaberite volonterski centar</option>
                      <option value="OSIJEK">Osijek</option>
                      <option value="RIJEKA">Rijeka</option>
                      <option value="SPLIT">Split</option>
                      <option value="ZADAR">Zadar</option>
                      <option value="ZAGREB">Zagreb</option>
                    </Field>
                    {touched.volunteerCenter && errors.volunteerCenter && (
                      <p className="error">{errors.volunteerCenter}</p>
                    )}
                  </div>
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
                  {renderCertificateUploadSection()}
                </>
              )}

              {serverError && <p className="error">{"Email adresa ili broj mobitela je zauzet"}</p>}
              <div className="buttons">
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {currentStep === 2 && (
                    <button type="button" className="registerButton" onClick={prevStep}>
                      <FaAngleLeft />
                    </button>
                  )}
                  {currentStep === 2 && (
                    <button type="submit" className="registerButton">
                      Registracija
                    </button>
                  )}
                  {currentStep === 1 && (
                    <button type="button" className="registerButton" onClick={() => navigate("/registration")}>
                      <FaAngleLeft />
                    </button>
                  )}
                  {currentStep === 1 && (
                    <button type="button" className="registerButton" onClick={nextStep}>
                      <FaAngleRight />
                    </button>
                  )}
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
export default IndividualRegistration;
