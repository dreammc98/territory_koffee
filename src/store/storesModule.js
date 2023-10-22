import axios from "axios";

export const storesModule = {
  state: () => ({
    store: "",
    stores: "",
    storesLoading: false,
  }),
  getters: {},
  mutations: {
    setStore(state, store) {
      state.store = store;
    },
    setStores(state, stores) {
      state.stores = stores;
    },
    openStoreList(state) {
      state.storesLoading = true;
    },
    closeStoreList(state) {
      state.storesLoading = false;
    },
  },
  actions: {
    async fetchStores({ state, commit }) {
      try {
        const response = await axios.get(
          "https://tk.uat.sibcode.team/public/api/catalog/getStores"
        );
        commit("setStores", response.data.stores);
        commit("setStore", state.stores[0].store_name);
      } catch (e) {
        console.log(e);
      }
    },
  },

  namespaced: true,
};
