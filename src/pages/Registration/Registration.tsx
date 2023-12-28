import React, { useContext, useState } from "react";

import { Formik, FormikHelpers, Form, Field } from "formik";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";

import { IAuth } from "../../api/auth/IAuth";
import "./registration.css";
import { RegistrationCommand, RegisterUser } from "../../api/auth/types";
import { routes } from "../../api/paths";
import TextInput from "../../components/TextInput/TextInput";
import { AuthContext } from "../../context/AuthContext";

const ValidationSchema = Yup.object().shape({
  userType: Yup.string()
    .oneOf(["ASSOCIATION", "VOLUNTEER", "PERSON_IN_NEED"], "Odabir uloge je obavezan")
    .required("Odabir uloge je obavezan"),
  firstName: Yup.string().required("Ime je obavezno"),
  lastName: Yup.string().required("Prezime je obavezno"),
  email: Yup.string().required("Email je obavezan").email("Email adresa nije valjana"),
  mobilePhone: Yup.string().required("Broj mobitela je obavezan"),
  oib: Yup.string().required("OIB je obavezan."),
  password: Yup.string().required("Lozinka je obavezna"),
  controlPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Lozinke moraju biti iste")
    .required("Ponovljena lozinka je obavezna"),
  profileDescription: Yup.string().required("Opis profila je obavezan."),
});

const initialValues: RegistrationCommand = {
  userType: "",
  firstName: "",
  lastName: "",
  email: "",
  mobilePhone: "",
  oib: "",
  password: "",
  controlPassword: "",
  profileDescription: "",
};

const Registration = () => {
  const { signup } = useContext(AuthContext) as IAuth;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<boolean>(false);

  const onSubmit = async (values: RegistrationCommand, actions: FormikHelpers<RegistrationCommand>) => {
    console.log(values);
    setServerError(false);

    const result = await signup(values);
    if (result.valueOf()) navigate("/");
    else setServerError(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="register">
          <img src="../../../assets/images/register.png" alt="register" className="regImage" />
          <div className="regForm">
            <div className="max-w-80 w-2/4">
              <label htmlFor="userType" className="inputLabel">
                Uloga
              </label>
              <Field
                name="userType"
                as="select"
                className={touched.userType && errors.userType ? "input-error" : "regInput"}
              >
                <option value="">Odaberite ulogu</option>
                <option value="ASSOCIATION">udruga</option>
                <option value="VOLUNTEER">volonter</option>
                <option value="PERSON_IN_NEED">tražim volontersku pomoć</option>
              </Field>
              {touched.userType && errors.userType && <p className="error">{errors.userType}</p>}
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
            <TextInput
              name="oib"
              className="regInput"
              label="OIB"
              type="text"
              errors={errors}
              placeholder="Unesite OIB"
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
            <div className="max-w-80 w-2/4">
              <label htmlFor="userType" className="inputLabel">
                Opis profila
              </label>
              <Field
                name="profileDescription"
                as="textarea"
                className={touched.profileDescription && errors.profileDescription ? "input-error" : "regInput"}
                placeholder="Dodajte opis svom profilu"
              ></Field>
              {touched.profileDescription && errors.profileDescription && (
                <p className="error">{errors.profileDescription}</p>
              )}
            </div>
            {serverError && <p className="error">{"Email adresa ili broj mobitela je zauzet"}</p>}
            <button type="submit" className="registerButton">
              Registracija
            </button>
            <Link to={routes.USER_LOGIN_URL} className="text-blue-700">
              Već ste registrirani? Prijavite se.
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Registration;
