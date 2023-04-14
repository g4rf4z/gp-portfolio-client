<template>
  <component :is="is" :sentence="sentence">{{ currentSentence }}</component>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  is: { type: String, default: "h1" },
  sentence: {
    type: Array,
    default: () => ["Grégoire Pinte.", "Étudiant.", "Développeur."],
  },
});

const currentCharacterIndex = ref(0);
const currentSentence = ref("");
const currentSentenceIndex = ref(0);
const isDeleted = ref(false);

const animateText = () => {
  const currentSentenceText = props.sentence[currentSentenceIndex.value];

  if (!isDeleted.value) {
    currentSentence.value += currentSentenceText[currentCharacterIndex.value];
    currentCharacterIndex.value++;
  } else {
    currentSentence.value = currentSentence.value.slice(0, -1);
    currentCharacterIndex.value--;
  }

  if (currentCharacterIndex.value === currentSentenceText.length) {
    isDeleted.value = true;
  }

  if (currentCharacterIndex.value === 0) {
    currentSentence.value = "";
    isDeleted.value = false;
    currentSentenceIndex.value++;
    if (currentSentenceIndex.value === props.sentence.length) {
      currentSentenceIndex.value = 0;
    }
  }

  const spedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (300 - 200) + 200;
  const time = isDeleted.value ? spedUp : normalSpeed;
  setTimeout(animateText, time);
};

animateText();
</script>
