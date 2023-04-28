import { defineStore } from "pinia";
import { useAuthenticationStore } from "./authenticationStore";
import { apiWrapper } from "@/services/api";

export const useAdminStore = defineStore({
  id: "adminStore",
  state: () => ({
    loaders: {
      updateProfile: false,
      updateEmail: false,
      updatedPassword: false,
    },
  }),

  getters: {},

  actions: {
    async updateProfile({ firstname, lastname, nickname }) {
      const authenticationStore = useAuthenticationStore();
      const admin = authenticationStore.admin;

      try {
        this.loaders["updateProfile"] = true;
        const updatedProfile = await apiWrapper.patch(`/me`, {
          data: { firstname, lastname, nickname },
        });
        admin.update(updatedProfile);
        return (
          updatedProfile.firstname,
          updatedProfile.lastname,
          updatedProfile.nickname
        );
      } finally {
        this.loaders["updateProfile"] = false;
      }
    },

    async updateEmail({ email }) {
      const authenticationStore = useAuthenticationStore();
      const admin = authenticationStore.admin;

      try {
        this.loaders["updateEmail"] = true;
        const updatedEmail = await apiWrapper.patch(`/me/email`, {
          data: { email },
        });
        admin.update(updatedEmail);
        return updatedEmail.email;
      } finally {
        this.loaders["updateEmail"] = false;
      }
    },

    async updatePassword({ password, newPassword, newPasswordConfirmation }) {
      const authenticationStore = useAuthenticationStore();
      const admin = authenticationStore.admin;

      try {
        this.loaders["updatePassword"] = true;
        const updatedPassword = await apiWrapper.patch(`/me/password`, {
          data: { password, newPassword, newPasswordConfirmation },
        });
        admin.update(updatedPassword);
        return updatedPassword.password;
      } finally {
        this.loaders["updatePassword"] = false;
      }
    },
  },
});
