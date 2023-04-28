<template>
  <div class="form-input">
    <label-atom v-if="label" :id="id">{{ label }}</label-atom>
    <input-atom
      :id="id"
      :name="name"
      :type="type"
      :value="type !== 'file' ? modelValue : undefined"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      @input="handleInput"
    ></input-atom>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import LabelAtom from "#/atoms/Label.vue";
import InputAtom from "#/atoms/Input.vue";

const props = defineProps({
  label: { type: String, default: null },
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, default: "text" },
  modelValue: { type: [Date, File, Number, String], default: null },
  placeholder: { type: String, default: null },
  min: { type: Number, default: null },
  max: { type: [Number, String], default: null },
  errorMessage: { type: String, default: null },
});

const emit = defineEmits(["input", "update:modelValue"]);

const handleInput = (event) => {
  emit("input", event);
  emit("update:modelValue", event.target.value);
};
</script>

<style lang="scss" scoped>
.form-input {
  @apply pb-5;
}
.error-message {
  @apply text-red-400;
}
</style>
