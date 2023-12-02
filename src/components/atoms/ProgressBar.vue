<template>
  <div class="progress-bar-wrapper">
    <div :style="{ width: progress }" class="progress-bar"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  progress: { type: Number, required: true },
});

const progress = computed(() => props.progress + '%');
</script>

<style lang="scss" scoped>
.progress-bar-wrapper {
  @apply h-2 w-full relative rounded bg-slate-900;

  .progress-bar {
    @apply h-full absolute rounded bg-teal-200;
    animation: progress-animation 1.5s ease-in-out;
  }
}

@keyframes progress-animation {
  0% {
    width: 0%;
  }
  100% {
    width: progress;
  }
}
</style>
