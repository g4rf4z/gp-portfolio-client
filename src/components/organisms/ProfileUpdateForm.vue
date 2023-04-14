<template>
  <form @submit.prevent="updateProfile">
    <div class="grid-container">
      <form-input-molecule
        label="Nom"
        id="lastname"
        name="lastname"
        v-model="profileData.lastname"
        placeholder="Nom"
        :error-message="validationErrors.profileUpdateForm?.lastname"
        @input="resetError('lastname')"
      ></form-input-molecule>
      <form-input-molecule
        label="Prénom"
        id="firstname"
        name="firstname"
        v-model="profileData.firstname"
        placeholder="Prénom"
        :error-message="validationErrors.profileUpdateForm?.firstname"
        @input="resetError('firstname')"
      ></form-input-molecule>
      <form-input-molecule
        label="Pseudonyme"
        id="nickname"
        name="nickname"
        v-model="profileData.nickname"
        placeholder="Pseudonyme"
        :error-message="validationErrors.profileUpdateForm?.nickname"
        @input="resetError('nickname')"
      ></form-input-molecule>
    </div>
    <div class="button-wrapper">
      <button-atom :disabled="!isModified" :loading="loading" type="submit"
        >Sauvegarder</button-atom
      >
    </div>
  </form>
  <modal-atom :active="active" :type="icon" @close-modal="toggleModal(false)">
    <p v-if="admin" class="modal-content">
      Votre profil a été mis à jour avec succès !
    </p>
    <p v-else class="modal-content">
      Une erreur est survenue lors de la mise à jour de votre profil.
    </p>
  </modal-atom>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import ButtonAtom from "#/atoms/Button.vue";
import ModalAtom from "#/atoms/Modal.vue";

import { ref, reactive, computed } from "vue";

import { validationErrors, validateData } from "@/services/yup";
import { profileSchema } from "@/validations/profileSchema";

import { useAuthenticationStore } from "@/store/authenticationStore";
import { useAdminStore } from "@/store/adminStore";

const authenticationStore = useAuthenticationStore();
const adminStore = useAdminStore();

const admin = computed(() => authenticationStore.admin);
const loading = computed(() => authenticationStore.loaders.updateAdminProfile);

const profileData = reactive({
  lastname: admin.value.lastname,
  firstname: admin.value.firstname,
  nickname: admin.value.nickname,
});

const isModified = computed(
  () =>
    profileData.lastname !== admin.value?.lastname ||
    profileData.firstname !== admin.value?.firstname ||
    profileData.nickname !== admin.value?.nickname
);

const resetError = (field) => {
  if (validationErrors.value.profileUpdateForm?.[field]) {
    validationErrors.value.profileUpdateForm[field] = null;
  }
};

const icon = ref("");
const active = ref(false);

const updateProfile = async () => {
  try {
    validationErrors.value["profileUpdateForm"] = {};
    const isValid = await validateData(
      "profileUpdateForm",
      profileSchema,
      profileData
    );
    if (!isValid) return;
    await adminStore.updateProfile(profileData);
    toggleModal(true);
  } catch (error) {
    profileData.value = {
      lastname: admin?.lastname,
      firstname: admin?.firstname,
      nickname: admin?.nickname,
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
  @apply grid grid-cols-3 gap-5;
}

.button-wrapper {
  @apply pt-5 flex justify-center;
}

.modal-content {
  @apply py-5;
}
</style>
