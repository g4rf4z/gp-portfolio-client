<template>
  <header-template></header-template>
  <social-nav-organism></social-nav-organism>
  <suspense>
    <template #default>
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component"></component>
        </transition>
      </router-view>
    </template>
    <template #fallback>
      <p>Loading...</p>
    </template>
  </suspense>
  <email-molecule></email-molecule>
  <footer-template></footer-template>
</template>

<script setup>
import HeaderTemplate from "#/templates/Header.vue";
import SocialNavOrganism from "#/organisms/SocialNav.vue";
import EmailMolecule from "#/molecules/Email.vue";
import FooterTemplate from "#/templates/Footer.vue";
</script>

<style lang="scss">
html {
  @apply scroll-smooth;
}

body {
  @apply px-5 text-slate-400 bg-slate-900;
  @apply sm:px-28 lg:px-40;

  &.nav-is-toggled {
    @apply overflow-hidden;
  }
}

// ------------------------- Transition
.v-enter-active,
.v-leave-active {
  @apply transition-opacity duration-300;
}

.v-enter-from,
.v-leave-to {
  @apply opacity-0;
}

// ------------------------- Scrollbar
::-webkit-scrollbar {
  @apply w-2;
}

::-webkit-scrollbar-track {
  @apply my-1 bg-transparent;
}

::-webkit-scrollbar-thumb {
  @apply rounded bg-slate-400;
}

// ------------------------- Selection
::selection {
  @apply bg-teal-200/25;
}
</style>
