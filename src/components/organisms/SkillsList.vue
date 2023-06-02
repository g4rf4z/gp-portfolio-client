<template>
  <ul>
    <li v-for="(skill, index) in paginatedSkills" :key="index">
      <skill-card-molecule
        :id="skill.id"
        :name="skill.name"
        :image="skill.image"
        :progress="skill.progress"
      ></skill-card-molecule>
    </li>
    <li>
      <icon-link-molecule
        v-if="session && admin"
        to="/create-skill"
        weight="fas"
        icon="plus"
        class="creation-icon"
      ></icon-link-molecule>
    </li>
  </ul>
  <div class="button-wrapper">
    <button-atom
      v-if="pageSize >= 5"
      @click="dataLoaded ? displayLessSkills() : displayMoreSkills()"
    >
      {{ dataLoaded ? 'Voir moins' : 'Voir plus' }}
    </button-atom>
  </div>
</template>

<script setup>
import SkillCardMolecule from '#/molecules/SkillCard.vue';
import IconLinkMolecule from '#/molecules/IconLink.vue';
import ButtonAtom from '#/atoms/Button.vue';

import { computed } from 'vue';
import { useSkillStore } from '@/store/skillStore';
import { useAuthenticationStore } from '@/store/authenticationStore';

import { usePagination } from '@/utils/usePagination';

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

const {
  pageSize,
  paginatedData: paginatedSkills,
  displayMoreData: displayMoreSkills,
  displayLessData: displayLessSkills,
  dataLoaded,
} = usePagination(skills, 5);
</script>

<style lang="scss" scoped>
ul {
  @apply flex flex-col space-y-5;
  @apply md:grid md:grid-cols-2 md:gap-5 md:space-y-0 2xl:grid 2xl:grid-cols-3 2xl:gap-5 2xl:space-y-0;

  .creation-icon {
    @apply h-[152px] flex items-center justify-center rounded text-indigo-200 bg-slate-800/25 duration-300;
    @apply hover:text-teal-200 hover:bg-slate-800/50;
  }
}

.button-wrapper {
  @apply mt-5 flex items-center justify-center;
}
</style>
