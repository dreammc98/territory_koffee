<template>
  <ul class="pt-5 pb-2 px-2 mb-4 space-x-2 flex overflow-x-auto hovScroll select-none">
    <li
      class="whitespace-nowrap px-3 py-1 shadow-[0_4px_4px_rgba(0,0,0,0.05)] sm:hover:bg-[#ffd4a3] sm:hover:text-white rounded-full text-lg cursor-pointer"
      @click="changeCategoryFood(category.id, category.name)"
      v-for="category in categoryFood"
      :key="category.id"
      :class="idFood === category.id ? 'bg-[#ffd4a3] text-white' : ''"
    >
      <span class="">{{ category.name }}</span>
    </li>
  </ul>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import CyrillicToTranslit from "cyrillic-to-translit-js";

const cyrillicToTranslit = new CyrillicToTranslit();

export default {
  data() {
    return {};
  },

  methods: {
    ...mapActions({
      getProducts: "products/getProducts",
    }),
    ...mapMutations({
      setCategoryFood: "category/setCategoryFood",
      selectCategory: "category/selectCategory",
      setStartingPath: "category/setStartingPath",
    }),

    changeCategoryFood(id, name) {
      this.selectCategory({ id: id });
      localStorage.setItem("selectedCategory", JSON.stringify({ id: id, name: name }));
      this.$router.push(cyrillicToTranslit.transform(name, "-").toLowerCase());
    },

    startPath() {
      if (window.location.pathname === "/") {
        this.$router.push(this.startingPath);
        this.selectCategory({ id: 1 });
      }
    },
  },

  computed: {
    ...mapState({
      categoryFood: (state) => state.category.categoryFood,
      idFood: (state) => state.category.id,
      idStore: (state) => state.stores.id,
      startingPath: (state) => state.category.startingPath,
      translitList: (state) => state.category.translitList,
    }),
    // params() {
    //   return { params: { id: this.idFood, shop_id: this.idStore } };
    // },
  },

  watch: {
    idFood() {
      this.startPath();
      // this.params;
    },
  },
};
</script>

<style scoped>
::-webkit-scrollbar {
  height: 9px;
}

::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

.hovScroll:hover::-webkit-scrollbar-thumb {
  background: #ccc;
}
</style>
