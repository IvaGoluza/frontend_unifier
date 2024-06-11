import React, { useEffect, useState } from "react";
import "./Adverts.css";
import AccordionCard from "../../components/AccordionCardAdvert/AccordionCardAdvert";
import NavButton from "../../components/DealsComponents/NavButton";
import AdvertsFilter from "../../components/Filters/AdvertsFilter";
import { Advert, Advert2 } from "../../api/auth/IForm";
import api from "../../api/createAxiosClient";
import AdvertsFilterButton from "../../components/Filters/AdvertsFilterButton";


interface PaginationParams {
  grad: string;
  kategorija: string;
  vrstaPomoci: string;
  page: number;
  size: number;
  sort: string[];
}

interface UserRequest {
  requestId: number;
  requestTitle: string;
  category: string;
  helpType: string;
  archived: boolean;
}

const fetchUserRequests = async (userId: string, page = 0, size = 20, sort: string[] = []) => {
  try {
    const response = await api.get(`/request/my-requests/${userId}/titles`, {
      params: {
        page: page,
        size: size,
        sort: sort,
      },
    });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching user requests:", error);
    return [];
  }
};


export default function Adverts() {
  const [adverts, setAdverts] = useState<Advert2[]>([]);
  const [userRequests, setUserRequests] = useState<UserRequest[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [paginationFirst, setPaginationFirst] = useState(true);
  const [paginationLast, setPaginationLast] = useState(true);

  const params: PaginationParams = {
    grad: "",
    kategorija: "",
    vrstaPomoci: "",
    page: 0,
    size: 8,
    sort: []
  };

  const fetchData = async () => {
    try {
      const response = await api.get(`/advert/all-adverts`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: params,
      });

      if (Array.isArray(response.data.content)) {
        const updatedAdverts = response.data.content.map((advert: Advert2[]) => ({
          ...advert,
          accepted: null 
        }));
        setAdverts(updatedAdverts);
        setPaginationFirst(response.data.first);
        setPaginationLast(response.data.last);
        console.log(updatedAdverts);
      } else {
        console.error("API response is not an array:", response.data);
        setError("Unexpected API response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  const fetchUserRequestsData = async () => {
    let userId = "";
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      userId = user.id;
    }
    const requests = await fetchUserRequests(userId);
    setUserRequests(requests);
  };

  const handleSubmitApplication = async (advertId: number, requestId: number | null, message: string, receiverId: number) => {
    let senderId = "";
    let userType = "";
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      senderId = user.id;
      userType = user.userType;
    }
    const payload = {
      senderId: senderId,
      receiverId: receiverId, 
      sender: userType,
      requestId: requestId,
      advertId: advertId,
      message: message
    };
    console.log(payload);

    try {
      const response = await api.post("/deal", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      console.log("Response:", response.data);
      const updatedAdverts = adverts.map(advert => {
        if (advert.advertId === advertId) {
          return {
            ...advert,
            status: response.data.accepted ? "Na čekanju" : "Prijavljeno"
          };
        }
        return advert;
      });
      setAdverts(updatedAdverts);
    } catch (error) {
      console.error("Error sending application:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserRequestsData();
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
    <>
      <div className={`h-2/4 w-full mt-2 relative z-0 hidden md:block`}>
        <div className="grid grid-cols-4 gap-2 z-0 h-3/4 relative">
          <div className="">
            <img src="../../../assets/images/advertImage1.png" className="w-full h-full object-cover" alt="Advert Image 1" />
          </div>
          <div className="">
            <img src="../../../assets/images/advertImage2.png" className="w-full h-full object-cover" alt="Advert Image 2" />
          </div>
          <div className="">
            <img src="../../../assets/images/advertImage3.png" className="w-full h-full object-cover" alt="Advert Image 3" />
          </div>
          <div className="">
            <img src="../../../assets/images/advertImage4.png" className="w-full h-full object-cover" alt="Advert Image 4" />
          </div>
          <div className="custom-shape-divider-bottom-1715101477 z-10 absolute bottom-0 left-0 w-full">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
            <div className="absolute z-20 left-[4vw]">
              <AdvertsFilter
                data={adverts}
                setFilteredAdverts={setAdverts}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen bg-white">
        <div className="accordions w-full">
          {adverts.length === 0 ? (
            <div className="error-message">No adverts available</div>
          ) : (
            adverts.map((advert) => (
              <AccordionCard
              key={advert.advertId} // Ensure this key is unique for each item
              title={advert.advertTitle || "No title"}
              category={advert.category || "No category"}
              helpType={advert.helpType || "No help type"}
              town={advert.volunteerCenter || "No town"}
              location={advert.location || "No location"}
              time={advert.time || "No time"}
              description={advert.description || "No description"}
              name={advert.user?.name || "No name"}
              email={advert.user?.email || "No email"}
              phoneNumber={advert.user?.mobilePhone || "No phone number"}
              userRequests={userRequests}
              onSubmitApplication={handleSubmitApplication}
              advertId={advert.advertId}
              receiverId={advert.user?.id || 0}
              status={"Prijava"}
            />
            ))
          )}
        </div>
        <div className="hidden h-full sm:flex flex flex-col mb-4 justify-end">
          <NavButton leftOnly={paginationLast} rightOnly={paginationFirst} onLeftClick={paginationPrev} onRightClick={paginationNext}></NavButton>
        </div>
      </div>
      <div className={`sm:hidden mb-4 ${!paginationFirst && !paginationLast ? 'flex m-2' : 'flex justify-center'}`}>
        <AdvertsFilterButton
         data={adverts}
         setFilteredAdverts={setAdverts}/>
        <NavButton leftOnly={paginationFirst} rightOnly={paginationLast} onLeftClick={paginationPrev} onRightClick={paginationNext}></NavButton>
      </div>
    </>
  );
}
