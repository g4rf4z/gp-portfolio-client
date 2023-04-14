import { defineStore } from "pinia";
import axios from "axios";

export const useAirtableStore = defineStore({
  id: "airtableStore",
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
      const apiKey = import.meta.env.VITE_APP_AIRTABLE_API_KEY;
      const apiRoute = `https://api.airtable.com/v0/${apiId}/contact-form?api_key=${apiKey}`;

      try {
        this.loaders["postContact"] = true;
        const createdRecord = await axios.post(apiRoute, {
          fields: { firstname, lastname, email, textarea },
        });
        return (this.contact = createdRecord.data);
      } finally {
        this.loaders["postContact"] = false;
      }
    },
  },
});
