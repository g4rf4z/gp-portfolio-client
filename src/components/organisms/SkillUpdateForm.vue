<template>
  <form @submit.prevent="updateSkill">
    <form-input-molecule
      label="Compétence"
      id="name"
      name="name"
      v-model="skill.name"
      placeholder="Exemple : JavaScript"
      :error-message="validationErrors.skillUpdateForm?.name"
      @input="resetError('name')"
    ></form-input-molecule>
    <form-input-molecule
      label="Image"
      id="image"
      name="image"
      type="file"
      v-model="skill.image"
      :error-message="validationErrors.skillUpdateForm?.image"
      @change="previewImage"
      @input="resetError('image')"
    ></form-input-molecule>
    <picture>
      <img :src="skill.image" class="image-preview" />
    </picture>
    <form-input-molecule
      label="Progression"
      id="progress"
      name="progress"
      type="number"
      v-model="skill.progress"
      placeholder="Exemple : 60"
      :min="0"
      :max="100"
      :error-message="validationErrors.skillUpdateForm?.progress"
      @input="resetError('progress')"
    ></form-input-molecule>
    <div class="button-wrapper">
      <button-atom type="submit" :loading="loading">Modifier</button-atom>
    </div>
  </form>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import ButtonAtom from "#/atoms/Button.vue";

import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSkillStore } from "@/store/skillStore";
import { skillSchema } from "@/validations/skillSchema";
import { validationErrors, validateData } from "@/services/yup";

const route = useRoute();
const router = useRouter();

const skillStore = useSkillStore();

const skill = computed(() => skillStore.skill);
const loading = computed(() => skillStore.loaders.updateSkill);

const retrieveSkill = async () => {
  try {
    await skillStore.retrieveSkill(route.params.id);
  } catch (error) {
    console.error(error);
  }
};
retrieveSkill();

const newImage = ref();

const previewImage = async (event) => {
  const imagePreview = document.querySelector(".image-preview");
  newImage.value = event.target.files[0];
  if (newImage.value.type && newImage.value.type.match("image.*")) {
    const imageUrl = URL.createObjectURL(newImage.value);
    imagePreview.src = imageUrl;
  } else {
    imageUrl = null;
    imagePreview.src = "";
  }
};

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const resetError = (field) => {
  if (validationErrors.value.skillUpdateForm?.[field]) {
    validationErrors.value.skillUpdateForm[field] = null;
  }
};

const updateSkill = async () => {
  try {
    validationErrors.value["skillUpdateForm"] = {};
    const isValid = await validateData(
      ["skillUpdateForm"],
      skillSchema,
      skill.value
    );
    if (!isValid) return;
    if (newImage.value) {
      skill.value.image = await toBase64(newImage.value);
    }
    skill.value.progress = parseInt(skill.value.progress);
    await skillStore.updateSkill(route.params.id, skill.value);
    router.push({ name: "skills" });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
img {
  @apply h-20 w-20 border border-teal-200;
}

.button-wrapper {
  @apply pt-5 flex justify-center;
}
</style>
