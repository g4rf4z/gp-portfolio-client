<template>
  <section-wrapper-atom>
    <article>
      <h1>404</h1>
      <p>
        Une erreur est survenue, il semble que la page recherchée n'existe pas.
      </p>
    </article>
  </section-wrapper-atom>
</template>

<script setup>
import SectionWrapperAtom from "#/atoms/SectionWrapper.vue";
</script>

<style lang="scss" scoped>
section {
  @apply flex items-center justify-center;

  article {
    @apply flex flex-col items-center;

    h1 {
      @apply font-bold text-8xl text-indigo-200;
    }

    p {
      @apply flex;
    }
  }
}
</style>
