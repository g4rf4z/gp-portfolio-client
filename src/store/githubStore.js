import { defineStore } from "pinia";
import axios from "axios";

export const useGithubStore = defineStore({
  id: "githubStore",
  state: () => ({
    repository: null,

    loaders: {
      retrieveRepository: false,
    },
  }),

  getters: {
    forks: (state) => state.repository?.data.forks_count,
    stars: (state) => state.repository?.data.stargazers_count,
  },

  actions: {
    async retrieveRepository() {
      const owner = import.meta.env.VITE_GITHUB_OWNER;
      const repository = import.meta.env.VITE_GITHUB_REPOSITORY;
      const apiRoute = `https://api.github.com/repos/${owner}/${repository}`;
      try {
        this.loaders["retrieveRepository"] = true;
        const retrievedRepository = await axios.get(apiRoute);
        return (this.repository = retrievedRepository);
      } finally {
        this.loaders["retrieveRepository"] = false;
      }
    },
  },
});
