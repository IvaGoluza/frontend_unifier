import React, { useEffect, useState } from "react";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";
import api from "../../api/createAxiosClient";

import "./MyRequestList.css";

interface Props {
  toggleFormVisibility: () => void;
}

interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export default function MyRequestList({ toggleFormVisibility }: Props) {
  const [data, setData] = useState<
    {
      archived: boolean;
      user: any;
      id: string;
      requestId: string;
      requestTitle: string;
      helpType: string;
      category: string;
      first: boolean;
      last: boolean;
    }[]
  >([]);
  const [pagationFirst, setPagationFirst] = useState("true");
  const [pagationLast, setPagationLast] = useState("true");
  const navigate = useNavigate();

  const params: PaginationParams = {
    page: 0,
    size: 8,
  };

  let userId = "";
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    userId = user.id;
  }

  const fetchData = async () => {
    try {
      const response = await api.get(`/request/my-requests-info/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
      });
      console.log(response.data);
      setData(response.data.content);
      setPagationFirst(response.data.first);
      setPagationLast(response.data.last);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginationNext = () => {
    params.page = (params.page ?? 0) + 1;
    fetchData();
  };

  const paginationPrev = () => {
    params.page = (params.page ?? 0) - 1;
    fetchData();
  };

  const BG_TRUE = "bg-gray-300";

  const handleRequestClick = (requestId: string) => {
    const params = { requestId, userId };
    navigate("/info-request", { state: params });
  };

  return (
    <div className="mt-4 flex h-full w-full flex-col items-center sm:mt-0 sm:justify-center">
      <div className="requests-list relative h-5/6 w-10/12 sm:w-8/12 bg-white shadow-lg sm:h-5/6">
        <div className="requests-list-navbar bg-[#00C2FE] grid grid-cols-1 p-4 text-xs sm:grid-cols-3 md:text-base lg:text-lg">
          <div className="font-semibold">NAZIV ZAHTJEVA</div>
          <div className="hidden font-semibold sm:block">SKUPINA</div>
          <div className="hidden font-semibold sm:block">KATEGORIJA</div>
        </div>
        {data.map((item) => (
          <div key={item.requestId}>
            <div
              onClick={() => handleRequestClick(item.requestId)}
              className={`requests-list-item cursor-pointer m-2 ml-4 mr-4 flex grid grid-cols-1 items-center justify-center p-2 text-base sm:grid-cols-3 ${item.archived ? "border-gradient-orange" : "border-gradient-green"
                }`}
            >
              <div className="flex justify-center">{item.requestTitle}</div>
              <div className="hidden justify-center sm:flex">{item.category}</div>
              <div className="hidden justify-center sm:flex">{item.helpType}</div>
            </div>
          </div>
        ))}
        <div className="absolute cursor-pointer bottom-5 items-center justify-center md:justify-end text-xs flex flex-row w-full">
          <button
            onClick={toggleFormVisibility}
            className="button-create-request-list flex w-6/12 h-[3rem] md:w-3/12 lg:w-2/12 h:h-[4rem] items-center justify-center bg-[#5422E1] pl-2 pr-2 text-xs md:text-sm 2xl:text-lg hover:scale-110"
          >
            NOVI ZAHTJEV
          </button>
          <div className="container-pagation m-2 flex w-4/12 lg:w-2/12 flex-row items-center justify-center justify-around rounded-full">
            <div
              className={`m-1 rounded-full p-2 pl-3 pr-3 text-white hover:scale-110  ${pagationFirst ? BG_TRUE : "bg-[#09115B]"
                }`}
            >
              {pagationFirst ? (
                <FontAwesomeIcon icon={faArrowLeft} />
              ) : (
                <FontAwesomeIcon icon={faArrowLeft} onClick={paginationPrev} />
              )}
            </div>
            <div
              className={`m-1 rounded-full p-2 pl-3 pr-3 text-white hover:scale-110  ${pagationLast ? BG_TRUE : "bg-[#09115B]"
                }`}
            >
              {pagationLast ? (
                <FontAwesomeIcon icon={faArrowRight} />
              ) : (
                <FontAwesomeIcon icon={faArrowRight} onClick={paginationNext} />
              )}
            </div>
          </div>
        </div>

      </div>
      <div className="text-md mr-8 mt-8 w-8/12 lg:justify-end justify-center flex-wrap items-start content-around font-bold text-white flex flex-col sm:flex-row">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
          <div className="pr-5">Aktivni zahtjevi</div>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-full bg-orange-500"></div>
          <div className="">Arhivirani zahtjevi</div>
        </div>
      </div>

    </div>
  );
}
