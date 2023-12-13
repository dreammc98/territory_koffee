export const trackingModule = {
  state: () => ({
    basketState: false,
    forRegState: false,
    pathLink: "",
  }),

  mutations: {
    switchBasket(state) {
      state.basketState ? (state.basketState = false) : (state.basketState = true);
    },
    switchBurger(state) {
      if (state.burgerState) {
        return (state.burgerState = false);
      }
      state.burgerState ? (state.burgerState = false) : (state.burgerState = true);
    },

    setPathLink(state, path) {
      state.pathLink = path;
    },
    switchForReg(state) {
      if (state.forRegState) {
        return (state.forRegState = false);
      }
      state.forRegState ? (state.forRegState = false) : (state.forRegState = true);
    },
  },

  namespaced: true,
};
