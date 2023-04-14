<template>
  <h3>Bonjour, je suis</h3>
  <animated-typewriter-atom></animated-typewriter-atom>
  <h2>Je construis des choses pour le web.</h2>
  <p>
    Actuellement en formation développeur web et web mobile chez
    <link-atom is="a" to="https://www.educatel.fr/">Educatel</link-atom>, j'ai
    le plaisir de vous présenter mon portfolio professionnel, réalisé dans le
    cadre de mon stage de fin d'études et avec le soutien de
    <link-atom is="a" to="https://www.lille-esport.gg/">Lille Esport</link-atom
    >.
  </p>
  <div class="button-wrapper">
    <link-atom is="a" to="#about" target="">
      <button-atom>En savoir plus</button-atom>
    </link-atom>
  </div>
</template>

<script setup>
import AnimatedTypewriterAtom from "#/atoms/AnimatedTypewriter.vue";
import LinkAtom from "#/atoms/Link.vue";
import ButtonAtom from "#/atoms/Button.vue";
</script>

<style lang="scss" scoped>
h1 {
  @apply h-20 flex items-center font-bold text-5xl text-indigo-200;
  @apply md:text-6xl lg:h-32 lg:text-8xl;
}

h2 {
  @apply font-bold text-4xl;
  @apply md:text-5xl xl:text-6xl;
}

h3 {
  @apply font-mono text-teal-200;
}

p {
  @apply w-full py-5;
  @apply xl:w-10/12 2xl:w-5/12;

  a {
    @apply font-mono text-teal-200;
    @apply hover:underline;
  }
}
</style>
