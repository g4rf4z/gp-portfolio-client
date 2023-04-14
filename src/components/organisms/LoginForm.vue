<template>
  <form @submit.prevent="login">
    <form-input-molecule
      label="Email :"
      id="email"
      name="email"
      type="email"
      v-model="loginData.email"
      placeholder="Email"
      :error-message="validationErrors.loginForm?.email"
      @input="resetError('email')"
    ></form-input-molecule>
    <form-input-molecule
      label="Mot de passe :"
      id="password"
      name="password"
      type="password"
      v-model="loginData.password"
      placeholder="Mot de passe"
      :error-message="validationErrors.loginForm?.password"
      @input="resetError('password')"
    ></form-input-molecule>
    <form-input-molecule
      v-show="false"
      label="Confirmation de mot de passe :"
      id="passwordConfirmation"
      name="passwordConfirmation"
      v-model="loginData.passwordConfirmation"
    ></form-input-molecule>

    <div class="button-wrapper">
      <button-atom type="submit" :loading="loading">Envoyer</button-atom>
    </div>
  </form>
  <modal-atom :type="icon" :active="active" @close-modal="toggleModal(false)">
    <p class="modal-content">Vos identifiants de connexion sont incorrects.</p>
  </modal-atom>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import ButtonAtom from "#/atoms/Button.vue";
import ModalAtom from "#/atoms/Modal.vue";

import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { validationErrors, validateData } from "@/services/yup";
import { loginSchema } from "@/validations/loginSchema";

const router = useRouter();

const authenticationStore = useAuthenticationStore();

const loading = computed(() => authenticationStore.loaders.login);

const loginData = ref({
  email: null,
  password: null,
  passwordConfirmation: null,
});
const active = ref(false);
const icon = ref("");

const resetError = (field) => {
  if (validationErrors.value.loginForm?.[field]) {
    validationErrors.value.loginForm[field] = null;
  }
};

const login = async () => {
  try {
    // If "passwordConfirmation" field is filled, the form submission is skipped.
    if (loginData.value.passwordConfirmation) {
      return;
    }

    validationErrors.value["loginForm"] = {};
    const isValid = await validateData(
      "loginForm",
      loginSchema,
      loginData.value
    );
    if (!isValid) return;
    await authenticationStore.login(loginData.value);
    router.push({ name: "profile" });
  } catch (error) {
    loginData.value = { email: null, password: null };
    toggleModal(true);
    icon.value = "danger";
  }
};

const toggleModal = (bool) => {
  active.value = bool;
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  @apply pt-5 flex justify-center;
}

.modal-content {
  @apply py-5;
}
</style>
