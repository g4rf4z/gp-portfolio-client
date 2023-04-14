<template>
  <section-wrapper-atom id="skills" :prefix="link.prefix" :name="link.name">
    <skills-list-organism></skills-list-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import SkillsListOrganism from "#/organisms/SkillsList.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("skills");
</script>
