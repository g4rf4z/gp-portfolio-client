<template>
  <p
    v-if="counter && !errorMessage"
    :class="{ counter: true, 'error-message': counter > maxLength }"
  >
    {{ counter }} / {{ maxLength }}
  </p>
  <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
</template>

<script setup>
const props = defineProps({
  counter: { type: Number, default: 0 },
  maxLength: { type: Number, default: 1000 },
  errorMessage: { type: String, default: null },
});
</script>

<style lang="scss" scoped>
.counter {
  @apply absolute font-mono text-teal-200;
}

.error-message {
  @apply text-red-400;
}
</style>
