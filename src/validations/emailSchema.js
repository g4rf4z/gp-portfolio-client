import { object, string } from "yup";

const errorMessage = (key) => `Veuillez renseigner votre ${key}.`;

const emailSchema = object({
  email: string()
    .typeError(errorMessage("email"))
    .email("Veuillez renseigner un email valide.")
    .required(errorMessage("email")),
});

export { emailSchema };
