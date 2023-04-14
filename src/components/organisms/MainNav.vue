<template>
  <nav :class="{ 'is-toggled': isToggled }">
    <icon-link-molecule
      to="/"
      weight="fas"
      icon="cube"
      class="logo"
      @click="toggleMenu(false)"
    ></icon-link-molecule>
    <burger-button-molecule
      :isToggled="isToggled"
      @click="toggleMenu"
    ></burger-button-molecule>
    <ul :class="{ 'is-toggled': isToggled }">
      <li v-for="(link, index) in filteredLinks" :key="index">
        <link-atom :to="link.path" :href="link.path" @click="toggleMenu"
          ><span>{{ link.prefix }}</span
          >{{ link.name }}</link-atom
        >
      </li>
      <li
        v-if="session && admin"
        class="admin-card-wrapper"
        @click="toggleMenu"
      >
        <admin-card-molecule :admin="admin" :loading="loading" @logout="logout">
          <p>{{ admin.firstname }} {{ admin.lastname }}</p>
        </admin-card-molecule>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import IconLinkMolecule from "#/molecules/IconLink.vue";
import BurgerButtonMolecule from "#/molecules/BurgerButton.vue";
import LinkAtom from "#/atoms/Link.vue";
import AdminCardMolecule from "#/molecules/AdminCard.vue";

import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import { useLayoutStore } from "@/store/layoutStore";
import { useAuthenticationStore } from "@/store/authenticationStore";

const router = useRouter();

const layoutStore = useLayoutStore();
const authenticationStore = useAuthenticationStore();

const isToggled = ref(false);

const emit = defineEmits(["is-toggled"]); // Define "is-toggled" as event emitter.

const toggleMenu = (close) => {
  if (close === false) {
    isToggled.value = false;
  } else {
    isToggled.value = !isToggled.value;
    emit("is-toggled", isToggled.value); // Emit "is-toggled" event and updated "isToggled.value".
  }
};

const filteredLinks = computed(() =>
  layoutStore.navLinks.filter(
    (link) =>
      link.tag !== "about" &&
      link.tag !== "login" &&
      link.tag !== "profile" &&
      link.tag !== "skill-create-form" &&
      link.tag !== "skill-update-form" &&
      link.tag !== "experience-create-form" &&
      link.tag !== "experience-update-form"
  )
);
const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);
const loading = computed(() => authenticationStore.loaders.logout);

const logout = async () => {
  try {
    await authenticationStore.logout();
    router.push({ name: "login" });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
nav {
  @apply h-full w-full px-5 flex items-center justify-between relative z-50;

  .logo {
    @apply text-2xl text-teal-200;
  }

  ul {
    @apply lg:h-full lg:w-full lg:justify-end;

    &.is-toggled {
      @apply translate-x-0;
    }

    a {
      @apply lg:px-5 font-mono text-indigo-200 cursor-pointer duration-300;
      @apply hover:text-teal-200;

      span {
        @apply mr-2 text-teal-200;
      }
    }
  }

  .admin-card-wrapper {
    @apply flex space-x-1;

    p {
      @apply text-indigo-200;
      @apply hover:underline;
    }
  }
}

@media screen and (max-width: 1023.9px) {
  ul {
    @apply h-screen w-9/12 px-4 py-20 flex-col items-start justify-start space-y-10 absolute top-0 left-0 bg-slate-950 -translate-x-full duration-300;

    &.is-toggled {
      @apply translate-x-0;
    }
  }

  .admin-card-wrapper {
    @apply flex flex-col items-center justify-center space-y-2 absolute right-5 bottom-5;
  }
}

@media screen and (min-width: 1023.9px) {
  ul {
    @apply flex items-center;
  }
}
</style>
