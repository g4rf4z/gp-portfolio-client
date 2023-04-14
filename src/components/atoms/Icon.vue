<template>
  <font-awesome
    :icon="[weight, icon]"
    :size="size"
    :fixed-width="fw"
    :bounce="bounce"
    :flip="flip"
    :shake="shake"
  ></font-awesome>
</template>

<script setup>
const props = defineProps({
  weight: { type: String, default: "fa" },
  icon: { type: String, required: true },
  size: { type: String, default: "xl" },
  fw: { type: Boolean, default: true },
  bounce: { type: Boolean, default: false },
  flip: { type: Boolean, default: false },
  shake: { type: Boolean, default: false },
});
</script>
