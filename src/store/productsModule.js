import operations from "@/api/operations";
import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();

export const productsModule = {
  state: () => ({
    products: {},
    translitList: {},
    productId: Number,
    finishLoad: false,
  }),
  mutations: {
    updateProducts(state, products) {
      state.products = products;
      products.forEach((item) => {
        let translit = cyrillicToTranslit.transform(item.product_name.trimEnd(), "-").toLowerCase();
        state.translitList[translit] = item.product_name.trimEnd();
      });
    },

    loading(state) {
      state.finishLoad = true;
    },

    bunchContentWithUrl(state) {
      if (window.location.pathname.split("/")[2]) {
        const locPath = window.location.pathname.split("/")[2];
        if (state.translitList[locPath]) {
          const pathUrl = state.translitList[locPath];
          const relativeToUrl = state.products.find((item) => {
            return item.product_name.trimEnd() == pathUrl.trimEnd();
          });
          state.productId = relativeToUrl.id;
        }
      }
    },
  },
  actions: {
    async getProducts({ commit }, params) {
      try {
        const { data } = await operations.getProducts(params);
        commit("updateProducts", data.products);
        commit("bunchContentWithUrl");
        commit("loading");
        return true;
      } catch (err) {
        console.log(err);
      }
      return false;
    },
  },
  namespaced: true,
};
