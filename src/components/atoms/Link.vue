<template>
  <component
    :is="is"
    :to="to"
    :rel="rel"
    :href="href"
    :target="is === 'a' ? '_blank' : ''"
    :name="name"
    :aria-label="ariaLabel"
    :class="class"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  is: { type: String, default: "router-link" },
  to: { type: String, required: true },
  rel: { type: String, default: "nofollow" },
  name: { type: String, default: null },
  ariaLabel: { type: String, default: null },
  class: { type: String, default: null },
});

const href = computed(() => {
  return props.is === "a" ? props.to : null;
});

const to = computed(() => {
  return props.is === "router-link" ? props.to : null;
});
</script>

<style lang="scss" scoped>
.external-link {
  @apply inline-block relative font-mono text-teal-200;
}

.external-link::after {
  content: "";
  transform: scaleX(0);
  transform-origin: bottom right;
  transition: transform 0.3s ease-out;
  @apply h-[1.5px] w-full absolute bottom-0 left-0 bg-teal-200;
}

.external-link:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
