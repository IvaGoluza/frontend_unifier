import React from "react";

import "./registrationTypes.css";
import { useNavigate } from "react-router-dom";

const RegistrationTypes = () => {
  const navigate = useNavigate();

  return (
    <div className="register0">
      <div className="imageWithTextWrapper">
        <img src="../../../assets/images/register.png" alt="register" className="regImage0" />
      </div>
      <div className="regForm0">
        <h1 className="welcomeTitle">Dobrodošli.</h1>
        <p className="welcomeSubTitle">Za nastavak registracije odaberite vrstu korisniškog računa.</p>
        <div className="buttons2">
          <button className="orgBtn" onClick={() => navigate("/orgRegistration")}>
            ORGANIZACIJA
          </button>
          <button className="indBtn" onClick={() => navigate("/indRegistration")}>
            INDIVIDUALNA OSOBA
          </button>
        </div>
        <p className="loginPrompt2">
          Već ste registrirani? <span onClick={() => navigate("/login")}>Prijavite se.</span>
        </p>
      </div>
    </div>
  );
};
export default RegistrationTypes;
