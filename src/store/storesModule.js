import axios from "axios";

export const storesModule = {
  state: () => ({
    store: "",
    stores: "",
    storesLoading: false,
    fuse: true,
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
      state.storesLoading ? (state.storesLoading = false) : (state.storesLoading = true);
      state.storesLoading
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    },
    setFuse(state, fuse) {
      state.fuse = fuse;
    },
  },
  actions: {
    async fetchStores({ state, commit }) {
      try {
        const response = await axios.get(
          "https://tk.uat.sibcode.team/public/api/catalog/getStores"
        );
        commit("setStores", response.data.stores);
        if (state.fuse) {
          commit("setStore", state.stores[0].store_name);
          commit("setFuse", false);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },

  namespaced: true,
};
