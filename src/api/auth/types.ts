export type RegistrationCommand = {
  userType: string;
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  oib: string;
  password: string;
  controlPassword: string;
  profileDescription: string;
  volunteerCenter: string;
};

export type UserRegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  password: string;
  controlPassword: string;
  userType: string;
  volunteerCenter: string;
};

export type RegisterUser = {
  firstName: string;
  lastName: string;
  baseUserDetails: {
    email: string;
    mobilePhone: string;
    password: string;
    controlPassword: string;
    userType: string;
  };
};

export type LoginCommand = {
  email: string;
  password: string;
};

export type OrganizationRegistrationForm = {
  name: string;
  oib: string;
  type: string;
  email: string;
  mobilePhone: string;
  volunteerCenter: string;
  password: string;
  controlPassword: string;
  address: {
    townName: string;
    postcode: string;
    streetName: string;
  };
  userType: {
    volunteer: boolean;
    helpRecipient: boolean;
  };
  url: string;
};
