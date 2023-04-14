import { ref } from "vue";

export const validationErrors = ref({});

export const validateData = async (type, schema, data) => {
  try {
    await schema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    validationErrors.value[type] = {};
    error.inner.forEach((e) => {
      validationErrors.value[type][e.path] = e.message;
    });
    return false;
  }
};
