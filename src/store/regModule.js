export const regModule = {
  state: () => ({
    regModal: false,
  }),

  mutations: {
    storeRegChange(state) {
      state.regModal ? (state.regModal = false) : (state.regModal = true);
      state.regModal
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    },
  },
  namespaced: true,
};
