import operations from "@/api/operations";

export const storesModule = {
  state: () => ({
    store: "",
    stores: "",
    storesState: false,
    id: "",
  }),
  getters: {},
  mutations: {
    setStore(state, store) {
      state.store = store;
    },
    setStores(state, stores) {
      state.stores = stores;
    },
    storeListStateChange(state) {
      state.storesState ? (state.storesState = false) : (state.storesState = true);
      state.storesState
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    },

    setId(state, id) {
      state.id = id;
    },
    setStoreLS(state, shop) {
      state.store = shop.store_name;
    },
    setIdLS(state, shop) {
      state.id = shop.id;
    },
  },
  actions: {
    async fetchStores({ commit }) {
      try {
        const { data } = await operations.getStores();
        commit("setStores", data.stores);
        if (localStorage.getItem("shop")) {
          commit("setStoreLS", JSON.parse(localStorage.getItem("shop")));
          commit("setIdLS", JSON.parse(localStorage.getItem("shop")));
        } else {
          localStorage.setItem("shop", JSON.stringify(data.stores[0]));
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  namespaced: true,
};
