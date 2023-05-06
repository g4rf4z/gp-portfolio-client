<template>
  <aside>
    <link-atom
      is="a"
      to="mailto:gregoire.pinte@gmail.com"
      aria-label="Envoyer un email à gregoire.pinte@gmail.com"
      >gregoire.pinte@gmail.com</link-atom
    >
  </aside>
</template>

<script setup>
import LinkAtom from "#/atoms/Link.vue";
</script>

<style lang="scss" scoped>
aside {
  @apply hidden sm:block pb-10 sm:fixed sm:right-10 sm:bottom-20 sm:text-indigo-200;

  a {
    writing-mode: vertical-rl;
    @apply font-mono tracking-widest duration-300;

    &:hover {
      @apply text-teal-200 -translate-y-1;
    }
  }

  &::after {
    content: "";
    @apply h-full w-[1px] absolute bottom-0 left-[44%] bg-indigo-200 translate-y-full;
  }
}
</style>
