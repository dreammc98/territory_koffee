import { createStore } from "vuex";
import { storesModule } from "./storesModule";
import { categoriesFoodModule } from "./categoriesFoodModule";

export default createStore({
  modules: {
    stores: storesModule,
    categoryFood: categoriesFoodModule,
  },
});
