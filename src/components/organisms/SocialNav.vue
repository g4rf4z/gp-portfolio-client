<template>
  <nav :class="{ active: isActive }" @click="toggleMenu">
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <link-atom
          is="a"
          :to="link.to"
          :name="link.name"
          :ariaLabel="link.name"
        >
          <icon-atom weight="fab" :icon="link.icon"></icon-atom>
        </link-atom>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import LinkAtom from "#/atoms/Link.vue";
import IconAtom from "#/atoms/Icon.vue";

import { ref } from "vue";

const links = [
  {
    to: "https://github.com/g4rf4z/",
    name: "GitHub",
    icon: "github",
  },
  {
    to: "https://www.linkedin.com/in/gr%C3%A9goire-pinte-02ba65209/",
    name: "LinkedIn",
    icon: "linkedin",
  },
  {
    to: "https://dribbble.com/g4rf4z/",
    name: "Dribbble",
    icon: "dribbble",
  },
];

const isActive = ref();

const toggleMenu = () => {
  isActive.value = !isActive.value;
};
</script>

<style lang="scss" scoped>
nav {
  @apply p-2 fixed top-1/2 -left-12 -translate-y-1/2 z-40 rounded-r bg-slate-950 duration-300;

  ul {
    @apply space-y-2;

    a {
      @apply h-10 w-10 flex items-center justify-center text-indigo-200 duration-300;
      @apply hover:cursor-pointer hover:text-teal-200;
    }
  }
}

.active {
  @apply left-0 duration-300;
}
</style>
