import React from "react";

import { faHeart, faCircleXmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HelpRequests() {
  const request = {
    title: "Naziv zahtjeva",
    association: true,
    email: "moj.mail@email.com",
    mobilePhone: "0981923047",
    town: "ZAGREB",
    category: "CHILDREN",
    helpType: "EDUCATION",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };
  return (
    <>
      <img src="../../../assets/images/helpRequests.png" alt="helpRequests" className="h-full object-cover" />
      <div className="p-6">
        <div className="request-container w-min-w m-10 grid grid-cols-3 grid-rows-1 gap-4 rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-h-64 md:max-w-xl">
          <div className="left-container grid grid-cols-1 grid-rows-3">
            <div>
              <span className="text-xl font-bold text-violet-900">{request.title}</span>
              {request.association && <p className="font-semibold text-violet-900">udruga</p>}
            </div>
            <div className="contact-info font-semibold text-emerald-900">
              <p className="hover:text-lg">{request.email}</p>
              <p>{request.mobilePhone}</p>
            </div>
            <div className="categories-info font-bold text-emerald-900">
              <p>{request.town}</p>
              <p>{request.category}</p>
              <p>{request.helpType}</p>
            </div>
          </div>

          <div className="right-container col-span-2 flex flex-col justify-between">
            <p className="text-s">{request.description}</p>
            <div className="button-container">
              <button className="mx-3 rounded-3xl bg-orange-500 px-6 py-2 font-bold text-white hover:bg-green-600">
                PRIHVATI
              </button>
              <button className="mx-3 rounded-3xl bg-gray-200 px-7 py-2 font-bold text-white hover:bg-red-600">
                ODBACI
              </button>
            </div>
          </div>
        </div>

        <div className="request-container w-min-w relative m-10 grid grid-cols-3 grid-rows-1 gap-4 rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-h-64 md:max-w-xl">
          <FontAwesomeIcon icon={faTrashCan} className="absolute right-3 top-3 text-xl text-gray-400" />
          <div className="left-container grid grid-cols-1 grid-rows-3">
            <div>
              <span className="text-xl font-bold text-violet-900">{request.title}</span>
              {request.association && <p className="font-semibold text-violet-900">udruga</p>}
            </div>
            <div className="contact-info font-semibold text-emerald-900">
              <p className="hover:text-lg">{request.email}</p>
              <p>{request.mobilePhone}</p>
            </div>
            <div className="categories-info font-bold text-emerald-900">
              <p>{request.town}</p>
              <p>{request.category}</p>
              <p>{request.helpType}</p>
            </div>
          </div>

          <div className="right-container col-span-2 flex flex-col justify-between">
            <p className="text-s">{request.description}</p>
            <div className="button-container">
              <button className="mx-3 rounded-3xl bg-gray-200 px-7 py-2 font-bold text-white">NA ČEKANJU</button>
            </div>
          </div>
          <img
            src="../../../assets/images/waiting.png"
            alt="waiting"
            className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full"
          />
        </div>

        <div className="request-container w-min-w relative m-10 grid grid-cols-3 grid-rows-1 gap-4 rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-h-64 md:max-w-xl">
          <div className="left-container grid grid-cols-1 grid-rows-3">
            <div>
              <span className="text-xl font-bold text-violet-900">{request.title}</span>
              {request.association && <p className="font-semibold text-violet-900">udruga</p>}
            </div>
            <div className="contact-info font-semibold text-emerald-900">
              <p className="hover:text-lg">{request.email}</p>
              <p>{request.mobilePhone}</p>
            </div>
            <div className="categories-info font-bold text-emerald-900">
              <p>{request.town}</p>
              <p>{request.category}</p>
              <p>{request.helpType}</p>
            </div>
          </div>

          <div className="right-container col-span-2 flex flex-col justify-between">
            <p className="text-s">{request.description}</p>
            <div className="button-container">
              <button className="mx-3 rounded-3xl bg-orange-500 px-7 py-2 font-bold text-white hover:bg-orange-300">
                RECENZIJA
              </button>
            </div>
          </div>
        </div>

        <div className="request-container w-min-w relative m-10 flex h-fit flex-col  rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-w-xl">
          <FontAwesomeIcon icon={faTrashCan} className="absolute right-3 top-3 text-xl text-gray-400" />
          <div className="top-container grid grid-cols-3 grid-rows-1 gap-4 pb-4">
            <div className="left-container grid grid-cols-1 grid-rows-3">
              <div>
                <span className="text-xl font-bold text-violet-900">{request.title}</span>
                {request.association && <p className="font-semibold text-violet-900">udruga</p>}
              </div>
              <div className="contact-info font-semibold text-emerald-900">
                <p className="hover:text-lg">{request.email}</p>
                <p>{request.mobilePhone}</p>
              </div>
              <div className="categories-info font-bold text-emerald-900">
                <p>{request.town}</p>
                <p>{request.category}</p>
                <p>{request.helpType}</p>
              </div>
            </div>

            <div className="right-container col-span-2 flex flex-col justify-between">
              <p className="text-s">{request.description}</p>
              <div className="volNum-container">
                <span className="text-xl font-semibold text-violet-900">Broj potrebnih volontera: n</span>
              </div>
            </div>
          </div>
          <div className="bottom-container col-span-3 h-fit">
            <hr className="h-1 bg-gray-50 shadow-lg" />
            <p className="my-3 text-center font-bold text-violet-900">OGLASI PRIJAVLJENIH VOLONTERA:</p>
            <div className="advert my-2 flex items-center justify-center">
              <div className="w-1/2 rounded-full bg-gray-100 px-3 text-center hover:bg-white">
                naslov volonter oglas1
              </div>
              <FontAwesomeIcon icon={faHeart} className="px-2 text-xl text-green-500 hover:text-green-900" />
              <FontAwesomeIcon icon={faCircleXmark} className="text-xl text-red-500 hover:text-red-900" />
            </div>
            <div className="advert my-2 flex items-center justify-center">
              <div className="w-1/2 rounded-full bg-gray-100 px-3 text-center hover:bg-white">
                naslov volonter oglas2
              </div>
              <FontAwesomeIcon icon={faHeart} className="px-2 text-xl text-green-500 hover:text-green-900" />
              <FontAwesomeIcon icon={faCircleXmark} className="text-xl text-red-500 hover:text-red-900" />
            </div>
            <div className="advert my-2 flex items-center justify-center">
              <div className="w-1/2 rounded-full bg-gray-100 px-3 text-center hover:bg-white">
                naslov volonter oglas3
              </div>
              <FontAwesomeIcon icon={faHeart} className="px-2 text-xl text-green-500 hover:text-green-900" />
              <FontAwesomeIcon icon={faCircleXmark} className="text-xl text-red-500 hover:text-red-900" />
            </div>
          </div>
        </div>

        <div className="request-container w-min-w relative m-10 flex h-fit flex-col  rounded-lg border bg-white px-6 py-7 shadow-lg hover:bg-gray-50 md:max-w-xl">
          <FontAwesomeIcon icon={faTrashCan} className="absolute right-3 top-3 text-xl text-gray-400" />
          <div className="top-container grid grid-cols-3 grid-rows-1 gap-4 pb-4">
            <div className="left-container grid grid-cols-1 grid-rows-3">
              <div>
                <span className="text-xl font-bold text-violet-900">{request.title}</span>
                {request.association && <p className="font-semibold text-violet-900">udruga</p>}
              </div>
              <div className="contact-info font-semibold text-emerald-900">
                <p className="hover:text-lg">{request.email}</p>
                <p>{request.mobilePhone}</p>
              </div>
              <div className="categories-info font-bold text-emerald-900">
                <p>{request.town}</p>
                <p>{request.category}</p>
                <p>{request.helpType}</p>
              </div>
            </div>

            <div className="right-container col-span-2 flex flex-col justify-between">
              <p className="text-s">{request.description}</p>
              <div className="volNum-container">
                <span className="text-xl font-semibold text-violet-900">Broj potrebnih volontera: n</span>
              </div>
            </div>
          </div>
          <div className="bottom-container col-span-3 flex flex-row items-start justify-around border-t-4 border-gray-100">
            <div>
              <p className="my-3 font-semibold text-violet-900">Odaberi oglas s kojim se želiš prijaviti</p>
              <select name="adverts" id="adverts" className="regInput">
                <option value="oglas1">Naziv oglas1</option>
                <option value="oglas2">Naziv oglas2</option>
                <option value="oglas3">Naziv oglas3</option>
              </select>
            </div>
            <button className="mx-3 mt-8 rounded-3xl bg-orange-500 px-7 py-3 font-bold text-white hover:bg-orange-300">
              PRIJAVA
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
