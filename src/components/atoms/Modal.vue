<template>
  <transition>
    <div v-if="active" class="modal-wrapper">
      <div class="modal-overlay" @click.self="emit('closeModal')"></div>
      <div class="modal-content">
        <icon-atom
          weight="fas"
          :icon="icon"
          size="2xl"
          :class="color"
        ></icon-atom>
        <slot></slot>
        <button-atom @click="emit('closeModal')">Fermer</button-atom>
      </div>
    </div>
  </transition>
</template>

<script setup>
import IconAtom from "#/atoms/Icon.vue";
import ButtonAtom from "#/atoms/Button.vue";

import { computed } from "vue";

const props = defineProps({
  active: { type: Boolean, default: false },
  type: { type: String, default: "success" },
});

const emit = defineEmits(["closeModal"]);

const icon = computed(() => {
  switch (props.type) {
    case "warning":
      return "exclamation-circle";
    case "danger":
      return "circle-xmark";
    case "success":
    default:
      return "circle-check";
  }
});

const color = computed(() => {
  switch (props.type) {
    case "warning":
      return "text-yellow-500";
    case "danger":
      return "text-red-400";
    case "success":
    default:
      return "text-green-500";
  }
});
</script>

<style lang="scss" scoped>
.modal-wrapper {
  @apply flex items-center justify-center fixed inset-0;

  .modal-content {
    @apply w-1/2 p-5 flex flex-col items-center text-justify bg-slate-800 z-50;
  }
}

.modal-overlay {
  @apply fixed inset-0 bg-slate-900/90;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
