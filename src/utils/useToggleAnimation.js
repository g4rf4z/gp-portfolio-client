import { ref } from 'vue';

export const useToggleAnimation = () => {
  const animation = ref(false);
  const toggleAnimation = () => (animation.value = !animation.value);

  return { animation, toggleAnimation };
};
