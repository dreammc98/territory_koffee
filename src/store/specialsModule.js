import operations from "@/api/operations";
export const specialsModule = {
  state: () => ({
    specials: [],
  }),

  mutations: {
    updateSpecials(state, payload) {
      state.specials = payload;
    },
  },
  actions: {
    async getSpecials({ commit }) {
      try {
        const { data } = await operations.getSpecials();
        commit("updateSpecials", data.special_list);
        return true;
      } catch (err) {
        console.log(err);
      }

      return false;
    },
  },
  namespaced: true,
};
