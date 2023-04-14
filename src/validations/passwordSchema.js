import { object, ref, string } from "yup";

const errorMessage = (key) => `Veuillez renseigner votre ${key}.`;

const passwordSchema = object({
  password: string()
    .typeError(errorMessage("mot de passe actuel"))
    .required(errorMessage("mot de passe actuel")),
  newPassword: string()
    .oneOf(
      [ref("newPasswordConfirmation"), null],
      "Les mots de passe ne correspondent pas."
    )
    .typeError(errorMessage("nouveau mot de passe"))
    .required(errorMessage("nouveau mot de passe")),
  newPasswordConfirmation: string()
    .oneOf(
      [ref("newPassword"), null],
      "Les mots de passe ne correspondent pas."
    )
    .typeError("Veuillez confirmer votre nouveau mot de passe.")
    .required(errorMessage("Veuillez confirmer votre nouveau mot de passe.")),
});

export { passwordSchema };
