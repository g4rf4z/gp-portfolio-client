<template>
  <router-link to="/profile" class="router-link">
    <icon-atom icon="user" weight="fas" class="icon"></icon-atom>
    <slot></slot>
  </router-link>
  <button-atom @click="emit('logout')" :admin="admin" :loading="loading"
    >Déconnexion</button-atom
  >
</template>

<script setup>
import IconAtom from "#/atoms/Icon.vue";
import ButtonAtom from "#/atoms/Button.vue";

const props = defineProps({
  admin: { type: Object, default: null },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["logout"]);
</script>

<style lang="scss" scoped>
.router-link {
  @apply flex items-center justify-between;

  .icon {
    @apply text-teal-200;
  }
}
</style>
