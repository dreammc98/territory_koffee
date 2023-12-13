import operations from "@/api/operations";

export const productsModule = {
  state: () => ({
    products: {},
  }),
  mutations: {
    updateProducts(state, products) {
      state.products = products;
    },
  },
  actions: {
    async getProducts({ commit }, params) {
      try {
        const { data } = await operations.getProducts(params);

        commit("updateProducts", data.products);
        return true;
      } catch (err) {
        console.log(err);
      }
      return false;
    },
  },
  namespaced: true,
};
