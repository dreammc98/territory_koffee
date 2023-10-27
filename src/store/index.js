import { createStore } from "vuex";
import { storesModule } from "./storesModule";
import { categoriesFoodModule } from "./categoriesFoodModule";
import { regModule } from "./regModule";
import { basketModule } from "./basketModule";

export default createStore({
  modules: {
    stores: storesModule,
    categoryFood: categoriesFoodModule,
    regWindow: regModule,
    basket: basketModule,
  },
});
