<template>
  <label :for="id">
    <slot></slot>
  </label>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
});
</script>

<style lang="scss" scoped>
label {
  @apply font-mono text-teal-200;
}
</style>
