import { defineStore } from 'pinia';
import { Skill } from '@/models/Skill.model';
import { apiWrapper } from '@/services/api';

export const useSkillStore = defineStore({
  id: 'skillStore',
  state: () => ({
    skill: {},
    skills: [],

    loaders: {
      createSkill: false,
      retrieveSkill: false,
      retrieveSkills: false,
      updateSkill: false,
      deleteSkill: false,
    },
  }),

  getters: {},

  actions: {
    async createSkill({ name, image, progress }) {
      try {
        this.loaders['createSkill'] = true;
        const createdSkill = await apiWrapper.post(`/skills`, {
          data: { name, image, progress },
        });
        return (this.skill = new Skill(createdSkill));
      } finally {
        this.loaders['createSkill'] = false;
      }
    },

    async retrieveSkill(id) {
      try {
        this.loaders['retrieveSkill'] = true;
        const retrievedSkill = await apiWrapper.get(`/skills/${id}`);
        return (this.skill = new Skill(retrievedSkill));
      } finally {
        this.loaders['retrieveSkill'] = false;
      }
    },

    async retrieveSkills() {
      try {
        this.loaders['retrieveSkills'] = true;
        const retrievedSkills = await apiWrapper.get(`/skills`);
        const skillsList = [];
        retrievedSkills.forEach((skill) => {
          skillsList.push(new Skill(skill));
        });
        return (this.skills = skillsList);
      } finally {
        this.loaders['retrieveSkills'] = false;
      }
    },

    async updateSkill(id, { name, image, progress }) {
      try {
        this.loaders['updateSkill'] = true;
        const updatedSkill = await apiWrapper.patch(`/skills/${id}`, {
          data: { name, image, progress },
        });
        return (this.skill = new Skill(updatedSkill));
      } finally {
        this.loaders['updateSkill'] = false;
      }
    },

    async deleteSkill(id) {
      try {
        this.loaders['deleteSkill'] = true;
        const deletedSkill = await apiWrapper.delete(`/skills/${id}`);
        const deletedSkillIndex = this.skills.findIndex(
          (skill) => skill.id === deletedSkill.id
        );
        this.skills.splice(deletedSkillIndex, 1);
        return new Skill(deletedSkill);
      } finally {
        this.loaders['deleteSkill'] = false;
      }
    },
  },
});
