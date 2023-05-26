<template>
  <card-wrapper-atom class="skill-card">
    <div v-if="session && admin" class="icons-wrapper">
      <icon-link-molecule
        @mouseover="toggleBounce"
        @mouseout="toggleBounce"
        :bounce="bounce"
        :to="`/update-skill/${id}`"
        weight="fas"
        icon="pen-to-square"
        size="1x"
        class="update-icon"
      ></icon-link-molecule>
      <icon-atom
        @click="deleteSkill(id)"
        @mouseover="toggleShake"
        @mouseout="toggleShake"
        :shake="shake"
        weight="fas"
        icon="trash"
        size="1x"
        class="delete-icon"
      ></icon-atom>
    </div>
    <picture>
      <img :src="image" alt="Compétence" />
    </picture>
    <div class="skill-data">
      <h4>{{ name }}</h4>
      <h5>{{ currentProgress }}%</h5>
    </div>
    <progress-bar-atom :progress="progress"></progress-bar-atom>
  </card-wrapper-atom>
</template>

<script setup>
import CardWrapperAtom from '#/atoms/CardWrapper.vue';
import IconLinkMolecule from '#/molecules/IconLink.vue';
import IconAtom from '#/atoms/Icon.vue';
import ProgressBarAtom from '#/atoms/ProgressBar.vue';

import { computed, ref, watch } from 'vue';
import { useAuthenticationStore } from '@/store/authenticationStore';
import { useSkillStore } from '@/store/skillStore';

import { useToggle } from '@/utils/useToggle';

const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
  progress: { type: Number, required: true },
});

const authenticationStore = useAuthenticationStore();
const skillStore = useSkillStore();

const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);

const { animation: bounce, toggleAnimation: toggleBounce } = useToggle();
const { animation: shake, toggleAnimation: toggleShake } = useToggle();

const deleteSkill = async (id) => {
  try {
    await skillStore.deleteSkill(id);
  } catch (error) {
    console.error(error);
  }
};

let currentProgress = ref(props.progress);

const animateProgress = (newValue) => {
  let startAnimation = null;
  const animationDuration = 1500;
  const step = (timestamp) => {
    if (!startAnimation) startAnimation = timestamp;
    const progress = timestamp - startAnimation;
    currentProgress.value = Math.min(
      Math.floor((progress / animationDuration) * newValue),
      newValue
    );
    if (currentProgress.value < newValue) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
animateProgress(props.progress);

watch(
  () => props.progress,
  (newValue) => {
    animateProgress(newValue);
  }
);
</script>

<style lang="scss" scoped>
.skill-card {
  @apply flex flex-col;

  .icons-wrapper {
    @apply flex items-center justify-end space-x-2 duration-300;

    .update-icon {
      @apply text-indigo-200;
      @apply hover:text-teal-200;
    }

    .delete-icon {
      @apply text-indigo-200 cursor-pointer duration-300;
      @apply hover:text-red-400;
    }
  }

  picture {
    @apply flex items-center justify-center;

    img {
      @apply h-12 w-12;
      @apply sm:h-14 sm:w-14 xl:h-16 xl:w-16;
    }
  }

  .skill-data {
    @apply flex justify-between font-mono;

    h4,
    h5 {
      @apply duration-300;
    }
  }
}

.skill-card:hover h4 {
  @apply text-slate-100 translate-x-5;
}

.skill-card:hover h5 {
  @apply text-slate-100;
}
</style>
