<template>
  <div ref="spotlight" class="spotlight"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);
const spotlight = ref(null);

const updateCoordinates = (event) => {
  x.value = event.clientX;
  y.value = event.clientY;
  spotlight.value.style.background = `radial-gradient(600px at ${x.value}px ${y.value}px, rgba(29, 78, 216, 0.15), transparent 75%)`;
};

onMounted(() => {
  window.addEventListener('mousemove', updateCoordinates);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', updateCoordinates);
});
</script>

<style lang="scss" scoped>
.spotlight {
  @apply lg:w-full lg:h-full lg:fixed lg:inset-0 lg:pointer-events-none;
}
</style>
