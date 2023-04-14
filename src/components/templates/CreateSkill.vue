<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <skill-creation-form-organism></skill-creation-form-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import SkillCreationFormOrganism from "#/organisms/SkillCreationForm.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("skill-create-form");
</script>
