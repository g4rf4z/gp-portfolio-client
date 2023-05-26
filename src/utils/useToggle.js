import { ref } from 'vue';

export const useToggle = () => {
  const animation = ref();
  const toggleAnimation = () => (animation.value = !animation.value);

  return { animation, toggleAnimation };
};
