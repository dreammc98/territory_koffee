import operations from "@/api/operations";
import { setTimeout } from "core-js";

export const trackingModule = {
  state: () => ({
    basketState: false,
    forRegState: false,
    pathLink: "",
    backArrow: false,
    termsOfUseData: "",
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
      state.forRegState ? (state.forRegState = false) : (state.forRegState = true);
    },

    setBackArrow(state) {
      setTimeout(() => {
        state.backArrow ? (state.backArrow = false) : (state.backArrow = true);
      }, 400);
    },
  },

  actions: {
    async getInfoPage({ state }, params) {
      try {
        const { data } = await operations.getInfoPage(params);
        if (data.status !== "error") {
          state.termsOfUseData = data;
        }
      } catch (err) {
        console.log(err);
      }

      return false;
    },
    // eslint-disable-next-line no-unused-vars
    async sendFeedback({ commit }, params) {
      try {
        const { data } = await operations.sendFeedback(params);

        if (data.status !== "error") {
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
