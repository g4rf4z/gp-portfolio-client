<template>
  <card-wrapper-atom class="experience-card">
    <div v-if="session && admin" class="icons-wrapper">
      <icon-link-molecule
        @mouseover="enableIconBounce"
        @mouseout="disableIconBounce"
        :bounce="bounce"
        :to="`/update-experience/${id}`"
        weight="fas"
        icon="pen-to-square"
        size="1x"
        class="update-icon"
      ></icon-link-molecule>
      <icon-atom
        @mouseover="enableIconShake"
        @mouseout="disableIconShake"
        @click="deleteExperience(id)"
        :shake="shake"
        weight="fas"
        icon="trash"
        size="1x"
        class="delete-icon"
      ></icon-atom>
    </div>
    <h5>{{ position }}</h5>
    <p class="company">{{ company }}</p>
    <p>{{ from }} - {{ to }}</p>
    <p>{{ city }}, {{ country }}</p>
    <p class="description">{{ tasks }}</p>
  </card-wrapper-atom>
</template>

<script setup>
import CardWrapperAtom from "#/atoms/CardWrapper.vue";
import IconAtom from "#/atoms/Icon.vue";
import IconLinkMolecule from "#/molecules/IconLink.vue";

import { computed, ref } from "vue";
import { useAuthenticationStore } from "@/store/authenticationStore";
import { useExperienceStore } from "@/store/experienceStore";

const props = defineProps({
  id: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  tasks: { type: [Array, String], required: true },
});

const authenticationStore = useAuthenticationStore();
const experienceStore = useExperienceStore();

const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);

const bounce = ref(),
  shake = ref();
const toggle = (variable) => (variable.value = !variable.value);
const enableIconBounce = () => toggle(bounce);
const disableIconBounce = () => toggle(bounce);
const enableIconShake = () => toggle(shake);
const disableIconShake = () => toggle(shake);

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

  h5 {
    @apply font-medium text-xl;
  }

  .company {
    @apply font-mono text-teal-200;
  }

  .description {
    @apply mt-5 whitespace-pre-wrap;
  }
}
</style>
