<template>
  <form @submit.prevent="updatePassword">
    <form-input-molecule
      label="Mot de passe"
      id="password"
      name="password"
      type="password"
      v-model="passwordData.password"
      placeholder="Mot de passe"
      :error-message="validationErrors.passwordUpdateForm?.password"
      @input="resetError('password')"
    ></form-input-molecule>
    <div class="grid-container">
      <form-input-molecule
        label="Nouveau mot de passe"
        id="newPassword"
        name="newPassword"
        type="password"
        v-model="passwordData.newPassword"
        placeholder="Nouveau mot de passe"
        :error-message="validationErrors.passwordUpdateForm?.newPassword"
        @input="resetError('newPassword')"
      ></form-input-molecule>
      <form-input-molecule
        label="Nouveau mot de passe"
        id="newPasswordConfirmation"
        name="newPasswordConfirmation"
        type="password"
        v-model="passwordData.newPasswordConfirmation"
        placeholder="Nouveau mot de passe"
        :error-message="
          validationErrors.passwordUpdateForm?.newPasswordConfirmation
        "
        @input="resetError('newPasswordConfirmation')"
      ></form-input-molecule>
    </div>
    <div class="button-wrapper">
      <button-atom :disabled="!isModified" :loading="loading" type="submit"
        >Sauvegarder</button-atom
      >
    </div>
  </form>
  <modal-atom :active="active" :type="icon" @close-modal="toggleModal(false)">
    <p v-if="admin.password" class="modal-content">
      Votre mot de passe a été mis à jour avec succès !
    </p>
    <p v-else class="modal-content">
      Une erreur est survenue lors de la mise à jour de votre mot de passe.
    </p>
  </modal-atom>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import ButtonAtom from "#/atoms/Button.vue";
import ModalAtom from "#/atoms/Modal.vue";

import { ref, computed } from "vue";

import { validationErrors, validateData } from "@/services/yup";
import { passwordSchema } from "@/validations/passwordSchema";

import { useAuthenticationStore } from "@/store/authenticationStore";
import { useAdminStore } from "@/store/adminStore";

const authenticationStore = useAuthenticationStore();
const adminStore = useAdminStore();

const admin = computed(() => authenticationStore.admin);
const loading = computed(() => authenticationStore.loaders.updatePassword);

const passwordData = ref({
  password: null,
  newPassword: null,
  newPasswordConfirmation: null,
});

const isModified = computed(
  () =>
    (passwordData.value.password !== null &&
      passwordData.value.password !== "") ||
    (passwordData.value.newPassword !== null &&
      passwordData.value.newPassword !== "") ||
    (passwordData.value.newPasswordConfirmation !== null &&
      passwordData.value.newPasswordConfirmation !== "")
);

const resetError = (field) => {
  if (validationErrors.value.passwordUpdateForm?.[field]) {
    validationErrors.value.passwordUpdateForm[field] = null;
  }
};

const icon = ref("");
const active = ref(false);

const updatePassword = async () => {
  try {
    validationErrors.value["passwordUpdateForm"] = {};
    const isValid = await validateData(
      "passwordUpdateForm",
      passwordSchema,
      passwordData.value
    );
    if (!isValid) return;
    const updatedPassword = await adminStore.updatePassword(passwordData.value);
    passwordData.password = updatedPassword;
    passwordData.value = {
      password: null,
      newPassword: null,
      newPasswordConfirmation: null,
    };
    toggleModal(true);
  } catch (error) {
    passwordData.value = {
      password: null,
      newPassword: null,
      newPasswordConfirmation: null,
    };
    toggleModal(true);
    icon.value = "danger";
  }
};

const toggleModal = (bool) => {
  active.value = bool;
};
</script>

<style lang="scss" scoped>
.grid-container {
  @apply grid grid-cols-2 gap-5;
}

.button-wrapper {
  @apply pt-5 flex justify-center;
}

.modal-content {
  @apply py-5;
}
</style>
