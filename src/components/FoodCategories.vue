<template>
  <div class="wrapper">
    <a
      @click="changeCategoryFood(category.name)"
      href="#"
      v-for="category in categoryFood"
      :key="category.id"
      :class="selectedProduct === category.name ? 'selected__product' : ''"
      class="category"
      ><span>{{ category.name }}</span></a
    >
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  methods: {
    ...mapActions({
      fetchCategoryFood: "categoryFood/fetchCategoryFood",
    }),
    ...mapMutations({
      setCategoryFood: "categoryFood/setCategoryFood",
      setIsCategoryFood: "categoryFood/setIsCategoryFood",
      setSelectedProduct: "categoryFood/setSelectedProduct",
    }),

    changeCategoryFood(category) {
      this.setSelectedProduct(category);
      this.setIsCategoryFood(true);
    },
  },

  computed: {
    ...mapState({
      categoryFood: (state) => state.categoryFood.categoryFood,
      isCategoryFood: (state) => state.categoryFood.isCategoryFood,
      selectedProduct: (state) => state.categoryFood.selectedProduct,
    }),
  },

  mounted() {
    this.fetchCategoryFood();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 20px;
}

.category {
  margin-right: 10px;
  margin-top: 10px;
  white-space: nowrap;
  z-index: 0;
}

a {
  display: block;
  border-radius: 20px;
  font-size: 15px;
  font-family: sans-serif;
  text-decoration: none;
  color: #333;
  letter-spacing: 2px;
  text-align: center;
  position: relative;
  transition: all 0.2s;
  padding: 7px 20px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
}

a span {
  position: relative;
  z-index: 2;
}

a:after {
  position: absolute;
  border-radius: 20px;
  content: "";
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  transition: all 0.2s;
}

a:hover {
  color: #fff;
}

a:hover:after {
  width: 100%;
  background: #efc14d;
}

a:focus {
  border-radius: 20px;
  background: #efc14d;
  color: #fff;
}

.selected__product {
  border-radius: 20px;
  background: #efc14d;
  color: #fff;
}
</style>
;
