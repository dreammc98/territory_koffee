import { createStore } from "vuex";
import { storesModule } from "./storesModule";

export default createStore({
  modules: {
    stores: storesModule,
  },
});
