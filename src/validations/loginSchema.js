import { object, string } from "yup";

const errorMessage = (key) => `Veuillez renseigner votre ${key}.`;

const loginSchema = object({
  email: string()
    .typeError(errorMessage("email"))
    .email("Veuillez renseigner un email valide.")
    .required(errorMessage("email")),
  password: string().typeError(errorMessage("mot de passe")),
});

export { loginSchema };
