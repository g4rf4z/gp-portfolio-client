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
    content: "";
    @apply h-10 w-full mb-10 font-mono text-3xl text-indigo-200;
    @apply after:h-[1px] after:w-20 sm:after:w-40 lg:after:w-60 xl:after:w-80 after:ml-60 after:block after:relative after:top-[-40%] after:left-[5%] after:rounded after:bg-slate-800;

    span {
      @apply mr-2 font-mono text-teal-200;
    }
  }
}
</style>
