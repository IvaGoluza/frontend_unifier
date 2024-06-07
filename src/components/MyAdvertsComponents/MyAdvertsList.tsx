import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../../api/createAxiosClient";
import "../MyRequestsList/MyRequestsList.css";
import NavButton from "../DealsComponents/NavButton";

interface Props {
  toggleFormVisibility: () => void;
}

interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string[];
}

export default function MyAdvertsList({ toggleFormVisibility }: Props) {
  const [data, setData] = useState<
    {
      advertId: number;
      advertTitle: string;
      category: string;
      helpType: string;
      archived: boolean;
    }[]
  >([]);
  const [paginationFirst, setPaginationFirst] = useState(true);
  const [paginationLast, setPaginationLast] = useState(true);
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
      const response = await api.get(`/advert/my-adverts-info/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
      });
      setData(response.data.content);
      setPaginationFirst(response.data.first);
      setPaginationLast(response.data.last);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, []);

  const paginationNext = () => {
    params.page = (params.page ?? 0) + 1;
    fetchData().then();
  };

  const paginationPrev = () => {
    params.page = (params.page ?? 0) - 1;
    fetchData().then();
  };

  const handleRequestClick = (requestId: number) => {
    const params = { requestId, userId };
    navigate("/info-advert", { state: params });
  };

  return (
    <div className="mt-4 flex h-full w-full flex-col items-center sm:mt-0 sm:justify-center">
      <div className=" requests-list relative h-5/6 w-10/12 bg-white shadow-lg sm:h-5/6 sm:w-8/12">
        <div className="requests-list-navbar grid grid-cols-1 bg-[#00C2FE] p-4 text-xs sm:grid-cols-3 md:text-base lg:text-lg">
          <div className="font-semibold">NAZIV OGLASA</div>
          <div className="hidden font-semibold sm:block">SKUPINA</div>
          <div className="hidden font-semibold sm:block">KATEGORIJA</div>
        </div>
        {data.map((item) => (
          <div key={item.advertId}>
            <div
              onClick={() => handleRequestClick(item.advertId)}
              className={`requests-list-item m-2 ml-4 mr-4 flex grid cursor-pointer grid-cols-1 items-center justify-center justify-center p-2 text-base sm:grid-cols-3 ${
                item.archived ? "border-gradient-orange" : "border-gradient-green"
              }`}
            >
              <div className="flex justify-center">{item.advertTitle}</div>
              <div className="hidden justify-center sm:flex">{item.category}</div>
              <div className="hidden justify-center sm:flex">{item.helpType}</div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-5 right-5 flex w-10/12 cursor-pointer flex-row items-center justify-between p-1 text-xs lg:justify-end ">
          <button
            onClick={toggleFormVisibility}
            className="button-create-request-list flex h-10 items-center justify-center bg-[#5422E1] px-3 text-xs md:text-sm 2xl:text-lg "
          >
            NOVI OGLAS
          </button>
          <div className="m-2 flex flex-row items-center justify-center justify-around rounded-full lg:w-[10rem]">
            <NavButton
              leftOnly={paginationLast}
              rightOnly={paginationFirst}
              onLeftClick={paginationPrev}
              onRightClick={paginationNext}
            ></NavButton>
          </div>
        </div>
      </div>
      <div className="text-md mr-8 mt-8 flex w-8/12 flex-col flex-wrap content-around items-start justify-center font-bold text-white sm:flex-row lg:justify-end">
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-full bg-green-500"></div>
          <div className="pr-5">Aktivni oglasi</div>
        </div>
        <div className="flex items-center">
          <div className="mr-2 h-4 w-4 rounded-full bg-orange-500"></div>
          <div className="">Arhivirani oglasi</div>
        </div>
      </div>
    </div>
  );
}
