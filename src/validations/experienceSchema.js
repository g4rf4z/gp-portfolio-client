import { object, string, date, array, mixed } from 'yup';

const errorMessage = (key) => `Veuillez renseigner ${key}.`;

const experienceSchema = object({
  position: string()
    .typeError(errorMessage("l'intitulé du poste occupé"))
    .required(errorMessage("l'intitulé du poste occupé")),
  company: string()
    .typeError(errorMessage("le nom de l'entreprise"))
    .required(errorMessage("le nom de l'entreprise")),
  city: string()
    .typeError(errorMessage('la ville'))
    .required(errorMessage('la ville')),
  country: string()
    .typeError(errorMessage('le pays'))
    .required(errorMessage('le pays')),
  from: date()
    .typeError(errorMessage('la date de début'))
    .required(errorMessage('la date de début')),
  to: date()
    .typeError(errorMessage('la date de fin'))
    .required(errorMessage('la date de fin')),
  tasks: string()
    .typeError(errorMessage('les tâches effectuées'))
    .required(errorMessage('les tâches effectuées')),
  technologies: mixed()
    .test(
      'is-string-or-array',
      errorMessage('les technologies utilisées'),
      (value) => typeof value === 'string' || Array.isArray(value)
    )
    .required(errorMessage('les technologies utilisées')),
});

export { experienceSchema };
