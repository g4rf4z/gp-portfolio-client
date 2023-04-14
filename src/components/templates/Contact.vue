<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <contact-form-organism></contact-form-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import ContactFormOrganism from "#/organisms/ContactForm.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("contact");
</script>
