<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <experience-creation-form-organism></experience-creation-form-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import ExperienceCreationFormOrganism from "#/organisms/ExperienceCreationForm.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("experience-create-form");
</script>
