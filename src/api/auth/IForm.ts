import { loggedInUserType } from "./IAuth";

export type FormTypes = {
  //association?: boolean;
  requestTitle: string;
  location: string;
  time: string;
  category: string;
  helpType: string;
  numOfVolunteers: string;
  description: string;
  typeOfAction: string;
  skillSet: string;
};

export type AdvertType = {
  id: number;
  advertTitle: string;
  town: string;
  helpType: string;
  category: string;
  description: string;
  user: loggedInUserType;
};

export type Deal = {
  id: number;
  accepted: boolean;
  sender: string;
  request: RequestType;
  advert: AdvertType;
};

export type RequestType = {
  id: number;
  association: boolean;
  requestTitle: string;
  town: string;
  helpType: string;
  category: string;
  description: string;
  volunteerNum: number;
  active: boolean;
  user: loggedInUserType;
};

export type DealRequestType = {
  id: number;
  accepted: boolean;
  request: RequestType;
};

export type DealAdvertType = {
  id: number;
  accepted: boolean;
  advert: AdvertType;
};

export type RequestTypeDeals = {
  id: number;
  association: boolean;
  requestTitle: string;
  town: string;
  helpType: string;
  category: string;
  description: string;
  volunteerNum: number;
  active: boolean;
  user: loggedInUserType;
  deals?: Deal[];
};

export const towns = [
  { value: "", label: "Svi gradovi" },
  { value: "ZAGREB", label: "Zagreb" },
  { value: "SPLIT", label: "Split" },
  { value: "OSIJEK", label: "Osijek" },
  { value: "RIJEKA", label: "Rijeka" },
  { value: "DUBROVNIK", label: "Dubrovnik" },
];

export const categories = [
  { value: "", label: "Sve kategorije" },
  { value: "CHILDREN", label: "Djeca/mladi" },
  { value: "SPECIAL_NEEDS", label: "Osobe s posebnim potrebama" },
  { value: "ELDERLY", label: "Stariji" },
  { value: "FAMILY", label: "Pomoć obiteljima" },
];

export const helpType = [
  { value: "", label: "Sve vrste pomoći" },
  { value: "HEALTH", label: "Zdravlje" },
  { value: "EDUCATION", label: "Obrazovanje" },
  { value: "WORKSHOPS", label: "Radionice" },
  { value: "SUPPORT", label: "Donacije" },
  { value: "REPAIR", label: "Popravci" },
  { value: "REST", label: "Ostalo" },
];

export const request_owner = [
  { value: "", label: "Svi korisnici" },
  { value: "individual", label: "Korisnik u potrebi" },
  { value: "association", label: "Voditelj udruge" },
];
