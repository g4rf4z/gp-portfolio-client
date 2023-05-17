<template>
  <aside>
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
  </aside>
</template>

<script setup>
import LinkAtom from "#/atoms/Link.vue";
import IconAtom from "#/atoms/Icon.vue";

const links = [
  {
    to: "https://github.com/g4rf4z",
    name: "GitHub",
    icon: "github",
  },
  {
    to: "https://www.instagram.com/gregoire.pinte",
    name: "Instagram",
    icon: "instagram",
  },
  {
    to: "https://www.linkedin.com/in/gr%C3%A9goire-pinte-02ba65209",
    name: "LinkedIn",
    icon: "linkedin",
  },
  {
    to: "https://dribbble.com/g4rf4z",
    name: "Dribbble",
    icon: "dribbble",
  },
];
</script>

<style lang="scss" scoped>
aside {
  @apply hidden sm:block pb-10 sm:fixed sm:left-10 sm:bottom-20 sm:text-indigo-200;

  ul {
    @apply space-y-5;

    a {
      writing-mode: vertical-lr;
      @apply duration-300;

      &:hover {
        @apply text-teal-200 -translate-y-1;
      }
    }
  }

  &::after {
    content: "";
    @apply h-full w-[1px] absolute bottom-0 left-[44%] bg-indigo-200 translate-y-full;
  }
}
</style>
