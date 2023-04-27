<template>
  <input
    :id="id"
    :name="name"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :min="min"
    :max="max"
    @input="handleInput"
  />
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, default: null },
  type: { type: String, default: "text" },
  modelValue: { type: [Date, File, Number, String], default: null },
  placeholder: { type: String, default: null },
  min: { type: Number, default: null },
  max: { type: [Number, String], default: null },
});

const emit = defineEmits(["input", "update:modelValue"]);
const handleInput = (event) => {
  if (props.min !== null && event.target.value < props.min) {
    event.target.value = props.min;
  } else if (props.max !== null && event.target.value > props.max) {
    event.target.value = props.max;
  }
  emit("input", event);
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
input[type="text"],
input[type="number"],
input[type="email"],
input[type="date"],
input[type="password"] {
  @apply h-10 w-full p-2 bg-slate-800 duration-300;
  @apply hover:bg-slate-700;
}

input[type="file"] {
  @apply w-full;
}
</style>
