import { defineStore } from "pinia";

export const useLayoutStore = defineStore({
  id: "layoutStore",
  state: () => ({
    navLinks: [
      {
        tag: "home",
        prefix: "01.",
        name: "Accueil",
        path: "/",
      },
      {
        tag: "about",
        prefix: "01.",
        name: "À Propos",
        path: "",
      },
      {
        tag: "skills",
        prefix: "02.",
        name: "Compétences",
        path: "/skills",
      },
      {
        tag: "skill-create-form",
        prefix: "02.",
        name: "Créer une compétence",
        path: "/skills",
      },
      {
        tag: "skill-update-form",
        prefix: "02.",
        name: "Modifier une compétence",
        path: "/update-skill/:id",
      },
      {
        tag: "experiences",
        prefix: "03.",
        name: "Expériences",
        path: "/experiences",
      },
      {
        tag: "experience-create-form",
        prefix: "03.",
        name: "Créer une expérience",
        path: "/experiences",
      },
      {
        tag: "experience-update-form",
        prefix: "03.",
        name: "Modifier une expérience",
        path: "/update-experience/:id",
      },
      {
        tag: "contact",
        prefix: "04.",
        name: "Contact",
        path: "/contact",
      },
      {
        tag: "login",
        prefix: "05.",
        name: "Connexion",
        path: "/login",
      },
      {
        tag: "profile",
        prefix: "06.",
        name: "Profil",
        path: "/profile",
      },
    ],
  }),

  getters: {
    getNavLink: (state) => (tag) =>
      state.navLinks.find((link) => link.tag === tag),
  },

  actions: {},
});
