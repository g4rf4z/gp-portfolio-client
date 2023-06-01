<template>
  <ul>
    <li v-for="(skill, index) in skills" :key="index">
      <skill-card-molecule
        :id="skill.id"
        :name="skill.name"
        :image="skill.image"
        :progress="skill.progress"
      ></skill-card-molecule>
    </li>
    <icon-link-molecule
      v-if="session && admin"
      to="/create-skill"
      weight="fas"
      icon="plus"
      class="creation-icon"
    ></icon-link-molecule>
  </ul>
</template>

<script setup>
import SkillCardMolecule from '#/molecules/SkillCard.vue';
import IconLinkMolecule from '#/molecules/IconLink.vue';

import { computed } from 'vue';
import { useSkillStore } from '@/store/skillStore';
import { useAuthenticationStore } from '@/store/authenticationStore';

const skillStore = useSkillStore();
const authenticationStore = useAuthenticationStore();

const skills = computed(() => skillStore.skills);
const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);

const retrieveSkills = async () => {
  try {
    await skillStore.retrieveSkills();
  } catch (error) {
    console.error(error);
  }
};
retrieveSkills();
</script>

<style lang="scss" scoped>
ul {
  @apply flex flex-col space-y-5;
  @apply md:grid md:grid-cols-2 md:gap-5 md:space-y-0 2xl:grid 2xl:grid-cols-3 2xl:gap-5 2xl:space-y-0;
}

.creation-icon {
  @apply p-5 flex items-center justify-center duration-300 text-indigo-200 bg-slate-800/25;
  @apply hover:text-teal-200 hover:bg-slate-800;
}
</style>
