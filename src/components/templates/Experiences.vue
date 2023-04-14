<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <experiences-list-organism></experiences-list-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import ExperiencesListOrganism from "#/organisms/ExperiencesList.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("experiences");
</script>
