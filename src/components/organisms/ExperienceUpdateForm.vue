<template>
  <form @submit.prevent="updateExperience">
    <form-input-molecule
      label="Poste"
      id="position"
      name="position"
      v-model="experience.position"
      placeholder="Développeur JavaScript"
      :error-message="validationErrors.experienceUpdateForm?.position"
      @input="resetError('position')"
    ></form-input-molecule>
    <form-input-molecule
      label="Entreprise"
      id="company"
      name="company"
      v-model="experience.company"
      placeholder="Google LLC"
      :error-message="validationErrors.experienceUpdateForm?.company"
      @input="resetError('company')"
    ></form-input-molecule>
    <form-input-molecule
      label="Ville"
      id="city"
      name="city"
      v-model="experience.city"
      placeholder="Mountain View"
      :error-message="validationErrors.experienceUpdateForm?.city"
      @input="resetError('city')"
    ></form-input-molecule>
    <form-input-molecule
      label="Pays"
      id="country"
      name="country"
      v-model="experience.country"
      placeholder="États-Unis"
      :error-message="validationErrors.experienceUpdateForm?.country"
      @input="resetError('country')"
    ></form-input-molecule
    ><form-input-molecule
      label="Date de début"
      id="from"
      name="from"
      type="date"
      v-model="from"
      :error-message="validationErrors.experienceUpdateForm?.from"
      :max="currentDate"
      @input="resetError('from')"
    ></form-input-molecule>
    <form-input-molecule
      label="Date de fin"
      id="to"
      name="to"
      type="date"
      v-model="to"
      :error-message="validationErrors.experienceUpdateForm?.to"
      @input="resetError('to')"
    ></form-input-molecule>
    <form-textarea-molecule
      label="Tâche(s)"
      id="tasks"
      name="tasks"
      v-model="experience.tasks"
      placeholder="Décrivez les tâches effectuées..."
      :error-message="validationErrors.experienceUpdateForm?.tasks"
      @input="resetError('tasks')"
    ></form-textarea-molecule>
    <form-textarea-molecule
      label="Technologie(s)"
      id="technologies"
      name="technologies"
      v-model="experience.technologies"
      placeholder="Renseignez les technologies utilisées..."
      :error-message="validationErrors.experienceUpdateForm?.technologies"
      @input="resetError('technologies')"
    ></form-textarea-molecule>
    <div class="button-wrapper">
      <button-atom type="submit" :loading="loading">Modifier</button-atom>
    </div>
  </form>
</template>

<script setup>
import FormInputMolecule from '#/molecules/FormInput.vue';
import FormTextareaMolecule from '#/molecules/FormTextarea.vue';
import ButtonAtom from '#/atoms/Button.vue';

import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useExperienceStore } from '@/store/experienceStore';
import { experienceSchema } from '@/validations/experienceSchema';
import { validationErrors, validateData } from '@/services/yup';

const route = useRoute();
const router = useRouter();

const experienceStore = useExperienceStore();

const experience = computed(() => experienceStore.experience);
const loading = computed(() => experienceStore.loaders.updateExperience);

const currentDate = ref(new Date().toISOString().slice(0, 10));

const from = computed({
  get() {
    return experience.value.fromToIsoString;
  },
  set(value) {
    experience.value.from = new Date(value);
  },
});

const to = computed({
  get() {
    return experience.value.toToIsoString;
  },
  set(value) {
    experience.value.to = new Date(value);
  },
});

const retrieveExperience = async () => {
  try {
    await experienceStore.retrieveExperience(route.params.id);
  } catch (error) {
    console.error(error);
  }
};
retrieveExperience();

const resetError = (field) => {
  if (validationErrors.value.experienceUpdateForm?.[field]) {
    validationErrors.value.experienceUpdateForm[field] = null;
  }
};

const updateExperience = async () => {
  try {
    validationErrors.value['experienceUpdateForm'] = {};

    const isValid = await validateData(
      'experienceUpdateForm',
      experienceSchema,
      experience.value
    );

    if (!isValid) return;

    if (
      experience.value.technologies &&
      typeof experience.value.technologies === 'string'
    ) {
      const separator = /[,|-]/;
      experience.value.technologies = experience.value.technologies
        .split(separator)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    await experienceStore.updateExperience(route.params.id, experience.value);
    router.push({ name: 'experiences' });
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
