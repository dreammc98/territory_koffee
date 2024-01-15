import operations from "@/api/operations";

export const checkoutModule = {
  state: () => ({
    checkoutState: false,
    bonus: "",
  }),
  mutations: {
    setBonuses(state, payload) {
      state.bonus = payload;
    },

    changeCheckout(state) {
      state.checkoutState ? (state.checkoutState = false) : (state.checkoutState = true);
      state.checkoutState
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    },
  },

  actions: {
    async getBonuses({ commit }, phone) {
      const { data } = await operations.getBonuses({ params: { phone: phone } });
      if (data.walletBalances !== undefined) {
        commit("setBonuses", data.walletBalances[0].balance);
      } else {
        commit("setBonuses", 0);
      }
    },

    async sendOrder({ commit }, params) {
      try {
        const { data } = await operations.sendOrder(params);
        if (data.status !== "error") {
          commit("dropCart");
          window.localStorage.removeItem("cartProduct");
          return data;
        }
      } catch (err) {
        console.log(err);
      }

      return false;
    },
  },
  namespaced: true,
};
