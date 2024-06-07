import * as Yup from "yup";

export const CreateNewFormValidationSchemaForCreatingRequest = Yup.object().shape({
  requestTitle: Yup.string().required("Naziv zahtjeva je obavezan"),
  category: Yup.string().required("Odabir kategorije obavezan"),
  helpType: Yup.string().required("Odabir vrste pomoći je obavezan"),
  numOfVolunteers: Yup.string().required("Broj volontera je obavezan"),
  description: Yup.string().required("Opis je obavezan"),
  location: Yup.string().required("Lokacija je obavezna"),
  time: Yup.string().required("Vrijeme je obavezno"),
  typeOfAction: Yup.string().required("Odabir obavezan"),
  skillSet: Yup.string().required("Navesti znanja i vještine je obavezno"),
});

export const CreateNewFormValidationSchemaForCreatingAdvert = Yup.object().shape({
  advertTitle: Yup.string().required("Naziv oglasa je obavezan"),
  location: Yup.string().required("Lokacija je obavezna"),
  helpType: Yup.string().required("Odabir vrste pomoći je obavezan"),
  category: Yup.string().required("Odabir kategorije obavezan"),
  description: Yup.string().required("Opis je obavezan"),
  time: Yup.string().required("Vrijeme je obavezno"),
});
