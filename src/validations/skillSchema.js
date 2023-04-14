import { object, string, number } from "yup";

const errorMessage = (key) => `Veuillez renseigner ${key}.`;

const skillSchema = object({
  name: string()
    .typeError(errorMessage("une compétence"))
    .required(errorMessage("une compétence")),
  image: string()
    .typeError(errorMessage("une image"))
    .required(errorMessage("une image")),
  progress: number()
    .typeError(errorMessage("un nombre compris entre 0 et 100"))
    .required(errorMessage("un nombre compris entre 0 et 100")),
});

export { skillSchema };
