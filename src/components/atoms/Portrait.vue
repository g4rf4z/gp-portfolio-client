<template>
  <div
    ref="card"
    class="card"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <picture ref="picture">
      <img src="../../assets/images/portrait.png" alt="Portrait" />
    </picture>
    <div ref="glow" class="glow"></div>
    <div class="frame" @mousemove.stop></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const card = ref(null);
const picture = ref(null);
const glow = ref(null);

let lastCall = 0;
const delay = 25;

const handleMousemove = (event) => {
  const now = Date.now(); // Get the current time.

  // If the time elapsed since the lastCall is less than the delay, handleMousemove() returns.
  if (now - lastCall < delay) {
    return;
  }

  lastCall = now; // Update the value of lastCall with the value of now.

  const clientRect = card.value.getBoundingClientRect();

  const x = event.clientX - clientRect.x;
  const y = event.clientY - clientRect.y;

  // Calculate the middle of the element.
  const midCardWidth = clientRect.width / 2;
  const midCardHeight = clientRect.height / 2;

  // Calculate rotation angles for 3D transformation.
  const angleY = -(x - midCardWidth) / 8;
  const angleX = (y - midCardHeight) / 8;

  // Calculate coordinates for the radial gradient of the glow effect.
  const glowX = (x / clientRect.width) * 100;
  const glowY = (y / clientRect.height) * 100;

  picture.value.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
  glow.value.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
  glow.value.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgb(184, 196, 211), transparent)`;
};

const handleMouseleave = () => {
  picture.value.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  glow.value.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
  glow.value.style.background = '';
};
</script>

<style lang="scss" scoped>
.card {
  perspective: 1000px;
  @apply h-80 w-56 flex;

  picture {
    @apply h-full w-full rounded overflow-hidden duration-200;

    img {
      @apply h-full w-full object-cover;
    }
  }

  .glow {
    background: radial-gradient(
      circle at 50% 0%,
      rgb(184, 196, 211),
      transparent
    );
    @apply h-full w-full absolute top-0 left-0 rounded mix-blend-hard-light duration-200;
  }

  .frame {
    @apply h-full w-full absolute top-5 left-5 -z-10 rounded border border-teal-200;
  }
}
</style>
