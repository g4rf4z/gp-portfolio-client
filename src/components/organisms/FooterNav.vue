<template>
  <div class="footer-wrapper">
    <link-atom is="a" to="https://github.com/g4rf4z/">
      <small class="copyright">© 2022 - 2023 - Grégoire Pinte</small>
    </link-atom>
    <div class="github-statistics">
      <small class="star">
        <icon-atom
          weight="fas"
          icon="star"
          size="xs"
          class="star-icon"
        ></icon-atom
        >{{ stars }}
      </small>
      <small class="fork">
        <icon-atom
          weight="fas"
          icon="code-fork"
          size="xs"
          class="fork-icon"
        ></icon-atom
        >{{ forks }}
      </small>
    </div>
  </div>
</template>

<script setup>
import LinkAtom from "#/atoms/Link.vue";
import IconAtom from "#/atoms/Icon.vue";

import { computed } from "vue";
import { useGithubStore } from "@/store/githubStore";

const githubStore = useGithubStore();

const stars = computed(() => githubStore.stars);
const forks = computed(() => githubStore.forks);

const retrieveRepository = async () => {
  try {
    await githubStore.retrieveRepository();
  } catch (error) {
    console.error(error);
  }
};
retrieveRepository();
</script>

<style lang="scss" scoped>
.footer-wrapper {
  @apply h-20 w-full flex flex-col items-center justify-center;

  .copyright {
    @apply font-mono text-indigo-200 duration-300;
    @apply hover:text-teal-200;
  }

  .github-statistics {
    @apply flex;

    .star {
      @apply mr-1 font-mono text-indigo-200;

      .star-icon {
        @apply mr-1;
      }
    }

    .fork {
      @apply ml-1 font-mono text-indigo-200;

      .fork-icon {
        @apply mr-1;
      }
    }
  }
}
</style>
