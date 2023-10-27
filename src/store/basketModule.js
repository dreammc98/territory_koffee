export const basketModule = {
  state: () => ({
    basketState: false,
  }),

  mutations: {
    switchBasket(state) {
      state.basketState ? (state.basketState = false) : (state.basketState = true);
      console.log(1);
    },
  },
  namespaced: true,
};
