import { defineStore } from "pinia";
import { Session } from "@/models/Session.model";
import { apiWrapper } from "@/services/api";

export const useAuthenticationStore = defineStore({
  id: "authenticationStore",
  state: () => ({
    session: null,
    sessions: [],

    loaders: {
      login: false,
      logout: false,
      retrieveSession: false,
      retrieveSessions: false,
      deleteInactiveSessions: false,
    },
  }),

  getters: {
    admin: (state) => state.session?.admin,
  },

  actions: {
    async login({ email, password }) {
      try {
        this.loaders["login"] = true;
        const openedSession = await apiWrapper.post(`/login`, {
          data: { email, password },
        });
        return (this.session = new Session(openedSession));
      } finally {
        this.loaders["login"] = false;
      }
    },

    async logout() {
      try {
        this.loaders["logout"] = true;
        await apiWrapper.post("/logout");
        this.session = null;
        return true;
      } finally {
        this.loaders["logout"] = false;
      }
    },

    async retrieveSession() {
      try {
        this.loaders["retrieveSession"] = true;

        const retrievedSession = await apiWrapper.get(`/me/session`);
        return (this.session = new Session(retrievedSession));
      } finally {
        this.loaders["retrieveSession"] = false;
      }
    },

    async retrieveSessions() {
      try {
        this.loaders["retrieveSessions"] = true;
        const retrievedSessions = await apiWrapper.get(`/sessions`);
        const sessionsList = [];
        retrievedSessions.forEach((session) => {
          sessionsList.push(new Session(session));
        });
        return (this.sessions = sessionsList.reverse());
      } finally {
        this.loaders["retrieveSessions"] = false;
      }
    },

    async deleteInactiveSessions() {
      try {
        this.loaders["deleteInactiveSessions"] = true;
        await apiWrapper.delete(`/inactive-sessions`);
        this.retrieveSessions();
      } finally {
        this.loaders["deleteInactiveSessions"] = false;
      }
    },
  },
});
