import operations from "@/api/operations";
import LS from "@/localStorage/localStorage";

export const accountModule = {
  state: () => ({
    isAuthorized: false,
    regModal: false,
    numConState: false,
    popUpState: false,
    popUpStateLog: false,
    deleteState: false,
    userData: {},
    paramsLog: {},
    name: "",
    phone: "",
  }),

  mutations: {
    setParamsLog(state, paramsLog) {
      state.paramsLog = paramsLog;
    },

    storageAccount(state, payload) {
      state.isAuthorized = payload ? true : false;
      state.name = payload.name;
      state.phone = payload.phone;
    },

    exitAccount(state) {
      window.localStorage.removeItem("isAuthorized");
      window.localStorage.removeItem("userData");
      state.isAuthorized = false;
    },

    changeDeleteState(state) {
      state.deleteState ? (state.deleteState = false) : (state.deleteState = true);
      state.deleteState
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    },

    changePopUp(state, param) {
      if (param !== "log") {
        state.popUpState ? (state.popUpState = false) : (state.popUpState = true);
      } else {
        state.popUpStateLog ? (state.popUpStateLog = false) : (state.popUpStateLog = true);
      }
    },

    changeAccountStatus(state) {
      state.regModal ? (state.regModal = false) : (state.regModal = true);
      state.regModal
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "visible");
    },
    changeNumConState(state) {
      state.numConState ? (state.numConState = false) : (state.numConState = true);
    },
    saveUser(state, payload) {
      state.userData = payload;
      state.name = state.userData.name;
      state.phone = state.userData.phone;
    },
    authorize(state) {
      state.isAuthorized = true;
      LS.setStorage("isAuthorized", state.isAuthorized);
    },
  },

  actions: {
    async requestConfirmationCode({ state }, params) {
      try {
        const { data } = await operations.requestConfirmationCode(params);
        return data;
      } catch (err) {
        console.log(err, state.err);
      }

      return false;
    },

    async sendConfirmationCode({ state }, params) {
      try {
        const { data } = await operations.sendConfirmationCode(params);
        return data;
      } catch (err) {
        console.log(err);
        console.log(state.err);
      }

      return false;
    },

    async login({ commit }, params) {
      try {
        const { data } = await operations.login(params);

        if (data.status !== "error") {
          const userData = {
            name: params.params.name,
            phone: params.params.phone,
            api_token: data.token,
          };

          commit("saveUser", userData);
          LS.setStorage("userData", userData);
          commit("authorize");

          return data;
        }
      } catch (err) {
        console.log(err);
      }

      return false;
    },

    async sendReview({ state }, params) {
      try {
        const { data } = await operations.sendReview(params);

        if (data.status !== "error") {
          return data;
        }
      } catch (err) {
        console.log(err);
        console.log(state.test);
      }

      return false;
    },
  },

  namespaced: true,
};
