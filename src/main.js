import { createApp } from "vue";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "@/App.vue";
import router from "@/router";

import "@/assets/tailwind.scss";
import "@/services/fontAwesome";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome", FontAwesomeIcon)
  .mount("#app");
