import { object, string } from "yup";

const errorMessage = (key) => `Veuillez renseigner votre ${key}.`;

const contactSchema = object({
  firstname: string()
    .typeError(errorMessage("prénom"))
    .max(
      15,
      "La longueur de votre prénom doit être inférieure ou égale à 15 caractères."
    )
    .required(errorMessage("prénom")),
  lastname: string()
    .typeError(errorMessage("nom"))
    .max(
      15,
      "La longueur de votre nom doit être inférieure ou égale à 15 caractères."
    )
    .required(errorMessage("nom")),
  email: string()
    .typeError(errorMessage("email"))
    .email("Veuillez renseigner une adresse email valide.")
    .required(errorMessage("email")),
  textarea: string()
    .typeError(errorMessage("message"))
    .min(
      15,
      "La longueur de votre message doit être supérieure ou égale à 15 caractères."
    )
    .max(
      1000,
      "La longueur de votre message doit être inférieure ou égale à 1000 caractères."
    )
    .required(errorMessage("message")),
});

export { contactSchema };
