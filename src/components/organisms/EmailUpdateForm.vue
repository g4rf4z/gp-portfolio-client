<template>
  <form @submit.prevent="updateEmail">
    <form-input-molecule
      label="Email"
      id="email"
      name="email"
      v-model="emailData.email"
      placeholder="Email"
      :error-message="validationErrors.emailUpdateForm?.email"
      @input="resetError('email')"
    ></form-input-molecule>
    <div class="button-wrapper">
      <button-atom :disabled="!isModified" :loading="loading" type="submit"
        >Sauvegarder</button-atom
      >
    </div>
  </form>
  <modal-atom :active="active" :type="icon" @close-modal="toggleModal(false)">
    <p v-if="admin.email" class="modal-content">
      Votre email a été mis à jour avec succès !
    </p>
    <p v-else class="modal-content">
      Une erreur est survenue lors de la mise à jour de votre email.
    </p>
  </modal-atom>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import ButtonAtom from "#/atoms/Button.vue";
import ModalAtom from "#/atoms/Modal.vue";

import { ref, reactive, computed } from "vue";

import { validationErrors, validateData } from "@/services/yup";
import { emailSchema } from "@/validations/emailSchema";

import { useAuthenticationStore } from "@/store/authenticationStore";
import { useAdminStore } from "@/store/adminStore";

const authenticationStore = useAuthenticationStore();
const adminStore = useAdminStore();

const admin = computed(() => authenticationStore.admin);
const loading = computed(() => authenticationStore.loaders.updateEmail);

const emailData = reactive({
  email: admin.value.email,
});

const isModified = computed(() => emailData.email !== admin.value?.email);

const resetError = (field) => {
  if (validationErrors.value.emailUpdateForm?.[field]) {
    validationErrors.value.emailUpdateForm[field] = null;
  }
};

const icon = ref("");
const active = ref(false);

const updateEmail = async () => {
  try {
    validationErrors.value["emailUpdateForm"] = {};
    const isValid = await validateData(
      "emailUpdateForm",
      emailSchema,
      emailData
    );
    if (!isValid) return;
    const updatedEmail = await adminStore.updateEmail(emailData);
    emailData.email = updatedEmail;
    toggleModal(true);
  } catch (error) {
    emailData.value = {
      email: admin?.email,
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
.button-wrapper {
  @apply pt-5 flex justify-center;
}

.modal-content {
  @apply py-5;
}
</style>
