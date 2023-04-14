<template>
  <div v-if="session && admin.role === 'SUPERADMIN'" class="table-container">
    <div class="sessions-list-wrapper">
      <table>
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(session, index) in sessions" :key="index">
            <session-card-molecule
              :id="session?.id"
              :firstname="session?.admin?.firstname"
              :lastname="session?.admin?.lastname"
              :createdAt="session?.createdAt"
              :isActive="session?.isActive"
            ></session-card-molecule>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="button-wrapper">
      <button-atom
        :disabled="!hasInactiveSessions"
        :loading="loading"
        @click="deleteInactiveSessions"
        >Effacer</button-atom
      >
    </div>
  </div>
</template>

<script setup>
import SessionCardMolecule from "#/molecules/SessionCard.vue";
import ButtonAtom from "#/atoms/Button.vue";

import { computed, watchEffect } from "vue";
import { useAuthenticationStore } from "@/store/authenticationStore";

const authenticationStore = useAuthenticationStore();

const session = computed(() => authenticationStore.session);
const admin = computed(() => authenticationStore.admin);
const sessions = computed(() => authenticationStore.sessions);
const hasInactiveSessions = computed(() =>
  sessions.value.some((session) => !session.isActive)
);
const loading = computed(
  () => authenticationStore.loaders.deleteInactiveSessions
);

const retrieveSessions = async () => {
  try {
    await authenticationStore.retrieveSessions();
  } catch (error) {
    console.error(error);
  }
};

// Run "retrieveSessions" if the admin role is "SUPERADMIN".
watchEffect(() => {
  if (admin.value?.role === "SUPERADMIN") {
    retrieveSessions();
  }
});

const deleteInactiveSessions = async () => {
  try {
    await authenticationStore.deleteInactiveSessions();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss" scoped>
.table-container {
  @apply pt-40;

  .sessions-list-wrapper {
    @apply h-80 overflow-y-scroll border rounded border-teal-200;

    table {
      @apply block;

      th {
        @apply h-10 w-80 pt-2 font-normal font-mono text-teal-200;
      }
    }
  }
}

.button-wrapper {
  @apply pt-5 flex justify-center;
}
</style>
