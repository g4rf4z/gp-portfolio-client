<template>
  <component
    :is="is"
    :to="to"
    :rel="rel"
    :href="href"
    :target="is === 'a' ? '_blank' : ''"
    :name="name"
    :aria-label="ariaLabel"
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
});

const href = computed(() => {
  return props.is === "a" ? props.to : null;
});

const to = computed(() => {
  return props.is === "router-link" ? props.to : null;
});
</script>
