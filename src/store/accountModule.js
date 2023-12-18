export const accountModule = {
  state: () => ({
    isAuth: true,
    regModal: false,
    menuState: false,
  }),

  mutations: {
    changeAccountStatus(state) {
      // if (state.isAuth) {
      //   state.menuState ? (state.menuState = false) : (state.menuState = true);
      //   return;
      // }
      state.regModal ? (state.regModal = false) : (state.regModal = true);
      state.regModal
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    },
  },
  namespaced: true,
};
