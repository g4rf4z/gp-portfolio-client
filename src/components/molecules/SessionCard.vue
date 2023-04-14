<template>
  <td>{{ id }}</td>
  <td>{{ firstname }}</td>
  <td>{{ lastname }}</td>
  <td>{{ formattedCreatedAt }}</td>
  <td>{{ sessionStatus }}</td>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  id: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  createdAt: { type: Date, required: true },
  isActive: { type: Boolean, required: true },
});

const formattedCreatedAt = computed(() => {
  const createdAt = new Date(props.createdAt);
  return createdAt.toLocaleString();
});

const sessionStatus = computed(() => (props.isActive ? "Actif" : "Inactif"));
</script>

<style lang="scss" scoped>
td {
  @apply text-center;
}
</style>
