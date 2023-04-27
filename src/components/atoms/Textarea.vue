<template>
  <textarea
    :id="id"
    :name="name"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    @input="handleInput"
  ></textarea>
</template>

<script setup>
const props = defineProps({
  id: { type: String, required: true },
  name: { type: String, default: null },
  type: { type: String, default: "text" },
  modelValue: { type: String, default: null },
  placeholder: { type: String, default: null },
});

const emit = defineEmits(["input", "update:modelValue"]);

const handleInput = (event) => {
  emit("input", event);
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
textarea {
  @apply h-40 w-full p-2 align-top rounded bg-slate-800 duration-300;
  @apply hover:bg-slate-700;
}
</style>
