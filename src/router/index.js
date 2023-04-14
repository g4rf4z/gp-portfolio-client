import { computed } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import { useAuthenticationStore } from "@/store/authenticationStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuthentication: false,
    },
  },
  {
    path: "/skills",
    name: "skills",
    component: () => import("@/views/Skills.vue"),
    meta: {
      requiresAuthentication: false,
    },
  },
  {
    path: "/create-skill",
    name: "create-skill",
    component: () => import("@/views/CreateSkill.vue"),
    meta: {
      requiresAuthentication: true,
    },
  },
  {
    path: "/update-skill/:id",
    name: "update-skill",
    component: () => import("@/views/UpdateSkill.vue"),
    meta: {
      requiresAuthentication: true,
    },
  },
  {
    path: "/experiences",
    name: "experiences",
    component: () => import("@/views/Experiences.vue"),
    meta: {
      requiresAuthentication: false,
    },
  },
  {
    path: "/create-experience",
    name: "create-experience",
    component: () => import("@/views/CreateExperience.vue"),
    meta: {
      requiresAuthentication: true,
    },
  },
  {
    path: "/update-experience/:id",
    name: "update-experience",
    component: () => import("@/views/UpdateExperience.vue"),
    meta: {
      requiresAuthentication: true,
    },
  },
  {
    path: "/contact",
    name: "contact",
    component: () => import("@/views/Contact.vue"),
    meta: {
      requiresAuthentication: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuthentication: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile.vue"),
    meta: {
      requiresAuthentication: true,
    },
  },
  {
    path: "/page-not-found",
    name: "page-not-found",
    component: () => import("@/views/PageNotFound.vue"),
    meta: {
      requiresAuthentication: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

const checkAuthentication = async (to, from, next) => {
  const authenticationStore = useAuthenticationStore();
  const session = computed(() => authenticationStore.session);

  if (to.meta.requiresAuthentication === true) {
    if (!session.value) {
      const foundSession = await authenticationStore.retrieveSession();
      if (!foundSession) return next("/page-not-found");
    }
  }
  next();
};

router.beforeEach(checkAuthentication);

export default router;
