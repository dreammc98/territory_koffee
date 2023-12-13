import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "@/store";
import vClickOutside from "click-outside-vue3";
import { VueMaskDirective } from "v-mask";
import tailWind from "./index.css";
import "@/assets/fonts/stylesheet.css";
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App);

app
  .use(router)
  .use(store)
  .use(vClickOutside)
  .use(Vue3TouchEvents)
  .directive("mask", VueMaskDirective)
  .use(tailWind)
  .mount("#app");
