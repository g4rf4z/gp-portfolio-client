<template>
  <section-wrapper-atom id="home">
    <intro-banner-organism></intro-banner-organism>
  </section-wrapper-atom>
  <section-wrapper-atom id="about" :prefix="link.prefix" :name="link.name">
    <about-me-organism></about-me-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import IntroBannerOrganism from "#/organisms/IntroBanner.vue";
import AboutMeOrganism from "#/organisms/AboutMe.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("about");
</script>

<style lang="scss" scoped>
#home {
  @apply flex flex-col justify-center;
}
</style>
