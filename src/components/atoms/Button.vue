<template>
  <button :type="type" :disabled="loading || disabled" @click="handleClick">
    <icon-atom
      v-if="loading"
      weight="fas"
      icon="circle-notch"
      :spin="loading"
      class="mr-2"
    ></icon-atom>
    <slot></slot>
  </button>
</template>

<script setup>
import IconAtom from "#/atoms/Icon.vue";

const props = defineProps({
  type: { type: String, default: "button" },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["click"]);
const handleClick = (event) => {
  emit("click", event);
};
</script>

<style lang="scss" scoped>
button {
  @apply py-3 px-5 rounded border border-teal-200 font-mono text-teal-200 duration-300;
  @apply hover:bg-teal-200/10;

  &:disabled {
    @apply text-teal-200/25 border-teal-200/25;
    @apply bg-slate-900;
  }
}
</style>
