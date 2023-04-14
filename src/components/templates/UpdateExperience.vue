<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <experience-update-form-organism></experience-update-form-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import ExperienceUpdateFormOrganism from "#/organisms/ExperienceUpdateForm.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("experience-update-form");
</script>
