import { defineStore } from "pinia";
import { Experience } from "@/models/Experience.model";
import { apiWrapper } from "@/services/api";

export const useExperienceStore = defineStore({
  id: "experienceStore",
  state: () => ({
    experience: {},
    experiences: [],

    loaders: {
      createExperience: false,
      retrieveSkill: false,
      retrieveExperiences: false,
      updateExperience: false,
      deleteExperience: false,
    },
  }),

  getters: {},

  actions: {
    async createExperience({
      position,
      company,
      city,
      country,
      from,
      to,
      tasks,
    }) {
      try {
        this.loaders["createExperience"] = true;
        const createdExperience = await apiWrapper.post(`/experiences`, {
          data: { position, company, city, country, from, to, tasks },
        });
        return (this.experience = new Experience(createdExperience));
      } finally {
        this.loaders["createExperience"] = false;
      }
    },

    async retrieveExperience(id) {
      try {
        this.loaders["retrieveExperience"] = true;
        const retrievedSkill = await apiWrapper.get(`/experiences/${id}`);
        return (this.experience = new Experience(retrievedSkill));
      } finally {
        this.loaders["retrieveExperience"] = false;
      }
    },

    async retrieveExperiences() {
      try {
        this.loaders["retrieveExperiences"] = true;
        const retrievedExperiences = await apiWrapper.get(`/experiences`);
        const experiencesList = [];
        retrievedExperiences.forEach((experience) => {
          experiencesList.push(new Experience(experience));
        });
        return (this.experiences = experiencesList);
      } finally {
        this.loaders["retrieveExperiences"] = false;
      }
    },

    async updateExperience(
      id,
      { position, company, city, country, from, to, tasks }
    ) {
      try {
        this.loaders["updateExperience"] = true;
        const updatedExperience = await apiWrapper.patch(`/experiences/${id}`, {
          data: { position, company, city, country, from, to, tasks },
        });
        return (this.experience = new Experience(updatedExperience));
      } finally {
        this.loaders["updateExperience"] = false;
      }
    },

    async deleteExperience(id) {
      try {
        this.loaders["deleteExperience"] = true;
        const deletedExperience = await apiWrapper.delete(`/experiences/${id}`);
        const deletedExperienceIndex = this.experiences.findIndex(
          (experience) => experience.id === deletedExperience.id
        );
        this.experiences.splice(deletedExperienceIndex, 1);
        return new Experience(deletedExperience);
      } finally {
        this.loaders["deleteExperience"] = false;
      }
    },
  },
});
