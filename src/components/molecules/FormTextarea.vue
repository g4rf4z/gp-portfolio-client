<template>
  <div class="form-textarea">
    <label-atom v-if="label" :id="id">{{ label }}</label-atom>
    <textarea-atom
      :id="id"
      :name="name"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      @input="handleInput"
    ></textarea-atom>
    <counter-atom
      :counter="counter"
      :errorMessage="errorMessage"
    ></counter-atom>
  </div>
</template>

<script setup>
import LabelAtom from '#/atoms/Label.vue';
import TextareaAtom from '#/atoms/Textarea.vue';
import CounterAtom from '#/atoms/Counter.vue';

const props = defineProps({
  label: { type: String, default: null },
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  modelValue: { type: [Array, String], default: null },
  placeholder: { type: String, default: null },
  counter: { type: Number, default: 0 },
  errorMessage: { type: String, default: null },
});

const emit = defineEmits(['input', 'update:modelValue']);
const handleInput = (event) => {
  emit('input', event);
  emit('update:modelValue', event.target.value);
};
</script>

<style lang="scss" scoped>
.form-textarea {
  @apply pb-5;
}
</style>
