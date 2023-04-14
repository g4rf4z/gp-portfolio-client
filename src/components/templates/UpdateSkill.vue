<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <skill-update-form-organism></skill-update-form-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import SkillUpdateFormOrganism from "#/organisms/SkillUpdateForm.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("skill-update-form");
</script>
