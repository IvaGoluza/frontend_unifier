import * as Yup from "yup";

export const CreateNewFormValidationSchema = Yup.object().shape({
  title: Yup.string().required("Naziv oglasa je obavezan"),
  town: Yup.string()
    .oneOf(["ZAGREB", "SPLIT", "RIJEKA", "OSIJEK", "DUBROVNIK"], "Odabir grada je obavezan")
    .required("Odabir grada je obavezan"),
  category: Yup.string().required("Odabir kategorije obavezan"),
  helpType: Yup.string().required("Odabir vrste pomoći je obavezan"),
  volunteerNum: Yup.number().required("Broj potrebnih volontera je obavezan"),
  description: Yup.string().required("Opis je obavezan"),
});

export const CreateNewFormValidationSchemaForCreatingRequest = Yup.object().shape({
  requestTitle: Yup.string().required("Naziv oglasa je obavezan"),
  category: Yup.string().required("Odabir kategorije obavezan"),
  helpType: Yup.string().required("Odabir vrste pomoći je obavezan"),
  numOfVolunteers: Yup.string().required("Broj volontera je obavezan"),
  description: Yup.string().required("Opis je obavezan"),
  location: Yup.string().required("Lokacija je obavezna"),
  time: Yup.string().required("Vrijeme je obavezno"),
  typeOfAction: Yup.string().required("Odabir obavezan"),
  skillSet: Yup.string().required("Navesti znanja i vještine je obavezno"),
});
