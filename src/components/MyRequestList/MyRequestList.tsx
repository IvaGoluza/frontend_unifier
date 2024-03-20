import React, { useEffect, useState } from "react";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate } from "react-router-dom";
import api from "../../api/createAxiosClient";

import "./MyRequestList.css";
import NavButton from "../DealsComponents/NavButton";

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
  const [pagationFirst, setPagationFirst] = useState(true);
  const [pagationLast, setPagationLast] = useState(true);
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
              className={`requests-list-item justify-center cursor-pointer m-2 ml-4 mr-4 flex grid grid-cols-1 items-center justify-center p-2 text-base sm:grid-cols-3 ${item.archived ? "border-gradient-orange" : "border-gradient-green"
                }`}
            >
              <div className="flex justify-center">{item.requestTitle}</div>
              <div className="hidden justify-center sm:flex">{item.category}</div>
              <div className="hidden justify-center sm:flex">{item.helpType}</div>
            </div>
          </div>
        ))}
        <div className="absolute cursor-pointer bottom-5 right-5 items-center justify-between p-1 lg:justify-end text-xs flex flex-row w-10/12 ">
          <button
            onClick={toggleFormVisibility}
            className="button-create-request-list flex h-10 items-center justify-center bg-[#5422E1] pl-2 pr-2 text-xs md:text-sm 2xl:text-lg "
          >
            NOVI ZAHTJEV
          </button>
          <div className="m-2 flex lg:w-[10rem] flex-row items-center justify-center justify-around rounded-full">
            <NavButton leftOnly={pagationLast} rightOnly={pagationFirst} onLeftClick={paginationPrev} onRightClick={paginationNext}></NavButton>
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
