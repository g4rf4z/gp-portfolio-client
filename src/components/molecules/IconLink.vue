<template>
  <router-link :to="to">
    <icon-atom
      :bounce="bounce"
      :flip="flip"
      :icon="icon"
      :shake="shake"
      :size="size"
      :weight="weight"
    ></icon-atom>
  </router-link>
</template>

<script setup>
import IconAtom from "#/atoms/Icon.vue";

const props = defineProps({
  bounce: { type: Boolean, default: false },
  flip: { type: Boolean, default: false },
  icon: { type: String, required: true },
  shake: { type: Boolean, default: false },
  size: { type: String, default: "xl" },
  to: { type: String, required: true },
  weight: { type: String, default: "fa" },
});
</script>
