<template>
  <card-wrapper-atom class="experience-card">
    <div v-if="session && admin" class="icons-wrapper">
      <icon-link-molecule
        :bounce="bounce"
        :to="`/update-experience/${id}`"
        weight="fas"
        icon="pen-to-square"
        size="1x"
        class="update-icon"
        @mouseover="toggleBounce"
        @mouseout="toggleBounce"
      ></icon-link-molecule>
      <icon-atom
        :shake="shake"
        weight="fas"
        icon="trash"
        size="1x"
        class="delete-icon"
        @mouseover="toggleShake"
        @mouseout="toggleShake"
        @click="deleteExperience(id)"
      ></icon-atom>
    </div>
    <div class="informations-wrapper">
      <h4>{{ position }} · {{ company }}</h4>
      <p class="dates">{{ from }} - {{ to }}</p>
      <p>{{ city }}, {{ country }}</p>
      <p class="tasks">{{ tasks }}</p>
    </div>
    <div class="technologies-wrapper">
      <h5
        v-for="(technology, index) in technologies"
        :key="index"
        class="technologies"
      >
        {{ technology }}
      </h5>
    </div>
  </card-wrapper-atom>
</template>

<script setup>
import CardWrapperAtom from '#/atoms/CardWrapper.vue';
import IconAtom from '#/atoms/Icon.vue';
import IconLinkMolecule from '#/molecules/IconLink.vue';

import { computed } from 'vue';
import { useAuthenticationStore } from '@/store/authenticationStore';
import { useExperienceStore } from '@/store/experienceStore';

import { useToggle } from '@/utils/useToggle';

const props = defineProps({
  id: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  tasks: { type: String, required: true },
  technologies: { type: Array, required: true },
});

const authenticationStore = useAuthenticationStore();
const experienceStore = useExperienceStore();

const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);

const { animation: bounce, toggleAnimation: toggleBounce } = useToggle();
const { animation: shake, toggleAnimation: toggleShake } = useToggle();

const deleteExperience = async (id) => {
  try {
    await experienceStore.deleteExperience(id);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.experience-card {
  @apply flex flex-col break-words;

  .icons-wrapper {
    @apply flex items-center justify-end space-x-2 duration-300;

    .update-icon {
      @apply text-indigo-200;
      @apply hover:text-teal-200;
    }

    .delete-icon {
      @apply text-indigo-200 cursor-pointer;
      @apply hover:text-red-400;
    }
  }

  .informations-wrapper {
    @apply select-none;

    h4 {
      @apply font-medium text-lg text-indigo-200 sm:text-xl;
    }

    .dates {
      @apply font-mono text-teal-200;
    }

    .tasks {
      @apply mt-5 whitespace-pre-wrap;
    }
  }

  .technologies-wrapper {
    @apply mt-5 space-y-2;

    .technologies {
      @apply mr-2 px-4 py-1 inline-block rounded-full font-mono text-teal-200 bg-slate-950/50;
    }
  }
}
</style>
