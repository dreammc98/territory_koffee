import operations from "@/api/operations";
export const historyModule = {
  state: () => ({
    orders: [],
  }),
  mutations: {
    setOrderHistory(state, payload) {
      state.orders = payload;
    },
  },

  actions: {
    async getOrderHistory({ commit }, phone) {
      try {
        const { data } = await operations.getOrderHistory(phone);
        commit("setOrderHistory", data.orders_list);
        return true;
      } catch (err) {
        console.log(err);
      }
      return false;
    },
  },
  namespaced: true,
};
