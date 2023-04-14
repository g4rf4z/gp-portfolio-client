<template>
  <form @submit.prevent="createExperience">
    <form-input-molecule
      label="Poste"
      id="position"
      name="position"
      v-model="experienceData.position"
      placeholder="Exemple : Développeur JavaScript"
      :error-message="validationErrors.experienceCreationForm?.position"
      @input="resetError('position')"
    ></form-input-molecule>
    <form-input-molecule
      label="Entreprise"
      id="company"
      name="company"
      v-model="experienceData.company"
      placeholder="Exemple : Google LLC"
      :error-message="validationErrors.experienceCreationForm?.company"
      @input="resetError('company')"
    ></form-input-molecule>
    <form-input-molecule
      label="Ville"
      id="city"
      name="city"
      v-model="experienceData.city"
      placeholder="Exemple : Mountain View"
      :error-message="validationErrors.experienceCreationForm?.city"
      @input="resetError('city')"
    ></form-input-molecule>
    <form-input-molecule
      label="Pays"
      id="country"
      name="country"
      v-model="experienceData.country"
      placeholder="Exemple : États-Unis"
      :error-message="validationErrors.experienceCreationForm?.country"
      @input="resetError('country')"
    ></form-input-molecule
    ><form-input-molecule
      label="Date de début"
      id="from"
      name="from"
      type="date"
      v-model="dateFrom"
      :error-message="validationErrors.experienceCreationForm?.from"
      @input="resetError('from')"
    ></form-input-molecule>
    <form-input-molecule
      label="Date de fin"
      id="to"
      name="to"
      type="date"
      v-model="dateTo"
      :error-message="validationErrors.experienceCreationForm?.to"
      @input="resetError('to')"
    ></form-input-molecule>
    <form-textarea-molecule
      label="Descriptif"
      id="tasks"
      name="tasks"
      v-model="experienceData.tasks"
      placeholder="Décrivez vos missions en quelques lignes..."
      :error-message="validationErrors.experienceCreationForm?.tasks"
      @input="resetError('tasks')"
    ></form-textarea-molecule>
    <div class="button-wrapper">
      <button-atom type="submit" :loading="loading">Modifier</button-atom>
    </div>
  </form>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import FormTextareaMolecule from "#/molecules/FormTextarea.vue";
import ButtonAtom from "#/atoms/Button.vue";

import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useExperienceStore } from "@/store/experienceStore";
import { experienceSchema } from "@/validations/experienceSchema";
import { validationErrors, validateData } from "@/services/yup";

const router = useRouter();

const experienceStore = useExperienceStore();

const loading = computed(() => experienceStore.loaders.createExperience);

const experienceData = reactive({
  position: null,
  company: null,
  city: null,
  country: null,
  from: null,
  to: null,
  tasks: null,
});

const dateFrom = computed({
  get: () =>
    experienceData.from instanceof Date
      ? experienceData.from.toISOString().slice(0, 10)
      : experienceData.from,
  set: (value) => (experienceData.from = new Date(value)),
});

const dateTo = computed({
  get: () =>
    experienceData.to instanceof Date
      ? experienceData.to.toISOString().slice(0, 10)
      : experienceData.to,
  set: (value) => (experienceData.to = new Date(value)),
});

const resetError = (field) => {
  if (validationErrors.value.experienceCreationForm?.[field]) {
    validationErrors.value.experienceCreationForm[field] = null;
  }
};

const createExperience = async () => {
  try {
    validationErrors.value["experienceCreationForm"] = {};
    const isValid = await validateData(
      ["experienceCreationForm"],
      experienceSchema,
      experienceData
    );
    if (!isValid) return;
    await experienceStore.createExperience(experienceData);
    router.push({ name: "experiences" });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  @apply pt-5 flex justify-center;
}
</style>
