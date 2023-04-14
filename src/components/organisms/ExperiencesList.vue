<template>
  <ul>
    <li v-for="(experience, index) in experiences" :key="index">
      <experience-card-molecule
        :id="experience.id"
        :position="experience.position"
        :company="experience.company"
        :city="experience.city"
        :country="experience.country"
        :from="experience.fromToString"
        :to="experience.toToString"
        :tasks="experience.tasks"
      ></experience-card-molecule>
    </li>
    <icon-link-molecule
      v-if="session && admin"
      to="/create-experience"
      weight="fas"
      icon="plus"
      class="icon-link"
    ></icon-link-molecule>
  </ul>
</template>

<script setup>
import ExperienceCardMolecule from "#/molecules/ExperienceCard.vue";
import IconLinkMolecule from "#/molecules/IconLink.vue";

import { computed } from "vue";
import { useExperienceStore } from "@/store/experienceStore";
import { useAuthenticationStore } from "@/store/authenticationStore";

const experienceStore = useExperienceStore();
const authenticationStore = useAuthenticationStore();

const experiences = computed(() => experienceStore.experiences);
const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);

const retrieveExperiences = async () => {
  try {
    await experienceStore.retrieveExperiences();
  } catch (error) {
    console.error(error);
  }
};
retrieveExperiences();
</script>

<style lang="scss" scoped>
ul {
  @apply flex flex-col space-y-5;

  .icon-link {
    @apply p-5 flex items-center justify-center text-indigo-200 bg-slate-800/25;
    @apply hover:text-teal-200 hover:bg-slate-800 hover:duration-300;
  }
}
</style>
