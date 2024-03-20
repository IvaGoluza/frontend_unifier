import React, { useContext, useState } from "react";

import { Formik, FormikHelpers, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { IAuth, loggedInUserType } from "../../api/auth/IAuth";
import "./login.css";
import { LoginCommand } from "../../api/auth/types";
import { routes } from "../../api/paths";
import TextInput from "../../components/TextInput/TextInput";
import { AuthContext } from "../../context/AuthContext";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email je obavezan").email("Email adresa nije valjana"),
  password: Yup.string().required("Lozinka je obavezna"),
});

const initialValues: LoginCommand = {
  email: "",
  password: "",
};

const Login = () => {
  const { login, setCurrentUser } = useContext(AuthContext) as IAuth;
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>("");

  const onSubmit = async (values: LoginCommand, actions: FormikHelpers<LoginCommand>) => {
    console.log(values);
    const result: loggedInUserType | null = await login(values);

    if (result !== null) {
      if (result.blocked) {
        setServerError("Vaš račun je blokiran.");
        return;
      }
      setCurrentUser(result);
      localStorage.setItem("user", JSON.stringify(result));
      if ("organization" in result) {
        localStorage.setItem("organization", JSON.stringify(result.organization));
      }
      navigate("/");
      actions.resetForm();
    } else setServerError("Email adresa ili lozinka je netočna.");

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Formik initialValues={initialValues} validationSchema={ValidationSchema} onSubmit={onSubmit}>
      {({ errors, touched, isSubmitting }) => (
        <Form className="register min-h-screen">
          <img src="../../../assets/images/login.png" alt="register" className="logImage opacity-70" />
          <div className="loginForm">
            <div className="container">
              <img src="../../../assets/images/stickmanFar.png" alt="Stickman" className="stickman" />
              <img src="../../../assets/images/stickmanNear.png" alt="Stickman" className="overlay" />
            </div>
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
              name="password"
              className="regInput"
              label="Lozinka"
              type="password"
              errors={errors}
              placeholder="Unesite lozinku"
              touched={touched}
            />
            {serverError.length > 0 && <p className="error">{serverError}</p>}
            <button disabled={isSubmitting} type="submit" className="registerButton">
              Prijava
            </button>
            <Link to={routes.REGISTRATION_TYPES_URL} className="text-blue-700">
              Nemate korisnički račun? Registrirajte se.
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
