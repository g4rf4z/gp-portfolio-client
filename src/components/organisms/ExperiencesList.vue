<template>
  <ul>
    <li
      v-for="(experience, index) in sortedExperiences"
      :key="index"
      :class="{
        dimmed: selectedCard !== null && selectedCard !== experience.id,
      }"
    >
      <experience-card-molecule
        :id="experience.id"
        :position="experience.position"
        :company="experience.company"
        :city="experience.city"
        :country="experience.country"
        :from="experience.fromToString"
        :to="experience.toToString"
        :tasks="experience.tasks"
        :technologies="experience.technologies"
        @mouseover="selectExperienceCard(experience.id)"
        @mouseleave="unselectExperienceCard"
      ></experience-card-molecule>
    </li>
    <li>
      <icon-link-molecule
        v-if="session && admin"
        to="/create-experience"
        weight="fas"
        icon="plus"
        class="creation-icon"
      ></icon-link-molecule>
    </li>
  </ul>
</template>

<script setup>
import ExperienceCardMolecule from '#/molecules/ExperienceCard.vue';
import IconLinkMolecule from '#/molecules/IconLink.vue';

import { computed, ref } from 'vue';
import { useExperienceStore } from '@/store/experienceStore';
import { useAuthenticationStore } from '@/store/authenticationStore';

const experienceStore = useExperienceStore();
const authenticationStore = useAuthenticationStore();

const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);
const sortedExperiences = computed(() =>
  experienceStore.experiences
    .slice()
    .sort((a, b) => new Date(b.from) - new Date(a.from))
);

const retrieveExperiences = async () => {
  try {
    await experienceStore.retrieveExperiences();
  } catch (error) {
    console.error(error);
  }
};
retrieveExperiences();

const selectedCard = ref(null);

const selectExperienceCard = (id) => {
  selectedCard.value = id;
};
const unselectExperienceCard = () => {
  selectedCard.value = null;
};
</script>

<style lang="scss" scoped>
ul {
  @apply flex flex-col;

  li.dimmed {
    @apply opacity-25;
  }

  .creation-icon {
    @apply h-[244px] flex items-center justify-center rounded text-indigo-200 bg-slate-800/25 duration-300;
    @apply hover:text-teal-200 hover:bg-slate-800/50;
  }
}
</style>
