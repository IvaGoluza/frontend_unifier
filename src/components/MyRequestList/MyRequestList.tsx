import React, { useContext, useEffect, useState } from "react";
import "./MyRequestList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/createAxiosClient";

interface Props {
   toggleFormVisibility: () => void;
}

interface PaginationParams {
   page?: number;
   size?: number;
   sort?: string[];
}



export default function MyRequestList({ toggleFormVisibility }: Props) {

   const [data, setData] = useState<{ archived: boolean, requestId: string, requestTitle: string; helpType: string; category: string, first: boolean, last: boolean }[]>([]);
   const [pagationFirst, setPagationFirst] = useState("true");
   const [pagationLast, setPagationLast] = useState("true");


   const params: PaginationParams = {
      page: 0,
      size: 8,
   };

   const fetchData = async () => {
      try {
         const response = await api.get("/request/all-requests", {
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


   return (
      <div className="flex flex-col h-full w-full mt-4 sm:mt-0 sm:justify-center items-center">
         <div className="sm:hidden w-7/12 flex flex-col justify-end mb-4 ml-20 font-bold text-md text-white">
            <div className="flex justify-start ml-12">
               <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
               <div className="">Aktivni zahtjevi</div>
            </div>
            <div className="flex justify-start ml-12">
               <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
               <div className="">Arhivirani zahtjevi</div>
            </div>
         </div>
         <div className="w-8/12 h-3/4 sm:h-5/6 bg-gray-200 shadow-lg requests-list relative">
            <div className="flex justify-around items-center p-4 text-xs requests-list-navbar md:text-base lg:text-lg">
               <div className="font-semibold">NAZIV ZAHTJEVA</div>
               <div className="font-semibold hidden sm:block">SKUPINA</div>
               <div className="font-semibold ml-12 hidden sm:block">KATEGORIJA</div>
            </div>
            {data.map((item, index) => (
               <div key={item.requestId}>
                  <div className={`requests-list-item flex justify-center grid grid-cols-1 sm:grid-cols-3 items-center m-2 ml-4 mr-4 p-2 border border-4 text-base hover:scale-[1.02] ${item.archived ? 'border-orange-200' : 'border-green-200'}`}>
                     <div className="flex justify-center">{item.requestTitle}</div>
                     <div className="hidden sm:flex justify-center">{item.category}</div>
                     <div className="hidden sm:flex justify-center">{item.helpType}</div>
                  </div>
               </div>
            ))}
            <div className="hidden sm:flex sm:flex-row absolute bottom-10 right-10 items-center text-xs md:text-base lg:text-xl">
               <button onClick={toggleFormVisibility} className="button-create-request-list bg-customPurpleDarker w-3/4 flex items-center justify-center hover:scale-110 pl-3 pr-3 text-base">NOVI ZAHTJEV</button>
               <div className="container-pagation flex flex-row items-center justify-center justify-around m-2 w-5/12 rounded-full">
                  <div className={`text-white rounded-full p-2 pl-3 pr-3 m-1 hover:scale-110  ${pagationFirst ? 'bg-gray-300' : 'bg-customPurpleDarker'}`}>
                     <FontAwesomeIcon icon={faArrowLeft} onClick={paginationPrev} />
                  </div>
                  <div className={`text-white rounded-full p-2 pl-3 pr-3 m-1 hover:scale-110  ${pagationLast ? 'bg-gray-300' : 'bg-customPurpleDarker'}`}>
                     <FontAwesomeIcon icon={faArrowRight} onClick={paginationNext} />
                  </div>
               </div>
            </div>
         </div >
         <div className="hidden w-8/12 sm:flex sm:flex-row justify-end mt-8 mr-8 font-bold text-md text-white">
            <div className="flex items-center mr-8">
               <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
               <div className="">Aktivni zahtjevi</div>
            </div>
            <div className="flex items-center">
               <div className="h-4 w-4 bg-orange-500 rounded-full mr-2"></div>
               <div className="">Arhivirani zahtjevi</div>
            </div>
         </div>
         <div className="mb-4 sm:hidden w-8/12 flex absolute bottom-2 justify-center flex-row items-center text-xs md:text-base lg:text-xl">
            <button onClick={toggleFormVisibility} className="button-create-request-list pl-2 pr-2 flex items-center justify-center hover:scale-110 bg-customPurple">NOVI ZAHTJEV</button>
            <div className="bg-customPurpleDarker border border-2 border-white flex flex-row items-center justify-center justify-around m-2 w-5/12 rounded-full">
               <div className="bg-white color-customPurpleDarker rounded-full p-2 pl-3 pr-3 m-1 hover:scale-110">
                  <FontAwesomeIcon icon={faArrowLeft} />
               </div>
               <div className="bg-white color-customPurpleDarker rounded-full p-2 pl-3 pr-3 m-1 hover:scale-110">
                  <FontAwesomeIcon icon={faArrowRight} />
               </div>
            </div>
         </div>
      </div>
   );
}

