<template>
  <header :class="{ scroll: active, 'is-toggled': isToggled }">
    <main-nav-organism @is-toggled="toggleBackground"></main-nav-organism>
  </header>
  <div :class="{ background: true, 'is-toggled': isToggled }"></div>
</template>

<script setup>
import MainNavOrganism from "#/organisms/MainNav.vue";

import { ref } from "vue";

const active = ref(false);
let previousScrollValue;

// Updates active's value based on the window's scroll position.
window.addEventListener("scroll", () => {
  active.value = window.scrollY > 0;

  // Adjusts the header's position based on the scroll direction by updating the previous scroll value.
  if (window.innerWidth > 1023.9) {
    const currentScrollValue = window.pageYOffset;
    document.querySelector("header").style.top =
      previousScrollValue > currentScrollValue ? "0" : "-80px";
    previousScrollValue = currentScrollValue;
  }
});

const isToggled = ref(false);

const toggleBackground = (event) => {
  isToggled.value = event;
};
</script>

<style lang="scss" scoped>
header {
  @apply h-20 flex items-center justify-between fixed top-0 left-0 right-0 z-50 backdrop-blur bg-slate-900/50 duration-300;

  &.scroll {
    @apply drop-shadow-lg;
  }
}

@media screen and (max-width: 1023.9px) {
  header.is-toggled {
    @apply bg-slate-900;
  }

  .background {
    @apply h-screen w-screen fixed top-20 -right-full z-30 backdrop-blur bg-slate-900/50 duration-300;

    &.is-toggled {
      @apply right-0;
    }
  }
}
</style>
