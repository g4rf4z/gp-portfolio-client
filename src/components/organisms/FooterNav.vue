<template>
  <div class="footer-wrapper">
    <div class="logo-wrapper">
      <icon-link-molecule
        to="/"
        weight="fas"
        icon="cube"
        class="logo"
      ></icon-link-molecule>
    </div>
    <link-atom is="a" to="https://github.com/g4rf4z/">
      <small>© 2022 - 2023 - Grégoire Pinte</small>
    </link-atom>
  </div>
</template>

<script setup>
import IconLinkMolecule from "#/molecules/IconLink.vue";
import LinkAtom from "#/atoms/Link.vue";
</script>

<style lang="scss" scoped>
.footer-wrapper {
  @apply h-20 w-full flex flex-col items-center justify-evenly;

  .logo {
    @apply text-teal-200;
  }

  small {
    @apply font-mono text-indigo-200 duration-300;
    @apply hover:text-teal-200;
  }
}
</style>
