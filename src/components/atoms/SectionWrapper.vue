<template>
  <section>
    <component v-if="prefix && name" :is="is" class="name"
      ><span>{{ prefix }}</span
      >{{ name }}</component
    >
    <slot></slot>
  </section>
</template>

<script setup>
const props = defineProps({
  is: { type: String, default: "h3" },
  prefix: { type: String },
  name: { type: String },
});
</script>

<style lang="scss" scoped>
section {
  @apply min-h-screen py-40;

  .name {
    @apply h-10 w-full mb-10 font-mono text-3xl text-indigo-200;

    span {
      @apply mr-2 font-mono text-teal-200;
    }
  }
}
</style>
