<template>
  <form @submit.prevent="createSkill">
    <form-input-molecule
      label="Compétence"
      id="name"
      name="name"
      v-model="skillData.name"
      placeholder="Exemple : JavaScript"
      :error-message="validationErrors.skillCreationForm?.name"
      @input="resetError('name')"
    ></form-input-molecule>
    <form-input-molecule
      label="Image"
      id="image"
      name="image"
      type="file"
      v-model="skillData.image"
      :error-message="validationErrors.skillCreationForm?.image"
      @change="previewImage"
      @input="resetError('image')"
    ></form-input-molecule>
    <picture>
      <img v-if="skillData.image" class="image-preview" />
    </picture>
    <form-input-molecule
      label="Progression"
      id="progress"
      name="progress"
      type="number"
      v-model="skillData.progress"
      placeholder="Exemple : 60"
      :min="0"
      :max="100"
      :error-message="validationErrors.skillCreationForm?.progress"
      @input="resetError('progress')"
    ></form-input-molecule>
    <div class="button-wrapper">
      <button-atom type="submit" :loading="loading">Créer</button-atom>
    </div>
  </form>
</template>

<script setup>
import FormInputMolecule from "#/molecules/FormInput.vue";
import ButtonAtom from "#/atoms/Button.vue";

import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useSkillStore } from "@/store/skillStore";
import { skillSchema } from "@/validations/skillSchema";
import { validationErrors, validateData } from "@/services/yup";

const router = useRouter();

const skillStore = useSkillStore();

const loading = computed(() => skillStore.loaders.createSkill);

const skillData = ref({
  name: null,
  image: null,
  progress: null,
});

const previewImage = async (event) => {
  const imagePreview = document.querySelector(".image-preview");
  skillData.value.image = event.target.files[0];
  if (
    skillData.value.image.type &&
    skillData.value.image.type.match("image.*")
  ) {
    const imageUrl = URL.createObjectURL(skillData.value.image);
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
  if (validationErrors.value.skillCreationForm?.[field]) {
    validationErrors.value.skillCreationForm[field] = null;
  }
};

const createSkill = async () => {
  try {
    validationErrors.value["skillCreationForm"] = {};
    const isValid = await validateData(
      ["skillCreationForm"],
      skillSchema,
      skillData.value
    );
    if (!isValid) return;
    skillData.value.image = await toBase64(skillData.value.image);
    skillData.value.progress = parseInt(skillData.value.progress);
    await skillStore.createSkill(skillData.value);
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
