<template>
  <form @submit.prevent="postContact">
    <form-input-molecule
      label="Prénom"
      id="firstname"
      name="firstname"
      v-model="contactData.firstname"
      placeholder="Exemple : John"
      :error-message="validationErrors.contactForm?.firstname"
      @input="resetError('firstname')"
    ></form-input-molecule>
    <form-input-molecule
      label="Nom"
      id="lastname"
      name="lastname"
      v-model="contactData.lastname"
      placeholder="Exemple : Doe"
      :error-message="validationErrors.contactForm?.lastname"
      @input="resetError('lastname')"
    ></form-input-molecule>
    <form-input-molecule
      label="Email"
      id="email"
      name="email"
      v-model="contactData.email"
      placeholder="Exemple : john.doe@gmail.com"
      :error-message="validationErrors.contactForm?.email"
      @input="resetError('email')"
    ></form-input-molecule>
    <form-input-molecule
      v-show="false"
      label="Sujet"
      id="subject"
      name="subject"
      v-model="contactData.subject"
    ></form-input-molecule>
    <form-textarea-molecule
      label="Message"
      id="textarea"
      name="textarea"
      v-model="contactData.textarea"
      placeholder="Écrivez-moi..."
      :counter="counter"
      :error-message="validationErrors.contactForm?.textarea"
      @input="resetError('textarea')"
    ></form-textarea-molecule>
    <div class="button-wrapper">
      <button-atom type="submit" :loading="loading">Envoyer</button-atom>
    </div>
  </form>
  <modal-atom :active="active" :type="icon" @close-modal="toggleModal(false)">
    <p v-if="contact" class="modal-content">
      Votre message a été envoyé avec succès !
    </p>
    <p v-else class="modal-content">
      Une erreur est survenue, votre message n'a pas été envoyé.
    </p>
  </modal-atom>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import FormTextareaMolecule from "#/molecules/FormTextarea.vue";
import ButtonAtom from "#/atoms/Button.vue";
import ModalAtom from "#/atoms/Modal.vue";

import { computed, ref } from "vue";
import { useAirtableStore } from "@/store/airtableStore";
import { validationErrors, validateData } from "@/services/yup";
import { contactSchema } from "@/validations/contactSchema";

const airtableStore = useAirtableStore();

const contact = computed(() => airtableStore.contact);
const loading = computed(() => airtableStore.loaders.postContact);
const counter = computed(() => contactData.value.textarea?.length);

const contactData = ref({
  firstname: null,
  lastname: null,
  email: null,
  subject: null,
  textarea: null,
});
const active = ref(false);
const icon = ref("");

const resetError = (field) => {
  if (validationErrors.value.contactForm?.[field]) {
    validationErrors.value.contactForm[field] = null;
  }
};

const postContact = async () => {
  try {
    // If "subject" field is filled, the form submission is skipped.
    if (contactData.value.subject) {
      return;
    }

    validationErrors.value["contactForm"] = {};
    const isValid = await validateData(
      ["contactForm"],
      contactSchema,
      contactData.value
    );
    if (!isValid) return;
    await airtableStore.postContact(contactData.value);
    contactData.value = {
      lastname: null,
      firstname: null,
      email: null,
      textarea: null,
    };
    toggleModal(true);
  } catch (error) {
    contactData.value = {
      lastname: null,
      firstname: null,
      email: null,
      textarea: null,
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
