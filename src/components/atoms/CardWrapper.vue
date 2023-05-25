<template>
  <article :class="class">
    <slot></slot>
  </article>
</template>

<script setup>
const props = defineProps({
  class: { type: String, default: null },
});
</script>

<style lang="scss" scoped>
article {
  @apply p-5 rounded duration-300;
}

article[class='skill-card'] {
  @apply bg-slate-800/50 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] drop-shadow-lg;
}

article[class='experience-card'] {
  @apply hover:bg-slate-800/50 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg;
}
</style>
