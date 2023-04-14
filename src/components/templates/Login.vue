<template>
  <section-wrapper-atom :prefix="link.prefix" :name="link.name">
    <login-form-organism></login-form-organism>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
import LoginFormOrganism from "#/organisms/LoginForm.vue";

import { useLayoutStore } from "@/store/layoutStore";

const layoutStore = useLayoutStore();

const link = layoutStore.getNavLink("login");
</script>
