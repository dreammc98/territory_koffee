import operations from "@/api/operations";

export const productModule = {
  state: () => ({
    id: null,
    selectedProduct: null,
    prodModal: false,
    loader: true,
    content: false,
    priceFood: 0,
  }),
  mutations: {
    setId(state, id) {
      state.id = id;
    },
    switchStateLoad(state) {
      state.loader ? (state.loader = false) : (state.loader = true);
      state.content ? (state.content = false) : (state.content = true);
    },
    setSelectedProduct(state, selectedProduct) {
      state.selectedProduct = selectedProduct;
      state.priceFood = selectedProduct.product.price;
    },

    switchProdModal(state) {
      state.prodModal ? (state.prodModal = false) : (state.prodModal = true);
      state.prodModal
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
      if (state.prodModal === false) {
        state.loader = true;
        state.content = false;
      }
    },
  },
  actions: {
    async getProduct({ commit }, params) {
      try {
        const { data } = await operations.getProduct(params);
        commit("setSelectedProduct", data);
        commit("switchStateLoad");
        return true;
      } catch (err) {
        console.log(err);
      }
      return false;
    },
  },
  namespaced: true,
};
