import axios from "axios";

export const categoriesFoodModule = {
  state: () => ({
    selectedProduct: "",
    categoryFood: "",
    isCategoryFood: true,
  }),
  getters: {},
  mutations: {
    setSelectedProduct(state, selectedProduct) {
      state.selectedProduct = selectedProduct;
    },
    setCategoryFood(state, categoryFood) {
      state.categoryFood = categoryFood;
    },
    setIsCategoryFood(state, isCategoryFood) {
      state.isCategoryFood = isCategoryFood;
    },
  },
  actions: {
    async fetchCategoryFood({ commit }) {
      try {
        const response = await axios.get(
          "https://tk.uat.sibcode.team/public/api/catalog/getCategories"
        );
        commit("setCategoryFood", response.data.categories);
        commit("setSelectedProduct", response.data.categories[0].name);
      } catch (e) {
        alert(e);
      }
    },
  },
  namespaced: true,
};
