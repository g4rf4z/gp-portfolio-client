import { object, string } from "yup";

const errorMessage = (key) => `Veuillez renseigner votre ${key}.`;

const profileSchema = object({
  lastname: string()
    .typeError(errorMessage("nom"))
    .max(15, "La longueur de votre nom doit être inférieure à 15 caractères.")
    .required(errorMessage("nom")),
  firstname: string()
    .typeError(errorMessage("prénom"))
    .max(
      15,
      "La longueur de votre prénom doit être inférieure à 15 caractères."
    )
    .required(errorMessage("prénom")),
  nickname: string()
    .typeError(errorMessage("pseudo"))
    .max(
      15,
      "La longueur de votre pseudo doit être inférieure à 15 caractères."
    )
    .required(errorMessage("pseudo")),
});

export { profileSchema };
