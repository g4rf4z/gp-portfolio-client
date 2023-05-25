<template>
  <ul>
    <li
      v-for="(experience, index) in sortedExperiences"
      :key="index"
      :class="{
        dimmed:
          hoveredExperienceId !== null && experience.id !== hoveredExperienceId,
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
        @mouseover="hoveredCard(experience.id)"
        @mouseleave="unhovered"
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
import ExperienceCardMolecule from '#/molecules/ExperienceCard.vue';
import IconLinkMolecule from '#/molecules/IconLink.vue';

import { computed, ref } from 'vue';
import { useExperienceStore } from '@/store/experienceStore';
import { useAuthenticationStore } from '@/store/authenticationStore';

const experienceStore = useExperienceStore();
const authenticationStore = useAuthenticationStore();

const sortedExperiences = computed(() =>
  experienceStore.experiences
    .slice()
    .sort((a, b) => new Date(b.from) - new Date(a.from))
);
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

let hoveredExperienceId = ref(null);

const hoveredCard = (id) => {
  hoveredExperienceId.value = id;
};

const unhovered = () => {
  hoveredExperienceId.value = null;
};
</script>

<style lang="scss" scoped>
ul {
  @apply flex flex-col space-y-5;

  li.dimmed {
    @apply opacity-25;
  }

  .icon-link {
    @apply p-5 flex items-center justify-center text-indigo-200 bg-slate-800/25;
    @apply hover:text-teal-200 hover:bg-slate-800 hover:duration-300;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0.5;
}
</style>
