import operations from "@/api/operations";
import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();

export const foodCategoriesModule = {
  state: () => ({
    categoryFood: "",
    translitList: {},
    id: null,
    startingPath: "",
    loader: false,
  }),

  mutations: {
    setStartingPath(state, startingPath) {
      state.startingPath = startingPath;
    },

    setCategoryFood(state, categoryFood) {
      state.categoryFood = categoryFood;
      let fuse = 1;
      categoryFood.forEach((item) => {
        let translit = cyrillicToTranslit.transform(item.name, "-").toLowerCase();

        if (fuse === 1) {
          state.startingPath = translit;
          fuse = 0;
        }
        state.translitList[translit] = item.name;
      });
    },

    bunchContentWithUrl(state) {
      const locPath = window.location.pathname.split("/")[1];
      if (state.translitList[locPath]) {
        const pathUrl = state.translitList[locPath];
        const idRelativeToUrl = state.categoryFood.find((item) => {
          return item.name === pathUrl;
        });
        state.id = idRelativeToUrl.id;
      }
    },

    selectCategory(state, selectedCategory) {
      state.id = selectedCategory.id;
    },

    setIdLS(state, id) {
      state.id = id;
    },
    switchStateLoader(state, bool) {
      state.loader = bool;
    },
  },
  actions: {
    async fetchCategoryFood({ commit }) {
      commit("switchStateLoader", true);
      try {
        const { data } = await operations.getCategories();
        commit("setCategoryFood", data.categories);

        if (JSON.parse(localStorage.getItem("selectedCategory"))) {
          commit("selectCategory", JSON.parse(localStorage.getItem("selectedCategory")));
        } else {
          commit("selectCategory", data.defaultCategory);
        }
        commit("bunchContentWithUrl");
        commit("switchStateLoader", false);
      } catch (e) {
        alert(e);
      }
    },
  },
  namespaced: true,
};
