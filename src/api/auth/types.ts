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
};

export type UserRegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  mobilePhone: string;
  password: string;
  controlPassword: string;
  userType: string;
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
  }
};

export type LoginCommand = {
  email: string;
  password: string;
};
