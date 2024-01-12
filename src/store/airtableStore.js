import { defineStore } from 'pinia';
import axios from 'axios';

export const useAirtableStore = defineStore({
  id: 'airtableStore',
  state: () => ({
    contact: null,

    loaders: {
      postContact: false,
    },
  }),

  getters: {},

  actions: {
    async postContact({ firstname, lastname, email, textarea }) {
      const apiId = import.meta.env.VITE_APP_AIRTABLE_API_ID;
      const accessToken = import.meta.env.VITE_APP_AIRTABLE_TOKEN;
      const apiRoute = `https://api.airtable.com/v0/${apiId}/contact-form`;

      try {
        this.loaders['postContact'] = true;
        const createdRecord = await axios.post(
          apiRoute,
          {
            fields: {
              firstname,
              lastname,
              email,
              textarea,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        return (this.contact = createdRecord.data);
      } finally {
        this.loaders['postContact'] = false;
      }
    },
  },
});
