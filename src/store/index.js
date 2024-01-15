import { createStore } from "vuex";
import { storesModule } from "./storesModule";
import { foodCategoriesModule } from "./foodCategoriesModule";
import { accountModule } from "./accountModule";
import { productsModule } from "./productsModule";
import { trackingModule } from "./trackingModule";
import { productModule } from "./productModule";
import { checkoutModule } from "./checkoutModule";
import { historyModule } from "./historyModule";
import { specialsModule } from "./specialsModule";

export default createStore({
  modules: {
    stores: storesModule,
    category: foodCategoriesModule,
    account: accountModule,
    tracking: trackingModule,
    products: productsModule,
    product: productModule,
    checkout: checkoutModule,
    history: historyModule,
    specials: specialsModule,
  },
});
