import React, { useEffect, useState } from "react";

import { faHeart, faCircleXmark, faTrashCan, faLocationDot, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AccordionCard from "../../components/AccordionCard/AccordionCard";
import "./InfoRequest.css";
import { categories, helpType } from "../../api/auth/IForm";
import AccordionCardJustMess from "../../components/AccordionCardJustMess/AccordionCardJustMess";
import api from "../../api/createAxiosClient";

interface requestData {
  archived: boolean;
  category: string;
  description: string;
  helpType: string;
  location: string;
  numOfVolunteers: number;
  requestId: number;
  requestTitle: string;
  skillSet: string;
  time: string;
  typeOfAction: string;
  user: {
    approved: boolean;
    blocked: boolean;
    email: string;
    id: number;
    mobilePhone: string;
    profileDescription: string;
    role: string;
    userType: string;
    town: string;
  };
  volunteerCenter: string;
}

export default function InfoRequest({
  archived,
  category,
  description,
  helpType,
  location,
  numOfVolunteers,
  requestTitle,
  typeOfAction,
  skillSet,
  time,
  volunteerCenter,
}: requestData) {
  const request = {
    title: "INSTRUKCIJE",
    association: true,
    email: "moj.mail@email.com",
    mobilePhone: "0981923047",
    town: "ZAGREB",
    category: "DJECA I MLADI",
    helpType: "OBRAZOVANJE",
    location: "Jarun",
    time: "20.-28. veljače 2024",
    name: "IME I PREZIME",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
  const location_navigate = useLocation();
  const params = location_navigate.state;
  const navigate = useNavigate();
  const requestId = params.requestId;
  const userId = params.userId;
  const [requestInfo, setRequestInfo] = useState<requestData | null>(null);

  const fetchData = async () => {
    try {
      const response = await api.get(`/request/${requestId}/my-request/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      setRequestInfo(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const numberOfCards = 4;
  const cardsArray = Array.from({ length: numberOfCards }, (_, index) => index);

  const handleBack = () => {
    navigate("/my-requests2");
  };
  const handleRequestState = async (action: string) => {
    let message = "";
    try {
      let response;
      if (action === "archive") {
        response = await api.put(`/request/archive/${requestId}`, {});
        message = "Uspješno arhiviran zahtjev!";
      } else if (action === "activate") {
        response = await api.put(`/request/undo-archive/${requestId}`, {});
        message = "Uspješno aktiviran zahtjev!";
      }
      toast.success(message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setRequestInfo((prevState: requestData | null) => ({
        ...prevState!,
        archived: action === "archive",
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Greška", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      {requestInfo && (
        <div className="purple-background">
          <div className="circleXmark absolute top-20">
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleBack} style={{ color: "#ffffff" }} size="2x" />
          </div>
          <div className="absolute left-20 top-40 flex items-center justify-center">
            <div className="butterfly">
              <img src="../../../assets/images/butterfly_2.png" />
            </div>

            <div>
              <div className="title-bar flex flex-auto">
                <h1 className="title uppercase">{requestInfo.requestTitle}</h1>
                {!requestInfo.archived ? (
                  <button
                    className="request-state mb-2 ml-20 pl-5 pr-5 hover:bg-white"
                    onClick={() => handleRequestState("archive")}
                  >
                    ARHIVIRAJ
                  </button>
                ) : (
                  <button
                    className="request-state mb-2 ml-20 pl-5 pr-5 hover:bg-white"
                    onClick={() => handleRequestState("activate")}
                  >
                    AKTIVIRAJ
                  </button>
                )}
              </div>

              <div className="request-info flex">
                <div className="request-info-item">{requestInfo.category}</div>
                <div className="request-info-item">{requestInfo.helpType}</div>
                <div className="request-info-item">{requestInfo.typeOfAction}</div>
                <div className="request-info-item">{requestInfo.volunteerCenter}</div>
              </div>
            </div>
            <div className="request-info-data mt-5">
              <div className="request-info-data-location">
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: "5px" }} />
                {requestInfo.location}
              </div>
              <div className="request-info-data-time mt-3">
                <FontAwesomeIcon icon={faClock} style={{ marginRight: "5px" }} />
                {requestInfo.time}
              </div>
              <div className="request-info-data-number mt-3">
                # Broj potrebnih volontera: {requestInfo.numOfVolunteers}
              </div>
            </div>
          </div>
          <div className="description-requirements">
            <div>
              <div className="description-requirements-title">POTREBNA ZNANJA I VJEŠTINE VOLONTERA</div>
              <div className="description-requirements-desc mr-20 w-80">{requestInfo.skillSet}</div>
            </div>
            <div>
              <div className="description-requirements-title">OPIS POTREBNE POMOĆI</div>
              <div className="description-requirements-desc w-80">{requestInfo.description}</div>
            </div>
          </div>
          <div className="volunteer">
            <img src="../../../assets/images/volunteer_image.png" />
          </div>
        </div>
      )}
      <div className="custom-shape-divider-bottom-1709115725">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="shape-fill"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      <div className="white-background">
        <div className="accordions justify-center xl:justify-start">
          {cardsArray.map((index) => (
            <AccordionCard
              key={index}
              title={request.title}
              category={request.category}
              helpType={request.helpType}
              town={request.town}
              location={request.location}
              time={request.time}
              description={request.description}
              name={request.name}
              email={request.email}
              phoneNumber={request.mobilePhone}
            />
          ))}
          <AccordionCardJustMess
            message={request.description}
            name={request.name}
            email={request.email}
            phoneNumber={request.mobilePhone}
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
