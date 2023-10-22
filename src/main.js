import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import store from "@/store";
import vClickOutside from "click-outside-vue3";
import { VueMaskDirective } from "v-mask";

const app = createApp(App);

app.use(router).use(store).use(vClickOutside).directive("mask", VueMaskDirective).mount("#app");
